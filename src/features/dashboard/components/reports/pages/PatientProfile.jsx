import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import PatientHeader from "../../patients/PatientHeader";
import PatientTabs from "../../patients/PatientTabs";
import {getPatientById} from "../../../services/patientService";

const PatientProfile=()=>{
  const {id}=useParams();
  const [patient,setPatient]=useState(null);
  const [loading,setLoading]=useState(true);
  const [activeTab,setActiveTab]=useState("overview");

  useEffect(()=>{
    const loadPatient=async()=>{
      try{
        const data=await getPatientById(id);
        setPatient(data);
      }catch(error){
        console.error("PATIENT PROFILE ERROR",error);
      }finally{
        setLoading(false);
      }
    };
    loadPatient();
  },[id]);

  if(loading){
    return(
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center gap-3 text-slate-500">
          <div className="w-5 h-5 border-2 border-slate-300 border-t-[#1E7A3A] rounded-full animate-spin"/>
          <span className="text-sm font-medium">Loading patient...</span>
        </div>
      </div>
    );
  }

  if(!patient)return <div className="p-10">Patient not found</div>;

  return(
    <div className="space-y-6">
      <PatientHeader patient={patient}/>
      <PatientTabs patient={patient} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  );
};

export default PatientProfile;