import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Briefcase, BadgeCheck, Clock3 } from "lucide-react";
import applicationService from "../services/applicationService";

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
    {error && <p className="text-xs text-red-500">{error.message}</p>}
  </div>
);

const Select = ({ icon: Icon, error, children, ...props }) => (
  <div className="space-y-2">
    <div
      className={`flex h-14 items-center rounded-2xl border bg-white px-4 ${
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
        className="h-full w-full bg-transparent text-[15px] outline-none"
      >
        {children}
      </select>
    </div>
    {error && <p className="text-xs text-red-500">{error.message}</p>}
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

const Step3JobDetails = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const experience = watch("experience");
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await applicationService.getJobs();

        if (mounted) setJobs(Array.isArray(data) ? data : []);
      } catch {
        if (mounted) setJobs([]);
      }
    })();

    return () => (mounted = false);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8"
    >
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Position Applying For" required>
          <Controller
            name="jobId"
            control={control}
            render={({ field }) => (
              <Select {...field} icon={Briefcase} error={errors.jobId}>
                <option value="">Select Position</option>
{/* 
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title}
                  </option>
                ))} */}
                <option value="Partnership & Community Manager">Partnership & Community Manager</option>
                <option value="Client Relationship Executive">Client Relationship Executive</option>
              </Select>
            )}
          />
        </Field>

        <Field label="Experience Level" required>
          <Controller
            name="experience"
            control={control}
            render={({ field }) => (
              <Select {...field} icon={BadgeCheck} error={errors.experience}>
                <option value="Fresher">Fresher</option>
                <option value="Experienced">Experienced</option>
              </Select>
            )}
          />
        </Field>

        {experience === "Experienced" && (
          <Field label="Total Experience" required>
            <Controller
              name="totalExperience"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  icon={Clock3}
                  placeholder="Example: 3 Years"
                  error={errors.totalExperience}
                />
              )}
            />
          </Field>
        )}
      </div>
    </motion.div>
  );
};

export default Step3JobDetails;
