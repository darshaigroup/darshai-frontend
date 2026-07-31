import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  School,
  Calendar,
  Percent,
} from "lucide-react";

const Input = ({ icon: Icon, error, ...props }) => (
  <div className="space-y-2">
    <div
      className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${
        error
          ? "border-red-400 focus-within:border-red-500"
          : "border-[#D8E2DC] focus-within:border-[#1E7A3A]"
      }`}
    >
      <Icon
        className={`mr-3 h-5 w-5 ${error ? "text-red-500" : "text-[#8A958D]"}`}
      />
      <input
        {...props}
        className="h-full w-full bg-transparent text-[15px] text-[#1C2A21] outline-none placeholder:text-[#9CA7A1]"
      />
    </div>
    {error && (
      <p className="text-xs font-medium text-red-500">{error.message}</p>
    )}
  </div>
);

const Select = ({ icon: Icon, error, children, ...props }) => (
  <div className="space-y-2">
    <div
      className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${
        error
          ? "border-red-400"
          : "border-[#D8E2DC] focus-within:border-[#1E7A3A]"
      }`}
    >
      <Icon
        className={`mr-3 h-5 w-5 ${error ? "text-red-500" : "text-[#8A958D]"}`}
      />
      <select
        {...props}
        className="h-full w-full bg-transparent text-[15px] text-[#1C2A21] outline-none"
      >
        {children}
      </select>
    </div>
    {error && (
      <p className="text-xs font-medium text-red-500">{error.message}</p>
    )}
  </div>
);

const Field = ({ label, required, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold uppercase tracking-wide text-[#243128]">
      {label}
      {required && <span className="text-red-500"> *</span>}
    </label>
    {children}
  </div>
);

const Step2Education = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Highest Qualification" required>
          <Controller
            name="qualification"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                icon={GraduationCap}
                error={errors.qualification}
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
                <option value="Other">Other</option>
              </Select>
            )}
          />
        </Field>

        <Field label="Course / Specialization" required>
          <Controller
            name="specialization"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={BookOpen}
                placeholder="Marketing/HR"
                error={errors.specialization}
              />
            )}
          />
        </Field>

        <Field label="College / University" required>
          <Controller
            name="college"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={School}
                placeholder="Enter college or university"
                error={errors.college}
              />
            )}
          />
        </Field>

        <Field label="Year of Passing" required>
          <Controller
            name="passingYear"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={Calendar}
                type="number"
                min="1980"
                max="2035"
                placeholder="2025"
                error={errors.passingYear}
              />
            )}
          />
        </Field>

        <Field label="CGPA / Percentage" required>
          <Controller
            name="cgpa"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={Percent}
                placeholder="8.9 or 89%"
                error={errors.cgpa}
              />
            )}
          />
        </Field>
      </div>
    </motion.div>
  );
};

export default Step2Education;
