import {FormProvider} from "react-hook-form";
import {AnimatePresence,motion} from "framer-motion";
import {Sparkles} from "lucide-react";
import FormHeader from "./components/FormHeader";
import StepNavigation from "./components/StepNavigation";
import Step1Personal from "./steps/Step1Personal";
import Step2Education from "./steps/Step2Education";
import Step3JobDetails from "./steps/Step3JobDetails";
import Step4Resume from "./steps/Step4Resume";
import Step5ReviewDeclaration from "./steps/Step5ReviewDeclaration";
import Step6Submit from "./steps/Step6Submit";
import useApplicationForm from "./hooks/useApplicationForm";

const steps=[Step1Personal,Step2Education,Step3JobDetails,Step4Resume,Step5ReviewDeclaration];

const ApplicationSection=()=>{
  const {methods,step,loading,success,applicationCode,jobTitle,nextStep,prevStep,goToStep,submit,resetForm}=useApplicationForm();
  const CurrentStep=steps[step-1];

  if(success) return(
    <section className="bg-gradient-to-b from-[#F5FBF7] via-white to-[#F7FAF8] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Step6Submit applicationCode={applicationCode} jobTitle={jobTitle} resetForm={resetForm}/>
      </div>
    </section>
  );

  return(
    <section id="application" className="bg-[#FBF8F1] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B8D9C2] bg-[#EDF8F0] px-4 py-2 text-[11px] font-semibold uppercase tracking-[.08em] text-[#1E7A3A] sm:px-5 sm:text-xs">
            <Sparkles size={14}/> Direct Talent Portal
          </div>
          <h1 className="mt-7 font-serif text-3xl font-bold tracking-[-.04em] text-[#18271E] sm:text-4xl md:text-[54px]">Candidate Registration</h1>
          <p className="mx-auto mb-8 mt-5 max-w-3xl text-[15px] leading-7 text-[#627067] sm:mb-10 sm:text-base md:mb-12 md:text-lg md:leading-8">Take the first step toward shaping the future of AI and preventive healthcare in India.</p>
        </motion.div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submit)} className="overflow-hidden rounded-[24px] border border-[#E7DBC2] bg-white shadow-[0_30px_70px_rgba(41,43,34,.12)] sm:rounded-[28px] md:rounded-[34px]">
            <div className="p-4 sm:p-6 md:p-10">
              <FormHeader step={step} total={steps.length} onStepClick={goToStep}/>
            </div>

            <motion.div layout className="border-t border-[#EEF1EE] px-4 py-6 sm:px-6 sm:py-7 md:px-10 md:py-8">
              <AnimatePresence mode="wait">
                <motion.div key={step} initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:.3}}>
                  <CurrentStep goToStep={goToStep}/>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <StepNavigation step={step} total={steps.length} isLoading={loading} onBack={prevStep} onNext={nextStep}/>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ApplicationSection;