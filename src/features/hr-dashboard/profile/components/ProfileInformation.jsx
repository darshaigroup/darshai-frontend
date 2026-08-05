import {Activity,Building2,CalendarDays,Globe,IdCard,Laptop,Mail,MapPin,Phone,ShieldCheck,UserRound} from "lucide-react";
import {motion} from "framer-motion";

const profile={
  personal:{
    firstName:"Varsha",
    lastName:"Devadiga",
    gender:"Female",
    dob:"-"
  },
  contact:{
    email:"varshadevadiga@darshai.in",
    phone:"+91 7676740701",
    city:"Mangaluru",
    state:"Karnataka",
    country:"India"
  },
  employment:{
    employeeId:"HR-001",
    designation:"HR Recruiter",
    department:"Human Resources",
    joiningDate:"April 2026",
    reportingTo:"HR Manager",
    employmentType:"Full Time"
  },
  account:{
    username:"varshadevadiga",
    role:"HR",
    status:"Active",
    lastLogin:"today"
  }
};

const Card=({title,icon:Icon,children})=>(
  <motion.section initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="rounded-3xl border border-[#E3E9E4] bg-white p-6">
    <div className="mb-6 flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EDF7F0] text-[#1E7A3A]">
        <Icon className="h-5 w-5"/>
      </div>
      <h2 className="text-lg font-semibold text-[#243128]">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const Item=({label,value})=>(
  <div className="space-y-1">
    <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8A958D]">{label}</p>
    <p className="break-words text-sm font-medium text-[#243128]">{value||"—"}</p>
  </div>
);

const Stat=({icon:Icon,title,value,color})=>(
  <div className="rounded-2xl border border-[#E5EBE6] bg-white p-5">
    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
      <Icon className="h-5 w-5"/>
    </div>
    <h4 className="mt-4 text-sm font-medium text-[#758078]">{title}</h4>
    <p className="mt-1 text-2xl font-bold tracking-tight text-[#243128]">{value}</p>
  </div>
);

const ProfileInformation=()=>(
  <div className="space-y-6">

    {/* <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

      <Stat icon={Activity} title="Applications Managed" value="324" color="bg-[#EDF7F0] text-[#1E7A3A]"/>

      <Stat icon={UserRound} title="Candidates Reviewed" value="891" color="bg-[#F4F6FF] text-[#5567F5]"/>

      <Stat icon={CalendarDays} title="Years in HR" value="2+" color="bg-[#FFF6EA] text-[#E48A1A]"/>

      <Stat icon={ShieldCheck} title="Account Status" value="Active" color="bg-[#EDF7F0] text-[#1E7A3A]"/>

    </section> */}

    <div className="grid gap-6 xl:grid-cols-2">

      <Card title="Personal Information" icon={UserRound}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Item label="First Name" value={profile.personal.firstName}/>
          <Item label="Last Name" value={profile.personal.lastName}/>
          <Item label="Gender" value={profile.personal.gender}/>
          <Item label="Date of Birth" value={new Date(profile.personal.dob).toLocaleDateString("en-IN")}/>
        </div>
      </Card>

      <Card title="Contact Information" icon={Phone}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Item label="Email" value={profile.contact.email}/>
          <Item label="Phone" value={profile.contact.phone}/>
          <Item label="City" value={profile.contact.city}/>
          <Item label="State" value={profile.contact.state}/>
          <Item label="Country" value={profile.contact.country}/>
        </div>
      </Card>

      <Card title="Employment Information" icon={Building2}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Item label="Employee ID" value={profile.employment.employeeId}/>
          <Item label="Designation" value={profile.employment.designation}/>
          <Item label="Department" value={profile.employment.department}/>
          <Item label="Employment Type" value={profile.employment.employmentType}/>
          <Item label="Reporting To" value={profile.employment.reportingTo}/>
          <Item label="Joining Date" value={profile.employment.joiningDate}/>
        </div>
      </Card>

      <Card title="Account Information" icon={Laptop}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Item label="Username" value={profile.account.username}/>
          <Item label="Role" value={profile.account.role}/>
          <Item label="Status" value={profile.account.status}/>
          <Item label="Last Login" value={profile.account.lastLogin}/>
        </div>
      </Card>

    </div>

    <Card title="Quick Information" icon={IdCard}>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAF8] p-4">
          <Mail className="h-5 w-5 text-[#1E7A3A]"/>
          <div>
            <p className="text-[10px] uppercase tracking-[.12em] text-[#8A958D]">Official Email</p>
            <p className="text-sm font-medium text-[#243128]">{profile.contact.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAF8] p-4">
          <Phone className="h-5 w-5 text-[#1E7A3A]"/>
          <div>
            <p className="text-[10px] uppercase tracking-[.12em] text-[#8A958D]">Contact</p>
            <p className="text-sm font-medium text-[#243128]">{profile.contact.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAF8] p-4">
          <MapPin className="h-5 w-5 text-[#1E7A3A]"/>
          <div>
            <p className="text-[10px] uppercase tracking-[.12em] text-[#8A958D]">Location</p>
            <p className="text-sm font-medium text-[#243128]}">{`${profile.contact.city}, ${profile.contact.state}`}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-[#F8FAF8] p-4">
          <Globe className="h-5 w-5 text-[#1E7A3A]"/>
          <div>
            <p className="text-[10px] uppercase tracking-[.12em] text-[#8A958D]">Country</p>
            <p className="text-sm font-medium text-[#243128]">{profile.contact.country}</p>
          </div>
        </div>

      </div>
    </Card>

  </div>
);

export default ProfileInformation;