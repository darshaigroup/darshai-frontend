import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  FileText,
  Download,
  ExternalLink,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL;

const LabReportViewer = () => {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [report,
    setReport] =
      useState(null);

  const [loading,
    setLoading] =
      useState(true);

  useEffect(() => {

    loadReport();

  }, [id]);

  const loadReport =
    async () => {

      try {

        const response =
          await fetch(
            `${API_URL}/api/lab-reports/${id}`
          );

        const result =
          await response.json();

        if (
          !response.ok
        ) {
          throw new Error(
            result.message
          );
        }

        setReport(
          result.data
        );

      } catch (
        error
      ) {

        console.error(
          error
        );

        alert(
          error.message
        );

      } finally {

        setLoading(
          false
        );

      }

    };

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading Report...

      </div>

    );

  }

  if (!report) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Report not found

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

          <div className="flex flex-wrap justify-between gap-4">

            <div>

              <button
                onClick={() =>
                  navigate(-1)
                }
                className="flex items-center gap-2 text-[#173C68] mb-4"
              >

                <ArrowLeft size={18} />

                Back

              </button>

              <h1 className="text-3xl font-bold text-slate-900">

                {report.report_name}

              </h1>

              <div className="flex items-center gap-2 mt-2 text-slate-500">

                <FileText size={16} />

                {report.file_type}

              </div>

            </div>

            <div className="flex gap-3">

              <a
                href={
                  report.file_url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-[#173C68] text-white flex items-center gap-2"
              >

                <ExternalLink size={18} />

                Open

              </a>

              <a
                href={
                  report.file_url
                }
                download
                className="px-4 py-3 rounded-xl bg-green-600 text-white flex items-center gap-2"
              >

                <Download size={18} />

                Download

              </a>

            </div>

          </div>

        </div>

        {/* PDF Viewer */}

        <div className="bg-white rounded-[32px] shadow-xl overflow-hidden">

          <iframe
            src={
              report.file_url
            }
            title={
              report.report_name
            }
            className="w-full h-[1000px]"
          />

        </div>

      </div>

    </div>

  );

};

export default LabReportViewer;