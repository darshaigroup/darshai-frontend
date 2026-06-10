import {
  Download,
  Printer,
  Calendar,
} from "lucide-react";

import logo from "../../../../../assets/images/logo.png";

const SummaryHeader = ({
  onDownload,
  onPrint,
}) => {

  const formattedDate =
    new Date().toLocaleDateString(
      "en-GB"
    ); // DD/MM/YYYY

  return (
    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Left Section */}

        <div>

          <img
            src={logo}
            alt="DarshAI"
            className="h-14"
          />

          <h1 className="text-4xl font-bold text-slate-900 mt-5">
            Final Wellness Report
          </h1>

          <div className="flex items-center gap-2 mt-3 text-slate-500">

            <Calendar size={16} />

            <span>
              Generated on {formattedDate}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SummaryHeader;