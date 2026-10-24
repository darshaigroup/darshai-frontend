import{useMemo,useState}from"react";
import{motion,AnimatePresence}from"framer-motion";
import{ArrowRight,ArrowLeft,ChevronDown,Search}from"lucide-react";
import{Link}from"react-router-dom";
import{countryOptions}from"./data/countries";
import EnquiryHeader from"./components/EnquiryHeader";
import EnquiryProgress from"./components/EnquiryProgress";
import EnquiryOption from"./components/EnquiryOption";
import EnquiryInput from"./components/EnquiryInput";
import EnquiryStep from"./components/EnquiryStep";
import EnquirySuccess from"./components/EnquirySuccess";
import useWellnessEnquiry from"./hooks/useWellnessEnquiry";
import{enquiryOptions}from"./data/enquiryOptions";

const pageVariants={
  initial:{opacity:0,y:20,scale:.985},
  animate:{opacity:1,y:0,scale:1,transition:{duration:.45,ease:[.22,1,.36,1]}},
  exit:{opacity:0,y:-15,scale:.99,transition:{duration:.25}}
};

const itemVariants={
  hidden:{opacity:0,y:14},
  show:{opacity:1,y:0,transition:{duration:.35,ease:[.22,1,.36,1]}}
};

export default function WellnessEnquiry(){
  const{
    form,step,loading,submitted,error,update,updateConsent,toggleGoal,next,back,submit
  }=useWellnessEnquiry();

  const[errors,setErrors]=useState({});
  const[residenceCountryOpen,setResidenceCountryOpen]=useState(false);
  const[residenceCountrySearch,setResidenceCountrySearch]=useState("");

  const selectedResidenceCountry=useMemo(
    ()=>countryOptions.find(country=>country.name===form.country),
    [form.country]
  );

  const filteredResidenceCountries=useMemo(()=>{
    const query=residenceCountrySearch.trim().toLowerCase();
    if(!query)return countryOptions;

    return countryOptions.filter(country=>
      country.name.toLowerCase().includes(query)||
      country.code.toLowerCase().includes(query)
    );
  },[residenceCountrySearch]);

  const validateEmail=email=>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email||"").trim());

  const validatePhone=phone=>{
    const digits=String(phone||"").replace(/\D/g,"");
    return digits.length>=7&&digits.length<=15;
  };

  const validateStep=()=>{
    const e={};

    if(step===1){
      if(!form.name?.trim())e.name="Full name is required.";
      if(!form.email?.trim())e.email="Email address is required.";
      else if(!validateEmail(form.email))
        e.email="Enter a valid email address.";

      if(!form.phone?.trim())e.phone="Mobile number is required.";
      else if(!validatePhone(form.phone))
        e.phone="Enter a valid mobile number.";

      if(!form.contactMethod)
        e.contactMethod="Select a preferred contact method.";

      if(!form.country?.trim())
        e.country="Country of residence is required.";
    }

    if(step===2){
      if(!form.journeyFor)
        e.journeyFor="Please select who this journey is for.";

      if(!form.wellnessGoals?.length)
        e.wellnessGoals="Select at least one wellness goal.";

      if(!form.pathway)
        e.pathway="Please select a wellness pathway.";

      if(!form.duration)
        e.duration="Please select a duration.";
    }

    if(step===3){
      if(!form.startTime)
        e.startTime="Please select when you are considering starting.";

      if(!form.budget)
        e.budget="Please select an approximate budget range.";
    }

    if(step===4&&!form.consentToProcess)
      e.consentToProcess="Consent to process your information is required.";

    setErrors(e);
    return Object.keys(e).length===0;
  };

  const clearError=field=>{
    if(!errors[field])return;

    setErrors(prev=>{
      const next={...prev};
      delete next[field];
      return next;
    });
  };

  const change=(field,value)=>{
    update(field,value);
    clearError(field);
  };

  const handleConsentChange=value=>{
    updateConsent(value);
    clearError("consentToProcess");
  };

  const handleNext=()=>{
    if(validateStep())next();
  };

  const handleSubmit=async()=>{
    if(!form.consentToProcess){
      setErrors({
        consentToProcess:"Consent to process your information is required."
      });
      return;
    }

    if(validateStep())await submit();
  };

  const canContinue=()=>{
    if(step===1)
      return !!(
        form.name?.trim()&&
        form.email?.trim()&&
        validateEmail(form.email)&&
        form.phone?.trim()&&
        validatePhone(form.phone)&&
        form.contactMethod&&
        form.country?.trim()
      );

    if(step===2)
      return !!(
        form.journeyFor&&
        form.wellnessGoals?.length>0&&
        form.pathway&&
        form.duration
      );

    if(step===3)
      return !!(form.startTime&&form.budget);

    if(step===4)
      return(
        form.consentToProcess===true&&
        form.medicalDisclaimer===true&&
        form.informationAccuracy===true
      );

    return false;
  };

  if(submitted){
    return(
      <main className="min-h-screen bg-[#f4f7f3]">
        <EnquiryHeader step={4} onBack={()=>{}}/>
        <EnquirySuccess/>
      </main>
    );
  }

  return(
    <main className="min-h-screen overflow-hidden bg-[#f4f7f3] text-[#243126]">
      

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{x:[0,30,0],y:[0,-25,0],scale:[1,1.08,1]}}
          transition={{duration:12,repeat:Infinity,ease:"easeInOut"}}
          className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#1e7a3a]/[0.05] blur-3xl"
        />
        <motion.div
          animate={{x:[0,-35,0],y:[0,25,0],scale:[1,1.12,1]}}
          transition={{duration:15,repeat:Infinity,ease:"easeInOut"}}
          className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-[#173C68]/[0.04] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[980px] px-4 py-6 sm:px-6 sm:py-10 md:px-10 md:py-14">
        <motion.div
          initial={{opacity:0,y:-15}}
          animate={{opacity:1,y:0}}
          transition={{duration:.5}}
          className="mb-7 text-center sm:mb-10"
        >
          <motion.p
            initial={{opacity:0,letterSpacing:"0em"}}
            animate={{opacity:1,letterSpacing:".25em"}}
            transition={{duration:.7,delay:.1}}
            className="mb-2 text-[11px] font-semibold text-[#1e7a3a] sm:text-xs"
          >
            DARSHAI GEO-WELLNESS
          </motion.p>

          <h1 className="text-2xl font-semibold tracking-tight text-[#17251c] sm:text-3xl md:text-5xl">
            Client Discovery Form
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-[#69766d] sm:text-sm sm:leading-7">
            Begin your wellness journey with DARSHAI.
          </p>
        </motion.div>

        <EnquiryProgress step={step} total={4}/>

        <AnimatePresence mode="wait">
          {error&&(
            <motion.div
              initial={{opacity:0,y:-10,height:0}}
              animate={{opacity:1,y:0,height:"auto"}}
              exit={{opacity:0,y:-10,height:0}}
              className="mb-5 overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {step===1&&(
              <EnquiryStep title="Let's Get to Know You.">
                <motion.div
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-5"
                >
                  <EnquiryInput
                    label="Full name"
                    value={form.name}
                    onChange={value=>change("name",value)}
                    required
                    error={errors.name}
                    placeholder="Enter your full name"
                  />

                  <EnquiryInput
                    label="Email address"
                    type="email"
                    value={form.email}
                    onChange={value=>change("email",value)}
                    required
                    error={errors.email}
                    placeholder="Enter your email address"
                  />

                  <EnquiryInput
                    label="Mobile number"
                    type="phone"
                    value={form.phone}
                    onChange={value=>change("phone",value)}
                    required
                    error={errors.phone}
                    placeholder="Mobile number"
                  />

                  <div>
                    <label className="mb-3 block text-sm font-medium text-[#243126]">
                      Preferred contact method
                      <span className="ml-1 text-[#1e7a3a]">*</span>
                    </label>

                    <motion.div
                      initial="hidden"
                      animate="show"
                      variants={{
                        show:{transition:{staggerChildren:.06}}
                      }}
                      className="grid gap-3 sm:grid-cols-3"
                    >
                      {enquiryOptions.contactMethods.map(option=>(
                        <motion.div key={option} variants={itemVariants}>
                          <EnquiryOption
                            label={option}
                            selected={form.contactMethod===option}
                            onClick={()=>change("contactMethod",option)}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    <AnimatePresence>
                      {errors.contactMethod&&(
                        <motion.p
                          initial={{opacity:0,y:-5}}
                          animate={{opacity:1,y:0}}
                          exit={{opacity:0}}
                          className="mt-2 text-xs text-red-500"
                        >
                          {errors.contactMethod}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="relative">
                    <label className="mb-3 block text-sm font-medium text-[#243126]">
                      Country of residence
                      <span className="ml-1 text-[#1e7a3a]">*</span>
                    </label>

                    <motion.button
                      whileTap={{scale:.99}}
                      type="button"
                      onClick={()=>{
                        setResidenceCountryOpen(prev=>!prev);
                        setResidenceCountrySearch("");
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border bg-white px-4 py-4 text-left text-sm outline-none transition ${
                        errors.country
                          ?"border-red-300"
                          :"border-[#dce5dd] focus:border-[#1e7a3a] focus:ring-4 focus:ring-[#1e7a3a]/10"
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-3">
                        {selectedResidenceCountry?.flag&&(
                          <motion.span
                            key={selectedResidenceCountry.code}
                            initial={{scale:0,rotate:-20}}
                            animate={{scale:1,rotate:0}}
                            className="shrink-0 text-xl leading-none"
                          >
                            {selectedResidenceCountry.flag}
                          </motion.span>
                        )}

                        <span className={selectedResidenceCountry?"truncate text-[#243126]":"text-[#a0aaa3]"}>
                          {selectedResidenceCountry?.name||"Select your country"}
                        </span>
                      </span>

                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#69766d] transition-transform duration-300 ${
                          residenceCountryOpen?"rotate-180":""
                        }`}
                      />
                    </motion.button>

                    <AnimatePresence>
                      {residenceCountryOpen&&(
                        <motion.div
                          initial={{opacity:0,y:-8,scale:.98}}
                          animate={{opacity:1,y:0,scale:1}}
                          exit={{opacity:0,y:-8,scale:.98}}
                          transition={{duration:.2}}
                          className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] overflow-hidden rounded-2xl border border-[#dce5dd] bg-white shadow-2xl"
                        >
                          <div className="border-b border-[#e5ebe6] p-3">
                            <div className="flex items-center gap-2 rounded-xl border border-[#dce5dd] px-3 transition focus-within:border-[#1e7a3a] focus-within:ring-4 focus-within:ring-[#1e7a3a]/10">
                              <Search size={16} className="shrink-0 text-[#89948c]"/>
                              <input
                                type="text"
                                value={residenceCountrySearch}
                                onChange={e=>setResidenceCountrySearch(e.target.value)}
                                placeholder="Search country..."
                                autoFocus
                                className="w-full bg-transparent px-1 py-3 text-sm outline-none placeholder:text-[#a0aaa3]"
                              />
                            </div>
                          </div>

                          <div className="max-h-72 overflow-y-auto">
                            {filteredResidenceCountries.length>0?
                              filteredResidenceCountries.map(country=>(
                                <motion.button
                                  key={country.code}
                                  type="button"
                                  whileHover={{x:4}}
                                  whileTap={{scale:.99}}
                                  onClick={()=>{
                                    change("country",country.name);
                                    setResidenceCountryOpen(false);
                                    setResidenceCountrySearch("");
                                  }}
                                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-[#f4f7f3] ${
                                    form.country===country.name?"bg-[#f4f7f3]":""
                                  }`}
                                >
                                  <span className="w-7 shrink-0 text-xl leading-none">
                                    {country.flag}
                                  </span>
                                  <span className="flex-1 text-sm text-[#243126]">
                                    {country.name}
                                  </span>
                                </motion.button>
                              ))
                              :(
                                <div className="px-4 py-6 text-center text-sm text-[#89948c]">
                                  No countries found.
                                </div>
                              )
                            }
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence>
                      {errors.country&&(
                        <motion.p
                          initial={{opacity:0,y:-5}}
                          animate={{opacity:1,y:0}}
                          exit={{opacity:0}}
                          className="mt-2 px-1 text-xs text-red-500"
                        >
                          {errors.country}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <EnquiryInput
                    label="City of residence"
                    value={form.city}
                    onChange={value=>change("city",value)}
                    placeholder="Enter your city"
                  />
                </motion.div>
              </EnquiryStep>
            )}

            {step===2&&(
              <EnquiryStep title="What Kind of Wellness Journey Are You Exploring?">
                <div className="space-y-9">
                  <Question number="01" title="Who is this journey for?" error={errors.journeyFor}>
                    {enquiryOptions.journeyFor.map(option=>(
                      <EnquiryOption
                        key={option}
                        label={option}
                        selected={form.journeyFor===option}
                        onClick={()=>change("journeyFor",option)}
                      />
                    ))}
                  </Question>

                  <Question
                    number="02"
                    title="What would you primarily like to explore?"
                    note="Allow multiple selections."
                    error={errors.wellnessGoals}
                  >
                    {enquiryOptions.wellnessGoals.map(option=>(
                      <EnquiryOption
                        key={option}
                        label={option}
                        selected={form.wellnessGoals.includes(option)}
                        multiple
                        onClick={()=>toggleGoal(option)}
                      />
                    ))}
                  </Question>

                  <Question
                    number="03"
                    title="Which wellness pathway interests you most?"
                    error={errors.pathway}
                  >
                    {enquiryOptions.pathways.map(option=>(
                      <EnquiryOption
                        key={option}
                        label={option}
                        selected={form.pathway===option}
                        onClick={()=>change("pathway",option)}
                      />
                    ))}
                  </Question>

                  <Question
                    number="04"
                    title="What duration are you considering?"
                    error={errors.duration}
                  >
                    {enquiryOptions.durations.map(option=>(
                      <EnquiryOption
                        key={option}
                        label={option}
                        selected={form.duration===option}
                        onClick={()=>change("duration",option)}
                      />
                    ))}
                  </Question>
                </div>
              </EnquiryStep>
            )}

            {step===3&&(
              <EnquiryStep title="Help Us Understand Your Preferences.">
                <div className="space-y-9">
                  <Question
                    number="05"
                    title="When are you considering starting your journey?"
                    error={errors.startTime}
                  >
                    {enquiryOptions.startTimes.map(option=>(
                      <EnquiryOption
                        key={option}
                        label={option}
                        selected={form.startTime===option}
                        onClick={()=>change("startTime",option)}
                      />
                    ))}
                  </Question>

                  <Question
                    number="06"
                    title="What approximate budget range are you considering?"
                    error={errors.budget}
                  >
                    <p className="mb-4 text-sm leading-6 text-[#69766d]">
                      For domestic enquiries, the initial choices can be:
                    </p>

                    {enquiryOptions.domesticBudgets.map(option=>(
                      <EnquiryOption
                        key={option}
                        label={option}
                        selected={form.budget===option}
                        onClick={()=>change("budget",option)}
                      />
                    ))}

                    <p className="mt-4 text-xs leading-6 text-[#7a867d]">
                      For international enquiries, use a suitable currency and budget range rather than assuming every respondent will budget in INR.
                    </p>
                  </Question>

                  <Question
                    number="07"
                    title="Is there anything else you would like us to know?"
                    note="Optional paragraph text."
                  >
                    <motion.textarea
                      whileFocus={{scale:1.005}}
                      value={form.other}
                      onChange={e=>change("other",e.target.value)}
                      rows={6}
                      maxLength={2000}
                      className="w-full resize-none rounded-2xl border border-[#dce5dd] bg-white px-4 py-4 text-sm leading-7 outline-none transition focus:border-[#1e7a3a] focus:ring-4 focus:ring-[#1e7a3a]/10"
                      placeholder="Share anything else you'd like us to know..."
                    />

                    <div className="mt-2 flex justify-end text-[11px] text-[#89948c]">
                      {form.other?.length||0}/2000
                    </div>

                    <p className="mt-1 text-xs leading-6 text-[#748078]">
                      You may share general preferences or expectations. Please do not submit medical records, diagnostic reports or detailed sensitive health information through this initial enquiry form.
                    </p>
                  </Question>
                </div>
              </EnquiryStep>
            )}

            {step===4&&(
              <EnquiryStep title="PRIVACY & SUBMISSION">
                <div className="space-y-6">
                  

                  <motion.label
                    whileHover={{y:-2}}
                    htmlFor="enquiry-consent"
                    className={`flex cursor-pointer items-start gap-4 rounded-2xl border bg-white p-5 transition ${
                      errors.consentToProcess
                        ?"border-red-300"
                        :"border-[#dce5dd] hover:border-[#1e7a3a]/40 hover:shadow-md"
                    }`}
                  >
                    <input
                      id="enquiry-consent"
                      type="checkbox"
                      checked={
                        form.consentToProcess&&
                        form.medicalDisclaimer&&
                        form.informationAccuracy
                      }
                      onChange={e=>handleConsentChange(e.target.checked)}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[#1e7a3a]"
                    />

                    <span className="text-sm leading-7 text-[#465449]">
                      <p>I acknowledge that DARSHAI Group Pvt. Ltd. will use the information I provide to review and respond to my wellness enquiry in accordance with its Privacy Policy.</p>
                      {/* <Link
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-[#1e7a3a] underline underline-offset-2 hover:text-[#176530]"
                      >
                        Privacy Policy
                      </Link>. */}
                    </span>
                  </motion.label>

                  <AnimatePresence>
                    {errors.consentToProcess&&(
                      <motion.p
                        initial={{opacity:0,y:-5}}
                        animate={{opacity:1,y:0}}
                        exit={{opacity:0}}
                        className="-mt-3 px-1 text-xs font-medium text-red-500"
                      >
                        {errors.consentToProcess}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={canContinue()&&!loading?{scale:1.01,y:-2}:{}}
                    whileTap={canContinue()&&!loading?{scale:.985}:{}}
                    type="button"
                    disabled={!canContinue()||loading}
                    onClick={handleSubmit}
                    className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1e7a3a] px-5 py-4 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[#1e7a3a]/10 transition hover:bg-[#176530] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                  >
                    {loading?(
                      <>
                        <motion.span
                          animate={{rotate:360}}
                          transition={{duration:.8,repeat:Infinity,ease:"linear"}}
                          className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                        />
                        Submitting...
                      </>
                    ):(
                      <>
                        SUBMIT MY WELLNESS ENQUIRY
                        <ArrowRight size={17}/>
                      </>
                    )}
                  </motion.button>
                </div>
              </EnquiryStep>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          transition={{delay:.3}}
          className="mt-6 flex items-center justify-between sm:mt-8"
        >
          <motion.button
            whileHover={{x:-3}}
            whileTap={{scale:.97}}
            type="button"
            onClick={back}
            disabled={step===1||loading}
            className="flex items-center gap-2 rounded-xl px-3 py-3 text-sm text-[#637066] transition hover:bg-white disabled:invisible"
          >
            <ArrowLeft size={17}/>
            Previous
          </motion.button>

          {step<4&&(
            <motion.button
              whileHover={canContinue()&&!loading?{x:3,scale:1.02}:{}}
              whileTap={canContinue()&&!loading?{scale:.96}:{}}
              type="button"
              onClick={handleNext}
              disabled={!canContinue()||loading}
              className="flex items-center gap-2 rounded-xl bg-[#1e7a3a] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#1e7a3a]/10 transition hover:bg-[#176530] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none sm:px-6"
            >
              Continue
              <ArrowRight size={17}/>
            </motion.button>
          )}
        </motion.div>
      </div>
    </main>
  );
}

function Question({number,title,note,error,children}){
  return(
    <motion.div
      initial={{opacity:0,y:15}}
      animate={{opacity:1,y:0}}
      transition={{duration:.4}}
    >
      <div className="mb-4">
        <motion.div
          initial={{opacity:0,x:-8}}
          animate={{opacity:1,x:0}}
          className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-[#1e7a3a]"
        >
          QUESTION {number}
        </motion.div>

        <h3 className="text-base font-semibold text-[#253329] sm:text-lg md:text-xl">
          {title}
        </h3>

        {note&&(
          <p className="mt-1 text-xs text-[#77837a]">
            {note}
          </p>
        )}

        <AnimatePresence>
          {error&&(
            <motion.p
              initial={{opacity:0,x:-6}}
              animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-6}}
              className="mt-2 text-xs font-medium text-red-500"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        variants={{
          hidden:{opacity:0},
          show:{opacity:1,transition:{staggerChildren:.05}}
        }}
        initial="hidden"
        animate="show"
        className="grid gap-3"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}