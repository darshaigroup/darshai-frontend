import { FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import FormHeader from "./components/FormHeader";
import StepNavigation from "./components/StepNavigation";

import Step1Personal from "./steps/Step1Personal";
import Step2Education from "./steps/Step2Education";
import Step3JobDetails from "./steps/Step3JobDetails";
import Step4Resume from "./steps/Step4Resume";
import Step5ReviewDeclaration from "./steps/Step5ReviewDeclaration";
import Step6Submit from "./steps/Step6Submit";

import useApplicationForm from "./hooks/useApplicationForm";

const steps=[
  Step1Personal,
  Step2Education,
  Step3JobDetails,
  Step4Resume,
  Step5ReviewDeclaration
];

const ApplicationSection=()=>{

  const{
    methods,
    step,
    loading,
    success,
    applicationCode,
    jobTitle,
    nextStep,
    prevStep,
    goToStep,
    submit,
    resetForm
  }=useApplicationForm();

  const CurrentStep=steps[step-1];

  if(success){

    return(

      <section className="bg-gradient-to-b from-[#F5FBF7] via-white to-[#F7FAF8] py-20">

        <div className="mx-auto max-w-5xl px-4">

          <Step6Submit
            applicationCode={applicationCode}
            jobTitle={jobTitle}
            resetForm={resetForm}
          />

        </div>

      </section>

    );

  }

  return(

    <section id="application" className="bg-[#FBF8F1] py-20">

      <div className="mx-auto max-w-6xl px-4">
         <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B8D9C2] bg-[#EDF8F0] px-5 py-2 text-xs font-semibold uppercase tracking-[.08em] text-[#1E7A3A]">
          <Sparkles size={14} />
          Direct Talent Portal
        </div>

        <h1 className="mt-7 font-serif text-[54px] font-bold tracking-[-.04em] text-[#18271E]">
          Candidate Registration
        </h1>

        <p className="mx-auto mt-5 mb-12 max-w-3xl text-lg leading-8 text-[#627067]">
          Take the first step toward shaping the future of AI and preventive
          healthcare in India.
        </p>
      </motion.div>
        <FormProvider {...methods}>

          <form
            onSubmit={methods.handleSubmit(submit)}
            className="overflow-hidden rounded-[34px] border border-[#E7DBC2] bg-white shadow-[0_30px_70px_rgba(41,43,34,.12)]"
          >

            <div className="p-8 md:p-10">

              <FormHeader
                step={step}
                total={steps.length}
                onStepClick={goToStep}
              />

            </div>

            <motion.div
              layout
              className="border-t border-[#EEF1EE] px-8 py-8 md:px-10"
            >

              <AnimatePresence mode="wait">

                <motion.div
                  key={step}
                  initial={{opacity:0,x:30}}
                  animate={{opacity:1,x:0}}
                  exit={{opacity:0,x:-30}}
                  transition={{duration:.3}}
                >

                  <CurrentStep goToStep={goToStep}/>

                </motion.div>

              </AnimatePresence>

            </motion.div>

            <StepNavigation
              step={step}
              total={steps.length}
              isLoading={loading}
              onBack={prevStep}
              onNext={nextStep}
            />

          </form>

        </FormProvider>

      </div>

    </section>

  );

};

export default ApplicationSection;