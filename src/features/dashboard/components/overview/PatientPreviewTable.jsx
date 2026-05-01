const patients = [
  {
    id: "01",
    name: "Aria Montgomery",
    code: "DAR-1001",
    age: "28Y",
    gender: "Female",
    dosha: "VATA-PITTA",
    date: "2024-03-10",
    status: "Improving",
    img: "/patients/p1.jpg",
  },
  {
    id: "02",
    name: "Julian Thorne",
    code: "DAR-1002",
    age: "45Y",
    gender: "Male",
    dosha: "KAPHA",
    date: "2024-03-12",
    status: "Stable",
    img: "/patients/p2.jpg",
  },
  {
    id: "03",
    name: "Elena Gilbert",
    code: "DAR-1003",
    age: "32Y",
    gender: "Female",
    dosha: "PITTA",
    date: "2024-03-14",
    status: "Stable",
    img: "/patients/p3.jpg",
  },
  {
    id: "04",
    name: "Damon Salvatore",
    code: "DAR-1004",
    age: "38Y",
    gender: "Male",
    dosha: "VATA",
    date: "2024-03-15",
    status: "Critical",
    img: "/patients/p4.jpg",
  },
];

const PatientPreviewTable = () => {
  return (
    <div className="bg-white rounded-[28px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-[#1E293B]">
          My Patients
        </h2>

        <button className="bg-[#EEF2F1] px-4 py-2 rounded-full text-sm text-gray-600">
          Most Recent
        </button>
      </div>

      {/* Table */}
      <div className="space-y-4">

        {/* Header row */}
        <div className="grid grid-cols-8 text-xs text-gray-400 px-4 uppercase tracking-wider">
          <span>#</span>
          <span className="col-span-2">Patient Identity</span>
          <span>Age/Gender</span>
          <span>Dosha</span>
          <span>Date</span>
          <span>Status</span>
          <span></span>
        </div>

        {/* Rows */}
        {patients.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-8 items-center bg-[#F7FAF9] px-4 py-4 rounded-xl hover:bg-[#EEF4F2] transition"
          >
            <span className="text-gray-500">{p.id}</span>

            {/* Patient */}
            <div className="col-span-2 flex items-center gap-3">
              <img
                src={p.img}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-[#1E293B] text-sm">
                  {p.name}
                </p>
                <p className="text-xs text-gray-400">{p.code}</p>
              </div>
            </div>

            <span className="text-sm text-gray-600">
              {p.age} • {p.gender}
            </span>

            <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full w-fit">
              {p.dosha}
            </span>

            <span className="text-sm text-gray-500">{p.date}</span>

            {/* Status */}
            <span
              className={`text-xs px-3 py-1 rounded-full w-fit font-medium ${
                p.status === "Critical"
                  ? "bg-red-100 text-red-500"
                  : p.status === "Improving"
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {p.status.toUpperCase()}
            </span>

            <span className="text-gray-400 text-lg">⋯</span>
          </div>
        ))}
      </div>

      <div className="text-center mt-6 text-green-600 text-sm cursor-pointer">
        See All Patients
      </div>
    </div>
  );
};

export default PatientPreviewTable;