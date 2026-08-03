import {BriefcaseBusiness,Calendar,GraduationCap,Link2,Mail,MapPin,Phone,UserRound} from "lucide-react";

const Row=({label,value})=>(
  <div className="space-y-1">
    <p className="text-[10px] font-semibold uppercase tracking-[.12em] text-[#8B958E]">{label}</p>
    <p className="break-words text-sm font-medium text-[#26352B]">{value||"—"}</p>
  </div>
);

const Card=({title,icon:Icon,children})=>(
  <section className="rounded-2xl border border-[#E3E9E4] bg-white p-5">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDF7F0] text-[#1E7A3A]">
        <Icon className="h-[18px] w-[18px]"/>
      </div>

      <h3 className="text-sm font-semibold text-[#243128]">
        {title}
      </h3>
    </div>

    {children}
  </section>
);

const CandidateOverview=({application})=>{
  if(!application) return null;

  return(
    <div className="space-y-5 bg-[#F8FAF8] p-4 sm:p-6">

      {/* Job */}

      <Card title="Applied Position" icon={BriefcaseBusiness}>
        <div className="grid gap-5 sm:grid-cols-2">

          <Row label="Position" value={application.jobTitle}/>

          <Row label="Department" value={application.department}/>

          <Row label="Employment Type" value={application.employmentType}/>

          <Row label="Work Mode" value={application.workMode}/>

          <Row label="Location" value={application.location}/>

          <Row label="Job Code" value={application.jobCode}/>

        </div>
      </Card>

      {/* Personal */}

      <Card title="Personal Information" icon={UserRound}>
        <div className="grid gap-5 sm:grid-cols-2">

          <Row label="Full Name" value={application.fullName}/>

          <Row label="Candidate Code" value={application.candidateCode}/>

          <Row label="Email" value={application.email}/>

          <Row label="Phone" value={application.phone}/>

          <Row label="Gender" value={application.gender}/>

          <Row label="Date of Birth" value={application.dob?new Date(application.dob).toLocaleDateString("en-IN"):"—"}/>

          <Row label="City" value={application.city}/>

          <Row label="State" value={application.state}/>

          <Row label="Country" value={application.country}/>

        </div>
      </Card>

      {/* Education */}

      <Card title="Education" icon={GraduationCap}>
        <div className="grid gap-5 sm:grid-cols-2">

          <Row label="Qualification" value={application.qualification}/>

          <Row label="Specialization" value={application.specialization}/>

          <Row label="Institute" value={application.institutionName}/>

          <Row label="University" value={application.universityName}/>

          <Row label="Grade Type" value={application.gradeType}/>

          <Row label="Grade" value={application.grade}/>

          <Row label="Passing Year" value={application.passingYear}/>

        </div>
      </Card>

      {/* Application */}

      <Card title="Application Information" icon={Calendar}>
        <div className="grid gap-5 sm:grid-cols-2">

          <Row label="Application Code" value={application.applicationCode}/>

          <Row label="Status" value={application.status}/>

          <Row label="Applied On" value={application.appliedAt?new Date(application.appliedAt).toLocaleString("en-IN"):"—"}/>

          <Row label="Last Status Change" value={application.lastStatusChangedAt?new Date(application.lastStatusChangedAt).toLocaleString("en-IN"):"—"}/>

        </div>
      </Card>

      {/* Links */}

      <Card title="Professional Links" icon={Link2}>
        <div className="space-y-4">

          <a href={application.linkedinUrl||"#"} target="_blank" rel="noreferrer" className={`flex items-center gap-3 rounded-xl border p-3 transition ${application.linkedinUrl?"hover:border-[#1E7A3A] hover:bg-[#F7FCF8]":"pointer-events-none opacity-40"}`}>
            <Link2 className="h-4 w-4"/>
            <span className="truncate text-sm">
              {application.linkedinUrl||"LinkedIn not available"}
            </span>
          </a>

          <a href={application.githubUrl||"#"} target="_blank" rel="noreferrer" className={`flex items-center gap-3 rounded-xl border p-3 transition ${application.githubUrl?"hover:border-[#1E7A3A] hover:bg-[#F7FCF8]":"pointer-events-none opacity-40"}`}>
            <Link2 className="h-4 w-4"/>
            <span className="truncate text-sm">
              {application.githubUrl||"GitHub not available"}
            </span>
          </a>

          <a href={application.portfolioUrl||"#"} target="_blank" rel="noreferrer" className={`flex items-center gap-3 rounded-xl border p-3 transition ${application.portfolioUrl?"hover:border-[#1E7A3A] hover:bg-[#F7FCF8]":"pointer-events-none opacity-40"}`}>
            <Link2 className="h-4 w-4"/>
            <span className="truncate text-sm">
              {application.portfolioUrl||"Portfolio not available"}
            </span>
          </a>

        </div>
      </Card>

    </div>
  );
};

export default CandidateOverview;