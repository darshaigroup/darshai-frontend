import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  SquarePen,
} from "lucide-react";

const Card = ({ title, icon: Icon, onEdit, children }) => (
  <motion.div
    layout
    className="rounded-3xl border border-[#E5ECE7] bg-white p-7 shadow-sm"
  >
    <div className="mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF8F1]">
          <Icon size={22} className="text-[#1E7A3A]" />
        </div>

        <h3 className="text-lg font-bold text-[#1E2A22]">{title}</h3>
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="flex items-center gap-2 rounded-full bg-[#F3F6F4] px-4 py-2 text-sm font-semibold text-[#1E7A3A] transition hover:bg-[#E9F4EC]"
      >
        <SquarePen size={16} />
        Edit
      </button>
    </div>

    {children}
  </motion.div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between gap-6 border-b border-[#EEF2EF] py-3 last:border-0">
    <span className="font-medium text-[#66736B]">{label}</span>

    <span className="text-right font-semibold text-[#1E2A22]">
      {value || "-"}
    </span>
  </div>
);

const Step5ReviewDeclaration = ({ goToStep }) => {
  const {
    watch,
    control,
    formState: { errors },
  } = useFormContext();

  const values = watch();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card title="Personal Information" icon={User} onEdit={() => goToStep(1)}>
        <Row label="Full Name" value={values.fullName} />
        <Row label="Email" value={values.email} />
        <Row label="Phone" value={values.phone} />
        <Row label="Date of Birth" value={values.dateOfBirth} />
        <Row label="Gender" value={values.gender} />
      </Card>

      <Card title="Education" icon={GraduationCap} onEdit={() => goToStep(2)}>
        <Row label="Qualification" value={values.qualification} />
        <Row label="Specialization" value={values.specialization} />
        <Row label="College" value={values.college} />
        <Row label="Passing Year" value={values.passingYear} />
        <Row label="CGPA / Percentage" value={values.cgpa} />
      </Card>

      <Card title="Job Details" icon={Briefcase} onEdit={() => goToStep(3)}>
        <Row label="Position" value={values.jobId} />
        <Row label="Experience" value={values.experience} />

        {values.experience === "Experienced" && (
          <Row label="Total Experience" value={values.totalExperience} />
        )}
      </Card>

      <Card title="Resume" icon={FileText} onEdit={() => goToStep(4)}>
        <Row label="Uploaded Resume" value={values.resume?.name} />
      </Card>

      <motion.div
        layout
        className="rounded-3xl border border-[#E5ECE7] bg-[#FBFCFB] p-7"
      >
        <Controller
          name="declaration"
          control={control}
          render={({ field }) => (
            <label className="flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-1 h-5 w-5 rounded border-[#1E7A3A] accent-[#1E7A3A]"
              />

              <span className="text-[15px] leading-7 text-[#56635B]">
                I hereby declare that all the information provided by me is true
                and accurate to the best of my knowledge. I understand that
                providing false or misleading information may result in the
                rejection of my application or termination of employment if
                discovered after joining DarshAI.
              </span>
            </label>
          )}
        />

        {errors.declaration && (
          <p className="mt-3 text-sm font-medium text-red-500">
            {errors.declaration.message}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Step5ReviewDeclaration;
