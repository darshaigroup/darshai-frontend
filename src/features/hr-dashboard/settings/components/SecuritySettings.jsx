import { useState } from "react";
import {Activity,AlertTriangle,KeyRound,Laptop,Lock,LogOut,MapPin,MonitorSmartphone,Save,ShieldCheck,Smartphone,} from "lucide-react";
import { motion } from "framer-motion";

const Card = ({ title, description, children }) => (
  <section className="rounded-3xl border border-[#E3E9E4] bg-white p-6">
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#243128]">{title}</h3>
      {description && (
        <p className="mt-1 text-sm text-[#7B867F]">{description}</p>
      )}
    </div>
    {children}
  </section>
);

const Input = ({ label, ...props }) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[.12em] text-[#7D8780]">
      {label}
    </label>
    <input
      {...props}
      className="h-12 w-full rounded-xl border border-[#DFE6E1] px-4 text-sm outline-none transition focus:border-[#1E7A3A]"
    />
  </div>
);

const Toggle = ({ title, description, checked, onChange }) => (
  <div className="flex items-center justify-between rounded-2xl border border-[#E5EBE6] bg-[#FAFCFA] p-4">
    <div className="pr-4">
      <p className="text-sm font-semibold text-[#243128]">{title}</p>
      <p className="mt-1 text-xs text-[#7B867F]">{description}</p>
    </div>

    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition ${checked ? "bg-[#1E7A3A]" : "bg-[#CBD5CE]"}`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked ? "left-6" : "left-1"}`}
      />
    </button>
  </div>
);

const Session = ({
  current,
  device,
  browser,
  location,
  lastLogin,
  icon: Icon,
}) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-[#E5EBE6] p-5 lg:flex-row lg:items-center lg:justify-between">
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF7F0] text-[#1E7A3A]">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[#243128]">{device}</h4>
          {current && (
            <span className="rounded-full bg-[#EDF7F0] px-2 py-1 text-[10px] font-semibold text-[#1E7A3A]">
              Current
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-4 text-xs text-[#7C8780]">
          <span className="flex items-center gap-1">
            <Laptop className="h-3.5 w-3.5" />
            {browser}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </span>
          <span>{lastLogin}</span>
        </div>
      </div>
    </div>

    {!current && (
      <button className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50">
        Logout
      </button>
    )}
  </div>
);

const SecuritySettings = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    loginAlerts: true,
    twoFactor: false,
    rememberDevice: true,
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Security Status */}

      <section className="grid gap-5 md:grid-cols-3">
        <div className="rounded-3xl border border-[#E3E9E4] bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EDF7F0] text-[#1E7A3A]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm text-[#7B867F]">Security Score</p>
          <h3 className="mt-1 text-3xl font-bold text-[#243128]">92%</h3>
        </div>

        <div className="rounded-3xl border border-[#E3E9E4] bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF4E9] text-[#E08B19]">
            <Activity className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm text-[#7B867F]">Last Login</p>
          <h3 className="mt-1 text-lg font-bold text-[#243128]">
            Today 09:35 AM
          </h3>
        </div>

        <div className="rounded-3xl border border-[#E3E9E4] bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF3FF] text-[#4E6CF3]">
            <MonitorSmartphone className="h-6 w-6" />
          </div>
          <p className="mt-5 text-sm text-[#7B867F]">Active Devices</p>
          <h3 className="mt-1 text-3xl font-bold text-[#243128]">2</h3>
        </div>
      </section>

      {/* Password */}

      <Card
        title="Change Password"
        description="Update your account password regularly for better security."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <Input
            label="Current Password"
            type="password"
            value={form.currentPassword}
            onChange={(e) => update("currentPassword", e.target.value)}
          />

          <Input
            label="New Password"
            type="password"
            value={form.newPassword}
            onChange={(e) => update("newPassword", e.target.value)}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => update("confirmPassword", e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex h-11 items-center gap-2 rounded-xl bg-[#1E7A3A] px-6 text-sm font-semibold text-white transition hover:bg-[#17652F]">
            <KeyRound className="h-4 w-4" />
            Update Password
          </button>
        </div>
      </Card>

      {/* Security */}

      <Card
        title="Security Preferences"
        description="Protect your account with additional security options."
      >
        <div className="space-y-4">
          <Toggle
            title="Two-Factor Authentication"
            description="Require an additional verification step during login."
            checked={form.twoFactor}
            onChange={(v) => update("twoFactor", v)}
          />

          <Toggle
            title="Login Alerts"
            description="Receive email notifications whenever your account logs in."
            checked={form.loginAlerts}
            onChange={(v) => update("loginAlerts", v)}
          />

          <Toggle
            title="Remember Trusted Device"
            description="Skip verification on trusted devices."
            checked={form.rememberDevice}
            onChange={(v) => update("rememberDevice", v)}
          />
        </div>
      </Card>

      {/* Sessions */}

      <Card
        title="Active Login Sessions"
        description="Manage devices currently signed into your account."
      >
        <div className="space-y-4">
          <Session
            current
            icon={Laptop}
            device="Windows Desktop"
            browser="Chrome 139"
            location="Bengaluru, India"
            lastLogin="Current Session"
          />

          <Session
            icon={Smartphone}
            device="Samsung Galaxy"
            browser="Chrome Mobile"
            location="Mysuru, India"
            lastLogin="Yesterday • 08:12 PM"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 text-sm font-semibold text-red-600 transition hover:bg-red-100">
            <LogOut className="h-4 w-4" />
            Logout Other Devices
          </button>
        </div>
      </Card>

      {/* Tips */}

      <Card title="Security Recommendations">
        <div className="space-y-4">
          <div className="flex gap-4 rounded-2xl border border-[#E5EBE6] p-5">
            <ShieldCheck className="mt-1 h-5 w-5 text-[#1E7A3A]" />
            <div>
              <h4 className="font-semibold text-[#243128]">Strong Password</h4>
              <p className="mt-1 text-sm leading-6 text-[#7C8780]">
                Use at least 12 characters with uppercase, lowercase, numbers
                and special characters.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-2xl border border-[#FFE4CC] bg-[#FFF9F4] p-5">
            <AlertTriangle className="mt-1 h-5 w-5 text-[#E38A17]" />
            <div>
              <h4 className="font-semibold text-[#243128]">
                Enable Two-Factor Authentication
              </h4>
              <p className="mt-1 text-sm leading-6 text-[#7C8780]">
                Adding an extra verification layer greatly improves account
                security.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <button className="flex h-11 items-center gap-2 rounded-xl bg-[#1E7A3A] px-6 text-sm font-semibold text-white transition hover:bg-[#17652F]">
          <Save className="h-4 w-4" />
          Save Security Settings
        </button>
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
