import { useEffect,useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { getPatientReport } from "../../../services-t/reportService";

const HistoryTab = ({ patient }) => {
  const [reportData,setReportData] = useState(null);

  useEffect(() => {
    if(patient?.id) loadReport();
  },[patient?.id]);

  const loadReport = async () => {
    try{
      const data =
        await getPatientReport(patient.id);

      console.log("HISTORY REPORT",data);

      setReportData(data.patient);

    }catch(error){

      console.error(error);

    }
  };

  const history = [];

  if(
    reportData?.matrix_answers &&
    Object.keys(reportData.matrix_answers).length > 0
  ){
    history.push({
      id:"lifestyle",
      title:"Lifestyle Assessment",
      desc:"Lifestyle matrix assessment completed",
      date:reportData.updated_at
    });
  }

  if(reportData?.ai_response){
    history.push({
      id:"risk",
      title:"Risk Assessment",
      desc:`${reportData.risk_band} Risk Assessment Completed`,
      date:reportData.updated_at
    });
  }

  if(
    reportData?.prakriti_answers &&
    Object.keys(reportData.prakriti_answers).length > 0
  ){
    history.push({
      id:"prakriti",
      title:"Prakriti Assessment",
      desc:"Prakriti analysis completed",
      date:reportData.updated_at
    });
  }

  if(
    reportData?.vikriti_answers &&
    Object.keys(reportData.vikriti_answers).length > 0
  ){
    history.push({
      id:"vikriti",
      title:"Vikriti Assessment",
      desc:"Dosha imbalance assessment completed",
      date:reportData.updated_at
    });
  }

  if(
    reportData?.agni_answers &&
    Object.keys(reportData.agni_answers).length > 0
  ){
    history.push({
      id:"agni",
      title:"Agni Assessment",
      desc:"Digestive fire assessment completed",
      date:reportData.updated_at
    });
  }

  if(
    reportData?.ama_answers &&
    Object.keys(reportData.ama_answers).length > 0
  ){
    history.push({
      id:"ama",
      title:"Ama Assessment",
      desc:"Ama assessment completed",
      date:reportData.updated_at
    });
  }

  if(reportData?.clinical_answers){
    history.push({
      id:"clinical",
      title:"Clinical Assessment",
      desc:"Clinical data collection completed",
      date:reportData.updated_at
    });
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm">

      <h2 className="text-lg font-semibold mb-6">
        Clinical History
      </h2>

      <div className="space-y-6">

        {history.length === 0 ? (

          <p className="text-gray-500">
            No assessments completed yet
          </p>

        ) : (

          history.map((item,index) => (
            <div key={item.id} className="flex gap-4">

              <div className="flex flex-col items-center">
                <FaCheckCircle className="text-green-500" />

                {index !== history.length - 1 && (
                  <div className="w-[2px] flex-1 bg-gray-200 mt-1" />
                )}
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  {new Date(item.date).toLocaleDateString()}
                </p>

                <p className="font-medium text-[#1E293B]">
                  {item.title}
                </p>

                <p className="text-sm text-gray-500">
                  {item.desc}
                </p>
              </div>

            </div>
          ))

        )}

      </div>

    </div>
  );
};

export default HistoryTab;