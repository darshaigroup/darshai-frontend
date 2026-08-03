import {Controller,useFormContext} from "react-hook-form";
import {motion} from "framer-motion";
import {GraduationCap,BookOpen,School,Landmark,Calendar,Percent} from "lucide-react";

const Input=({icon:Icon,error,...props})=>(
  <div className="space-y-2">
    <div className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${error?"border-red-400 focus-within:border-red-500":"border-[#D8E2DC] focus-within:border-[#1E7A3A]"}`}>
      <Icon className={`mr-3 h-5 w-5 shrink-0 ${error?"text-red-500":"text-[#8A958D]"}`}/>
      <input {...props} className="h-full min-w-0 w-full bg-transparent text-[15px] text-[#1C2A21] outline-none placeholder:text-[#9CA7A1]"/>
    </div>
    {error&&<p className="text-xs font-medium text-red-500">{error.message}</p>}
  </div>
);

const Select=({icon:Icon,error,children,...props})=>(
  <div className="space-y-2">
    <div className={`flex h-14 items-center rounded-2xl border bg-white px-4 transition-all ${error?"border-red-400 focus-within:border-red-500":"border-[#D8E2DC] focus-within:border-[#1E7A3A]"}`}>
      <Icon className={`mr-3 h-5 w-5 shrink-0 ${error?"text-red-500":"text-[#8A958D]"}`}/>
      <select {...props} className="h-full min-w-0 w-full bg-transparent text-[15px] text-[#1C2A21] outline-none">
        {children}
      </select>
    </div>
    {error&&<p className="text-xs font-medium text-red-500">{error.message}</p>}
  </div>
);

const Field=({label,required,children})=>(
  <div className="min-w-0 space-y-2">
    <label className="text-sm font-semibold uppercase tracking-wide text-[#243128]">{label}{required&&<span className="text-red-500"> *</span>}</label>
    {children}
  </div>
);

const MAX_PASSING_YEAR=new Date().getFullYear()+10;

const Step2Education=()=>{
  const {control,watch,formState:{errors}}=useFormContext();
  const gradeType=watch("gradeType");
  const gradeLabel=gradeType==="CGPA"?"CGPA":gradeType==="Percentage"?"Percentage":"CGPA / Percentage";

  return(
    <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.35}} className="space-y-8">
      <div className="grid gap-7 md:grid-cols-2">
        <Field label="Highest Qualification" required>
          <Controller name="qualification" control={control} render={({field})=>(
            <Select {...field} icon={GraduationCap} error={errors.qualification}>
              <option value="">Select Qualification</option>
              <option value="High School">High School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </Select>
          )}/>
        </Field>

        <Field label="Course / Specialization" required>
          <Controller name="specialization" control={control} render={({field})=><Input {...field} icon={BookOpen} placeholder="MBA/MCA" error={errors.specialization}/>}/>
        </Field>

        <Field label="College / Institution" required>
          <Controller name="college" control={control} render={({field})=><Input {...field} icon={School} placeholder="Enter college or institution" error={errors.college}/>}/>
        </Field>

        <Field label="University" required>
          <Controller name="university" control={control} render={({field})=><Input {...field} icon={Landmark} placeholder="Enter university name" error={errors.university}/>}/>
        </Field>

        <Field label="Grade Type" required>
          <Controller name="gradeType" control={control} render={({field})=>(
            <Select {...field} icon={Percent} error={errors.gradeType}>
              <option value="">Select Grade Type</option>
              <option value="CGPA">CGPA</option>
              <option value="Percentage">Percentage</option>
            </Select>
          )}/>
        </Field>

        <Field label={gradeLabel} required>
          <Controller name="grade" control={control} render={({field})=><Input {...field} icon={Percent} type="number" min="0" max={gradeType==="CGPA"?"10":"100"} step="0.01" inputMode="decimal" placeholder={gradeType==="CGPA"?"Example: 8.9":gradeType==="Percentage"?"Example: 89":"8.9 or 89"} error={errors.grade}/>}/>
        </Field>

        <Field label="Year of Passing" required>
          <Controller name="passingYear" control={control} render={({field})=><Input {...field} icon={Calendar} type="number" min="1950" max={MAX_PASSING_YEAR} inputMode="numeric" placeholder="2025" error={errors.passingYear}/>}/>
        </Field>
      </div>
    </motion.div>
  );
};

export default Step2Education;