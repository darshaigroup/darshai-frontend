import { Controller, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, Phone, CalendarDays } from "lucide-react";

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

const Select = ({ error, children, ...props }) => (
  <div className="space-y-2">
    <select
      {...props}
      className={`h-14 w-full rounded-2xl border bg-white px-4 text-[15px] outline-none transition ${
        error ? "border-red-400" : "border-[#D8E2DC] focus:border-[#1E7A3A]"
      }`}
    >
      {children}
    </select>
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

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const maxDate = yesterday.toISOString().split("T")[0];

const Step1Personal = () => {
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
        <Field label="Full Name" required>
          <Controller
            name="fullName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                icon={User}
                placeholder="Enter your full name"
                error={errors.fullName}
              />
            )}
          />
        </Field>

        <Field label="Email Address" required>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                icon={Mail}
                placeholder="Enter your email"
                error={errors.email}
              />
            )}
          />
        </Field>

        <Field label="Mobile Number" required>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="tel"
                maxLength={10}
                icon={Phone}
                placeholder="9876543210"
                error={errors.phone}
              />
            )}
          />
        </Field>

        <Field label="Date of Birth" required>
          <Controller
            name="dateOfBirth"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                icon={CalendarDays}
                max={maxDate}
                error={errors.dateOfBirth}
              />
            )}
          />
        </Field>

        <Field label="Gender" required>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select {...field} error={errors.gender}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            )}
          />
        </Field>
      </div>
    </motion.div>
  );
};

export default Step1Personal;
