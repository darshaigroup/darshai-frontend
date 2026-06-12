import {Calendar} from "lucide-react";
import logo from "@/assets/images/logo.png";

const PatientReportHeader = ({patient}) => {

  const formattedDate =
    new Date().toLocaleDateString(
      "en-GB"
    );

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        <div>

          <img
            src={logo}
            alt="DarshAI"
            className="h-14"
          />

          <h1 className="text-4xl font-bold text-slate-900 mt-5">

            Patient Wellness Summary

          </h1>

          <p className="text-slate-500 mt-2">

            Complete Clinical Intelligence Report

          </p>

          <div className="flex items-center gap-2 mt-3 text-slate-500">

            <Calendar size={16} />

            <span>

              Generated on {formattedDate}

            </span>

          </div>

        </div>

        <div className="bg-gradient-to-r from-[#173C68] to-[#245A98] text-white rounded-[28px] px-8 py-6 min-w-[260px]">

          <div className="text-sm text-white/70">

            Patient

          </div>

          <div className="text-2xl font-bold mt-1">

            {patient?.name || "-"}

          </div>

          <div className="mt-4 text-sm text-white/70">

            Risk Band

          </div>

          <div className="text-lg font-semibold">

            {patient?.risk_band || "-"}

          </div>

        </div>

      </div>

    </div>

  );

};

export default PatientReportHeader;