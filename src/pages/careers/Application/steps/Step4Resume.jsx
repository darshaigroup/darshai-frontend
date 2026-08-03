import {Controller,useFormContext} from "react-hook-form";
import {motion} from "framer-motion";
import {UploadCloud,FileText,Trash2} from "lucide-react";

const MAX_SIZE=1*1024*1024;
const ACCEPTED=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const Step4Resume=()=>{
  const {control,setError,clearErrors,formState:{errors}}=useFormContext();

  const validateFile=file=>{
    if(!file) return false;
    if(file.size>MAX_SIZE){
      setError("resume",{type:"manual",message:"Maximum file size is 1 MB."});
      return false;
    }
    if(!ACCEPTED.includes(file.type)){
      setError("resume",{type:"manual",message:"Only PDF, DOC and DOCX files are allowed."});
      return false;
    }
    clearErrors("resume");
    return true;
  };

  return(
    <Controller name="resume" control={control} render={({field:{value,onChange}})=>(
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.35}} className="space-y-6">
        <div
          onDragOver={e=>e.preventDefault()}
          onDrop={e=>{
            e.preventDefault();
            const file=e.dataTransfer.files?.[0];
            if(validateFile(file)) onChange(file);
          }}
          className={`rounded-3xl border-2 border-dashed bg-[#FBFCFB] p-12 text-center transition ${errors.resume?"border-red-400":"border-[#BFD9C7] hover:border-[#1E7A3A]"}`}
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EEF8F1]">
            <UploadCloud size={38} className="text-[#1E7A3A]"/>
          </div>

          <h3 className="mt-6 text-xl font-bold text-[#1E2A22]">Upload Your Resume</h3>

          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-7 text-[#6A756E]">
            Drag & drop your resume here or click below to browse from your device.
          </p>

          <label className="mt-8 inline-flex cursor-pointer items-center rounded-full bg-[#1E7A3A] px-8 py-3 font-semibold text-white transition hover:bg-[#17612E]">
            Browse Resume
            <input
              hidden
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={e=>{
                const file=e.target.files?.[0];
                if(validateFile(file)) onChange(file);
                e.target.value="";
              }}
            />
          </label>

          <div className="mt-8 space-y-2 text-sm text-[#7B857E]">
            <p>Supported Formats</p>
            <p className="font-semibold">PDF • DOC • DOCX</p>
            <p>Maximum Size: 1 MB</p>
          </div>
        </div>

        {errors.resume&&<p className="text-center text-sm font-medium text-red-500">{errors.resume.message}</p>}

        {value&&(
          <motion.div layout className="flex items-center justify-between rounded-2xl border border-[#DCE8DF] bg-[#F8FBF9] p-5">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E8F7ED]">
                <FileText size={24} className="text-[#1E7A3A]"/>
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-[#1E2A22]">{value.name}</p>
                <p className="text-sm text-[#6E786F]">{(value.size/1024/1024).toFixed(2)} MB</p>
              </div>
            </div>

            <button type="button" onClick={()=>{onChange(null);clearErrors("resume");}} className="shrink-0 rounded-full p-3 text-red-500 transition hover:bg-red-50" aria-label="Remove resume">
              <Trash2 size={20}/>
            </button>
          </motion.div>
        )}
      </motion.div>
    )}/>
  );
};

export default Step4Resume;