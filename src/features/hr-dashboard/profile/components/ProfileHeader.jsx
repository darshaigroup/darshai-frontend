import {BadgeCheck,BriefcaseBusiness,CalendarDays,Camera,Mail,Phone,} from "lucide-react";
import { motion } from "framer-motion";
import person from "@/assets/images/profile.jpg";
const user = {
  name: "Varsha Devadiga",
  role: "HR Recruiter",
  employeeId: "HR-001",
  email: "varshadevadiga@darshai.in",
  phone: "+91 7676740701",
  joined: "April 2026",
  avatar: null,
};

const initials = (name) =>
  name
    .split(" ")
    .map((v) => v[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Info = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 rounded-xl bg-[#F7FAF8] px-4 py-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF7F0] text-[#1E7A3A]">
      <Icon className="h-[18px] w-[18px]" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8C968F]">
        {label}
      </p>
      <p className="truncate text-sm font-medium text-[#243128]">{value}</p>
    </div>
  </div>
);

const ProfileHeader = () => (
  <motion.section
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden rounded-3xl border border-[#E3E9E4] bg-white"
  >
    <div className="h-32 bg-gradient-to-r from-[#1E7A3A] via-[#2E8B57] to-[#61B47B]" />

    <div className="-mt-14 px-5 pb-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-end">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-[#EAF4EC] text-3xl font-bold text-[#1E7A3A] shadow-lg">
                <img
                  src={person}
                  alt={user.name}
                  className="h-full w-full rounded-[22px] object-cover"
                />
            </div>

            <button className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#1E7A3A] text-white shadow-lg transition hover:bg-[#17652F]">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          <div className="text-center sm:text-left">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-bold tracking-[-.02em] text-[#243128]">
                {user.name}
              </h1>

              <span className="inline-flex items-center gap-1 rounded-full bg-[#EDF7F0] px-3 py-1 text-[11px] font-semibold text-[#1E7A3A]">
                <BadgeCheck className="h-3.5 w-3.5" />
                {user.role}
              </span>
            </div>

            <p className="mt-2 text-sm text-[#758078]">
              Employee ID •{" "}
              <span className="font-semibold text-[#243128]">
                {user.employeeId}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Info icon={Mail} label="Email" value={user.email} />

        <Info icon={Phone} label="Phone" value={user.phone} />

        <Info
          icon={BriefcaseBusiness}
          label="Department"
          value="Human Resources"
        />

        <Info icon={CalendarDays} label="Joined" value={user.joined} />
      </div>
    </div>
  </motion.section>
);

export default ProfileHeader;
