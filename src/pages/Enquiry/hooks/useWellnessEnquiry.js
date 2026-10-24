import {useState} from "react";
import {isValidPhoneNumber} from "libphonenumber-js";
import {submitEnquiry} from "../services/enquiryService";

const initialForm={
  name:"",
  email:"",
  phone:"",
  contactMethod:"",
  country:"",
  city:"",
  journeyFor:"",
  wellnessGoals:[],
  pathway:"",
  duration:"",
  startTime:"",
  budget:"",
  other:"",
  consentToProcess:false,
  medicalDisclaimer:false,
  informationAccuracy:false
};

export default function useWellnessEnquiry(){
  const [form,setForm]=useState(initialForm);
  const [step,setStep]=useState(1);
  const [loading,setLoading]=useState(false);
  const [submitted,setSubmitted]=useState(false);
  const [error,setError]=useState("");

  const update=(key,value)=>setForm(prev=>({...prev,[key]:value}));

  const toggleGoal=value=>setForm(prev=>({
    ...prev,
    wellnessGoals:prev.wellnessGoals.includes(value)
      ?prev.wellnessGoals.filter(item=>item!==value)
      :[...prev.wellnessGoals,value]
  }));

  const updateConsent=value=>setForm(prev=>({
    ...prev,
    consentToProcess:value,
    medicalDisclaimer:value,
    informationAccuracy:value
  }));

  const isEmailValid=()=>{
    const email=String(form.email||"").trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPhoneValid=()=>{
    const phone=String(form.phone||"").trim();
    if(!phone)return false;
    try{return isValidPhoneNumber(phone);}
    catch{return false;}
  };

  const canContinue=
    Boolean(form.name?.trim())&&
    isEmailValid()&&
    isPhoneValid()&&
    Boolean(form.country?.trim())&&
    Boolean(form.city?.trim());

  const next=()=>{
    if(step===1&&!canContinue)return;
    setStep(prev=>Math.min(prev+1,4));
  };

  const back=()=>setStep(prev=>Math.max(prev-1,1));

  const submit=async()=>{
    setError("");

    if(!isEmailValid()){
      setError("Please enter a valid email address.");
      return;
    }

    if(!isPhoneValid()){
      setError("Please enter a valid mobile number.");
      return;
    }

    if(
      !form.consentToProcess||
      !form.medicalDisclaimer||
      !form.informationAccuracy
    ){
      setError("Please accept the consent before submitting.");
      return;
    }

    setLoading(true);

    try{
      const payload={
        name:form.name,
        email:form.email,
        phone:form.phone,
        ageBracket:null,
        location:[form.city,form.country].filter(Boolean).join(", ")||null,
        occupation:null,
        wellnessGoals:form.wellnessGoals,
        otherWellnessGoal:null,
        currentConcern:form.other?.trim()||null,
        healthContext:{journeyFor:form.journeyFor},
        lifestyleContext:{
          pathway:form.pathway,
          duration:form.duration,
          startTime:form.startTime,
          preferredContactMethod:form.contactMethod
        },
        environmentPreferences:[],
        climatePreferences:[],
        journeyPreference:form.pathway,
        investmentPreference:form.budget,
        travelPreferences:{
          duration:form.duration,
          startTime:form.startTime
        },
        consent:{
          consentToProcess:form.consentToProcess,
          medicalDisclaimer:form.medicalDisclaimer,
          informationAccuracy:form.informationAccuracy,
          recordedAt:new Date().toISOString()
        }
      };

      console.log("ENQUIRY PAYLOAD:",payload);

      await submitEnquiry(payload);
      setSubmitted(true);
    }catch(error){
      setError(error.message||"Unable to submit your enquiry.");
    }finally{
      setLoading(false);
    }
  };

  return{
    form,
    step,
    loading,
    submitted,
    error,
    update,
    updateConsent,
    toggleGoal,
    next,
    back,
    submit,
    isEmailValid:isEmailValid(),
    isPhoneValid:isPhoneValid(),
    canContinue
  };
}