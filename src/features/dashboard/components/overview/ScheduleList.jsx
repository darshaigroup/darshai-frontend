const ScheduleList = () => {
  const schedules = [
    { time: "10:00 AM", patient: "John Doe", type: "Consultation" },
    { time: "12:00 PM", patient: "Jane Smith", type: "Follow-up" },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <h2 className="font-semibold mb-4">Today's Schedule</h2>

      <div className="space-y-4">
        {schedules.map((s, i) => (
          <div
            key={i}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{s.patient}</p>
              <p className="text-sm text-gray-500">{s.type}</p>
            </div>
            <span className="text-sm text-gray-400">{s.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;