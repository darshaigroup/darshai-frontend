import { motion } from "framer-motion";
import { CircleCheckBig, Download, House, Mail, Briefcase } from "lucide-react";

const Step6Submit = ({ applicationCode, jobTitle, resetForm }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="mx-auto max-w-4xl"
    >
      <div className="overflow-hidden rounded-[36px] border border-[#E5ECE7] bg-white shadow-[0_25px_70px_rgba(36,43,38,.10)]">
        <div className="bg-gradient-to-r from-[#1E7A3A] via-[#238741] to-[#2D9950] px-10 py-14 text-center">
          <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-white">
            <CircleCheckBig size={60} className="text-[#1E7A3A]" />
          </div>

          <h1 className="mt-8 text-4xl font-bold text-white">
            Application Submitted Successfully
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-8 text-white/90">
            Thank you for your interest in joining DarshAI. Your application has
            been received successfully and is now under review by our
            recruitment team.
          </p>
        </div>

        <div className="space-y-8 p-10">
          <div className="rounded-3xl border border-[#E5ECE7] bg-[#F8FBF9] p-8">
            <h3 className="text-lg font-bold text-[#1E2A22]">
              Application Details
            </h3>

            <div className="mt-7 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-3">
                  <Briefcase size={22} className="text-[#1E7A3A]" />

                  <div>
                    <p className="text-sm text-[#728077]">Position Applied</p>

                    <h4 className="font-semibold text-[#1E2A22]">
                      {jobTitle || "Selected Position"}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-3">
                  <Mail size={22} className="text-[#1E7A3A]" />

                  <div>
                    <p className="text-sm text-[#728077]">Application ID</p>

                    <h4 className="font-semibold text-[#1E2A22]">
                      {applicationCode || "Pending"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#FFF9EC] p-7">
            <h3 className="font-bold text-[#1E2A22]">What Happens Next?</h3>

            <div className="mt-5 space-y-4 text-[15px] leading-7 text-[#5C6961]">
              <p>✓ Our Talent Acquisition team will review your profile.</p>

              <p>
                ✓ Shortlisted candidates will receive an interview invitation.
              </p>

              <p>✓ Updates will be sent to your registered email address.</p>

              <p>✓ Please keep your Application ID for future communication.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-center">
            <button
              type="button"
              onClick={() => (window.location.href = "/")}
              className="flex h-14 items-center justify-center gap-2 rounded-full bg-[#1E7A3A] px-8 font-semibold text-white transition hover:bg-[#17622F]"
            >
              <House size={18} />
              Back to Home
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="flex h-14 items-center justify-center gap-2 rounded-full border border-[#D7E3DA] bg-white px-8 font-semibold text-[#1E7A3A] transition hover:bg-[#F4F8F5]"
            >
              <Download size={18} />
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Step6Submit;
