import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaEye } from "react-icons/fa";

import {getReportsTable} from "../../services/reportService";

import DefaultAvatar from "@/assets/images/profile.jpg";
const ReportsTable = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const patientsPerPage = 10;

  const indexOfLastPatient = currentPage * patientsPerPage;

  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;

  const currentPatients = data.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(data.length / patientsPerPage);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const result = await getReportsTable();
        // console.log("REPORT DATA:",result);
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const statusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700";

      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };
  const ReportPill = ({ label, type, patientId, color }) => (
     <button
    onClick={() => {

      if(
        type === "summary"
      ){

        navigate(
          `/dashboard/patient-report-summary/${patientId}`
        );

      } else {

        navigate(
          `/dashboard/report-display/${patientId}`,
          {
            state:{
              reportType:type
            }
          }
        );

      }

    }}
    className={`px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${color}`}
  >
    {label}
  </button>
  );

  return (
    <div className="bg-white rounded-[32px] shadow-sm p-6">
      <div className="flex justify-between items-center mb-8">
        <input
          placeholder="Search patient..."
          className="w-[320px] px-5 py-3 rounded-full bg-[#F6F9F8] outline-none"
        />

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-full border">Filter</button>
          <button className="px-4 py-2 rounded-full border">Date</button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-xs text-slate-400 border-b">
            <th className="text-left pb-4">PATIENT</th>

            <th className="text-left pb-4">REPORTS AVAILABLE</th>

            <th className="text-left pb-4">LAST UPDATED</th>

            <th className="text-left pb-4">STATUS</th>

            <th className="text-left pb-4">SUMMARY</th>
          </tr>
        </thead>

        <tbody>
          {currentPatients.map((item) => (
            <tr
              key={item.patient_id}
              className="border-b hover:bg-[#F9FBFA] transition"
            >
              <td className="py-6">
                <div className="flex items-center gap-4">
                  <img
                    src={DefaultAvatar}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h3 className="font-semibold text-[#173C68]">
                      {item.name}
                    </h3>

                    <p className="text-xs text-slate-500">
                      Patient ID #{item.patient_id}
                    </p>
                  </div>
                </div>
              </td>

              <td>
             <div className="flex flex-wrap gap-2">

  

  {Number(item.risk_report) > 0 && (
    <ReportPill
      label="Risk"
      type="risk"
      patientId={item.patient_id}
      color="bg-red-50 text-red-600"
    />
  )}

  {Number(item.ayurveda_report) > 0 && (
    <ReportPill
      label="Ayurveda"
      type="ayurveda"
      patientId={item.patient_id}
      color="bg-emerald-50 text-emerald-600"
    />
  )}

  {Number(item.clinical_report) > 0 && (
    <ReportPill
      label="Clinical"
      type="clinical"
      patientId={item.patient_id}
      color="bg-blue-50 text-blue-600"
    />
  )}

  {Number(item.lifestyle_report) > 0 && (
    <ReportPill
      label="Lifestyle"
      type="lifestyle"
      patientId={item.patient_id}
      color="bg-violet-50 text-violet-600"
    />
  )}

</div>
              </td>

              <td className="text-slate-600">
                {item.last_updated
                  ? new Date(item.last_updated).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(item.status)}`}
                >
                  {item.status}
                </span>
              </td>

              <td>
                <button
                  onClick={() =>
                   navigate(`/dashboard/patient-report-summary/${item.patient_id}`)
                  }
                  className="w-10 h-10 rounded-full bg-[#F6F9F8] flex items-center justify-center hover:bg-[#173C68] hover:text-white transition"
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-8 text-sm text-slate-400">
        <span>Securely stored in Darshai Clinical Cloud</span>

        <div className="flex items-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
          >
            Previous
          </button>

          <span className="px-4 py-2 rounded-full bg-[#F6F9F8] text-[#173C68] font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsTable;
