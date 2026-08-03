import {useState} from "react";
import {Bell,Globe,LayoutDashboard,Mail,Moon,Phone,Save,Sun,UserRound} from "lucide-react";
import {motion} from "framer-motion";

const Card=({title,description,children})=>(
  <section className="rounded-3xl border border-[#E3E9E4] bg-white p-6">
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-[#243128]">{title}</h3>
      {description&&<p className="mt-1 text-sm text-[#7B867F]">{description}</p>}
    </div>
    {children}
  </section>
);

const Input=({label,icon:Icon,...props})=>(
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[.12em] text-[#7D8780]">{label}</label>
    <div className="flex h-12 items-center rounded-xl border border-[#DFE6E1] bg-white px-4 transition focus-within:border-[#1E7A3A]">
      <Icon className="mr-3 h-4 w-4 text-[#8B958E]"/>
      <input {...props} className="h-full w-full bg-transparent text-sm text-[#243128] outline-none"/>
    </div>
  </div>
);

const Select=({label,children,...props})=>(
  <div className="space-y-2">
    <label className="text-xs font-semibold uppercase tracking-[.12em] text-[#7D8780]">{label}</label>
    <select {...props} className="h-12 w-full rounded-xl border border-[#DFE6E1] bg-white px-4 text-sm text-[#243128] outline-none focus:border-[#1E7A3A]">
      {children}
    </select>
  </div>
);

const Toggle=({title,description,checked,onChange})=>(
  <div className="flex items-center justify-between rounded-2xl border border-[#E6ECE7] bg-[#FAFCFA] p-4">
    <div className="pr-4">
      <p className="text-sm font-semibold text-[#243128]">{title}</p>
      <p className="mt-1 text-xs text-[#7B867F]">{description}</p>
    </div>

    <button
      type="button"
      onClick={()=>onChange(!checked)}
      className={`relative h-7 w-12 rounded-full transition ${checked?"bg-[#1E7A3A]":"bg-[#CBD5CE]"}`}
    >
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${checked?"left-6":"left-1"}`}/>
    </button>
  </div>
);

const AccountSettings=()=>{

  const [form,setForm]=useState({
    fullName:"Rupesh Kumar Dash",
    email:"hr@darshai.in",
    phone:"+91 9876543210",
    department:"Human Resources",
    designation:"HR Recruiter",
    language:"English",
    timezone:"Asia/Kolkata",
    landingPage:"overview",
    pageSize:"20",
    theme:"light",
    applicationAlerts:true,
    interviewAlerts:true,
    dailySummary:true,
    resumeNotifications:true
  });

  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));

  return(
    <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="space-y-6">

      {/* Personal */}

      <Card title="Personal Information" description="Basic information about your HR account.">
        <div className="grid gap-5 md:grid-cols-2">

          <Input
            label="Full Name"
            icon={UserRound}
            value={form.fullName}
            onChange={e=>update("fullName",e.target.value)}
          />

          <Input
            label="Email"
            icon={Mail}
            type="email"
            value={form.email}
            onChange={e=>update("email",e.target.value)}
          />

          <Input
            label="Phone"
            icon={Phone}
            value={form.phone}
            onChange={e=>update("phone",e.target.value)}
          />

          <Input
            label="Department"
            icon={UserRound}
            value={form.department}
            onChange={e=>update("department",e.target.value)}
          />

          <Input
            label="Designation"
            icon={UserRound}
            value={form.designation}
            onChange={e=>update("designation",e.target.value)}
          />

        </div>
      </Card>

      {/* Dashboard */}

      <Card title="Dashboard Preferences" description="Customize your HR dashboard experience.">
        <div className="grid gap-5 md:grid-cols-2">

          <Select label="Default Landing Page" value={form.landingPage} onChange={e=>update("landingPage",e.target.value)}>
            <option value="overview">Overview</option>
            <option value="applications">Applications</option>
          </Select>

          <Select label="Applications Per Page" value={form.pageSize} onChange={e=>update("pageSize",e.target.value)}>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Select>

          <Select label="Language" value={form.language} onChange={e=>update("language",e.target.value)}>
            <option>English</option>
          </Select>

          <Select label="Timezone" value={form.timezone} onChange={e=>update("timezone",e.target.value)}>
            <option>Asia/Kolkata</option>
          </Select>

        </div>
      </Card>

      {/* Appearance */}

      <Card title="Appearance" description="Choose your preferred dashboard theme.">

        <div className="grid gap-4 sm:grid-cols-2">

          <button
            onClick={()=>update("theme","light")}
            className={`rounded-2xl border p-5 transition ${form.theme==="light"?"border-[#1E7A3A] bg-[#F4FBF6]":"border-[#E5EBE6]"}`}
          >
            <Sun className="h-7 w-7 text-[#1E7A3A]"/>
            <h4 className="mt-4 text-sm font-semibold">Light Theme</h4>
            <p className="mt-1 text-xs text-[#7D8780]">Clean and bright interface.</p>
          </button>

          <button
            onClick={()=>update("theme","dark")}
            className={`rounded-2xl border p-5 transition ${form.theme==="dark"?"border-[#1E7A3A] bg-[#F4FBF6]":"border-[#E5EBE6]"}`}
          >
            <Moon className="h-7 w-7 text-[#1E7A3A]"/>
            <h4 className="mt-4 text-sm font-semibold">Dark Theme</h4>
            <p className="mt-1 text-xs text-[#7D8780]">Ideal for low-light environments.</p>
          </button>

        </div>

      </Card>

      {/* Notifications */}

      <Card title="Notification Preferences" description="Select notifications you would like to receive.">

        <div className="space-y-4">

          <Toggle
            title="New Application Alerts"
            description="Notify when a candidate submits a new application."
            checked={form.applicationAlerts}
            onChange={v=>update("applicationAlerts",v)}
          />

          <Toggle
            title="Interview Notifications"
            description="Receive reminders for scheduled interviews."
            checked={form.interviewAlerts}
            onChange={v=>update("interviewAlerts",v)}
          />

          <Toggle
            title="Daily Recruitment Summary"
            description="Receive a summary email every evening."
            checked={form.dailySummary}
            onChange={v=>update("dailySummary",v)}
          />

          <Toggle
            title="Resume Upload Notifications"
            description="Notify if candidate resume upload fails."
            checked={form.resumeNotifications}
            onChange={v=>update("resumeNotifications",v)}
          />

        </div>

      </Card>

      <div className="flex justify-end">
        <button className="flex h-11 items-center gap-2 rounded-xl bg-[#1E7A3A] px-6 text-sm font-semibold text-white transition hover:bg-[#17652F]">
          <Save className="h-4 w-4"/>
          Save Preferences
        </button>
      </div>

    </motion.div>
  );
};

export default AccountSettings;