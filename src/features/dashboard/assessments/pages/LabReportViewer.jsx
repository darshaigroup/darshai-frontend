import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const LabReportViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const reportUrl = `${API_URL}/api/lab-reports/${id}/view`;

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-[28px] bg-white p-5 shadow-xl sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-2 text-sm font-medium text-[#173C68]"
              >
                <ArrowLeft size={17} /> Back
              </button>

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#173C68]/10">
                  <FileText size={21} className="text-[#173C68]" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                    Lab Report
                  </h1>
                  <p className="text-sm text-slate-500">
                    Laboratory report document
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#173C68] px-4 py-3 text-sm font-medium text-white"
              >
                <ExternalLink size={17} /> Open
              </a>

              <a
                href={reportUrl}
                download
                className="flex items-center gap-2 rounded-xl bg-[#46C18D] px-4 py-3 text-sm font-medium text-white"
              >
                <Download size={17} /> Download
              </a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] bg-white shadow-xl">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-900">Report Preview</h2>
            <p className="text-xs text-slate-500">
              Secure laboratory report viewer
            </p>
          </div>

          <iframe
            src={reportUrl}
            title="Lab Report"
            className="h-[90vh] min-h-[700px] w-full border-0"
          />
        </div>
      </div>
    </div>
  );
};

export default LabReportViewer;