import { useState } from "react";
import { FaFilePdf, FaUpload } from "react-icons/fa";

const ReportsTab = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      name: "Blood Report.pdf",
      date: "2024-03-01",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "MRI Scan.pdf",
      date: "2024-02-20",
      size: "5.1 MB",
    },
  ]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newReport = {
      id: Date.now(),
      name: file.name,
      date: new Date().toISOString().split("T")[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };

    setReports([newReport, ...reports]);
  };

  return (
    <div className="space-y-6">

      {/* 🔹 UPLOAD SECTION */}
      <div className="bg-white p-8 rounded-3xl border-2 border-dashed text-center">

        <div className="flex flex-col items-center">
          <FaUpload className="text-2xl text-gray-400 mb-3" />

          <h2 className="text-lg font-semibold">
            Upload Clinical Reports
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Drag & drop PDF, JPG or PNG files. Max size 10MB.
          </p>

          <label className="mt-5 cursor-pointer">
            <input type="file" className="hidden" onChange={handleUpload} />
            <span className="px-5 py-2 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#3BAA9D] text-white text-sm">
              Select Files
            </span>
          </label>
        </div>

      </div>

      {/* 🔹 REPORT LIST */}
      <div className="bg-white p-6 rounded-3xl shadow-sm">

        <h2 className="text-lg font-semibold mb-4">
          Uploaded Reports
        </h2>

        <div className="space-y-4">

          {reports.map((report) => (
            <div
              key={report.id}
              className="flex justify-between items-center p-4 rounded-2xl bg-[#F7F9F8]"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div className="bg-red-100 text-red-500 p-3 rounded-full">
                  <FaFilePdf />
                </div>

                <div>
                  <p className="font-medium text-[#1E293B]">
                    {report.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {report.date} • {report.size}
                  </p>
                </div>
              </div>

              {/* ACTION */}
              <button className="text-sm text-blue-600 font-medium">
                View
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default ReportsTab;