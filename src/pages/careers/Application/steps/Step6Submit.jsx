import {motion} from "framer-motion";
import {CircleCheckBig,RotateCcw,House,Mail,Briefcase} from "lucide-react";

const Step6Submit=({applicationCode,jobTitle,resetForm})=>(
  <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.45}} className="mx-auto max-w-4xl">
    <div className="overflow-hidden rounded-[36px] border border-[#E5ECE7] bg-white shadow-[0_25px_70px_rgba(36,43,38,.10)]">
      <div className="bg-gradient-to-r from-[#1E7A3A] via-[#238741] to-[#2D9950] px-5 py-10 text-center sm:px-8 sm:py-12 md:px-10 md:py-14">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white sm:h-24 sm:w-24 md:h-28 md:w-28">
          <CircleCheckBig className="h-11 w-11 text-[#1E7A3A] sm:h-13 sm:w-13 md:h-[60px] md:w-[60px]"/>
        </div>
        <h1 className="mt-8 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">Application Submitted Successfully</h1>
        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-white/90 sm:text-[16px] md:text-[17px] md:leading-8">Thank you for your interest in joining DarshAI. Your application has been received successfully and is now under review by our recruitment team.</p>
      </div>

      <div className="space-y-6 p-5 sm:p-7 md:space-y-8 md:p-10">
        <div className="rounded-3xl border border-[#E5ECE7] bg-[#F8FBF9] p-5 sm:p-6 md:p-8">
          <h3 className="text-lg font-bold text-[#1E2A22]">Application Details</h3>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 md:gap-6">
            <div className="rounded-2xl bg-white p-5">
              <div className="flex items-start gap-3">
                <Briefcase size={22} className="mt-0.5 shrink-0 text-[#1E7A3A]"/>
                <div className="min-w-0">
                  <p className="text-sm text-[#728077]">Position Applied</p>
                  <h4 className="mt-1 break-words font-semibold text-[#1E2A22]">{jobTitle||"Selected Position"}</h4>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5">
              <div className="flex items-start gap-3">
                <Mail size={22} className="mt-0.5 shrink-0 text-[#1E7A3A]"/>
                <div className="min-w-0">
                  <p className="text-sm text-[#728077]">Application ID</p>
                  <h4 className="mt-1 break-all font-semibold text-[#1E2A22]">{applicationCode||"Pending"}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#FFF9EC] p-5 sm:p-6 md:p-7">
          <h3 className="font-bold text-[#1E2A22]">What Happens Next?</h3>
          <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#5C6961]">
            <p>✓ Our Talent Acquisition team will review your profile.</p>
            <p>✓ Shortlisted candidates will receive an interview invitation.</p>
            <p>✓ Updates will be sent to your registered email address.</p>
            <p>✓ Please keep your Application ID for future communication.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button type="button" onClick={()=>window.location.href="/"} className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#1E7A3A] px-8 font-semibold text-white transition hover:bg-[#17622F] sm:w-auto">
            <House size={18}/> Back to Home
          </button>
          <button type="button" onClick={resetForm} className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#D7E3DA] bg-white px-8 font-semibold text-[#1E7A3A] transition hover:bg-[#F4F8F5] sm:w-auto">
            <RotateCcw size={18}/> Submit Another Application
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

export default Step6Submit;