import {
  FileText,
  Eye,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL;

const LabReports = ({
  uploadedReports = [],
}) => {

  const openReport =
    (reportId) => {

      window.open(
        `${API_URL}/api/lab-reports/${reportId}/view`,
        "_blank",
        "noopener,noreferrer"
      );

    };

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">
          Uploaded Lab Reports
        </h2>

        <span className="text-sm text-slate-500">

          {uploadedReports.length}
          {" "}
          Report(s)

        </span>

      </div>

      {!uploadedReports.length ? (

        <div className="text-slate-500 text-center py-10">

          No reports uploaded

        </div>

      ) : (

        <div className="space-y-4">

          {uploadedReports.map(
            (report) => (

              <button
                key={report.id}
                onClick={() =>
                  openReport(
                    report.id
                  )
                }
                className="w-full text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-[#173C68]/20 rounded-2xl p-5 transition-all duration-300"
              >

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-[#173C68]/10 flex items-center justify-center">

                    <FileText
                      size={24}
                      className="text-[#173C68]"
                    />

                  </div>

                  <div>

                    <div className="font-semibold text-slate-900">

                      {report.report_name}

                    </div>

                    <div className="text-sm text-slate-500">

                      {report.file_type}

                      {report.file_size && (

                        <>

                          {" • "}

                          {(
                            report.file_size /
                            1024
                          ).toFixed(
                            1
                          )}

                          {" "}
                          KB

                        </>

                      )}

                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-2 text-[#173C68] font-medium">

                  <Eye
                    size={18}
                  />

                  View PDF

                </div>

              </button>

            )
          )}

        </div>

      )}

    </div>

  );

};

export default LabReports;