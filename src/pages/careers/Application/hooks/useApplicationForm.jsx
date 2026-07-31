import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import applicationService from "../services/applicationService";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const schema = z
  .object({
    // STEP 1
    fullName: z.string().trim().min(3, "Full Name is required."),
    email: z.string().email("Enter a valid email."),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid mobile number."),
    dateOfBirth: z.string().min(1, "Date of Birth is required."),
    gender: z.string().min(1, "Select Gender."),

    // STEP 2
    qualification: z.string().min(1, "Qualification is required."),
    specialization: z.string().min(1, "Specialization is required."),
    college: z.string().min(2, "College is required."),
    passingYear: z.string().min(4, "Passing year is required."),
    cgpa: z.string().min(1, "CGPA / Percentage is required."),

    // STEP 3
    jobId: z.string().min(1, "Select Position."),
    experience: z.enum(["Fresher", "Experienced"]),
    totalExperience: z.string().optional(),

    // STEP 4
    resume: z
      .any()
      .refine((file) => file, "Resume is required.")
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        "Maximum file size is 1 MB.",
      )
      .refine(
        (file) => !file || FILE_TYPES.includes(file.type),
        "Only PDF, DOC & DOCX allowed.",
      ),

    // STEP 5
    declaration: z.literal(true, {
      errorMap: () => ({
        message: "Please accept the declaration.",
      }),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.experience === "Experienced" && !data.totalExperience) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["totalExperience"],
        message: "Total Experience is required.",
      });
    }
  });

const defaultValues = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",

  qualification: "",
  specialization: "",
  college: "",
  passingYear: "",
  cgpa: "",

  jobId: "",
  experience: "Fresher",
  totalExperience: "",

  resume: null,

  declaration: false,
};

const STEP_FIELDS = {
  1: ["fullName", "email", "phone", "dateOfBirth", "gender"],
  2: ["qualification", "specialization", "college", "passingYear", "cgpa"],
  3: ["jobId", "experience", "totalExperience"],
  4: ["resume"],
  5: ["declaration"],
};

const TOTAL_STEPS = 5;

const useApplicationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [applicationCode, setApplicationCode] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const progress = useMemo(
    () => Math.round((step / TOTAL_STEPS) * 100),
    [step],
  );

  const nextStep = async () => {
    const valid = await methods.trigger(STEP_FIELDS[step]);

    if (!valid) return;

    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => {
    setStep((s) => Math.max(s - 1, 1));
  };

  const goToStep = (index) => {
    setStep(index);
  };

  const resetForm = () => {
    methods.reset(defaultValues);

    setSuccess(false);
    setStep(1);
    setApplicationCode("");
    setJobTitle("");
  };

  const submit = async (values) => {
    setLoading(true);

    try {
      const response = await applicationService.submitApplication(values);

      setApplicationCode(
        response?.data?.applicationCode || response?.applicationCode || "",
      );

      setJobTitle(response?.data?.jobTitle || "");

      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    methods,

    step,
    progress,

    loading,
    success,

    applicationCode,
    jobTitle,

    nextStep,
    prevStep,
    goToStep,

    submit,
    resetForm,
  };
};

export default useApplicationForm;
