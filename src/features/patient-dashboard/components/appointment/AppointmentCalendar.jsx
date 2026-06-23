import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppointmentCalendar({
  appointments = [],
  selectedDate,
  setSelectedDate,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();

  const appointmentDays = useMemo(
    () =>
      appointments.map(item =>
        new Date(item.date).getDate()
      ),
    [appointments]
  );

  const previousMonth = () =>
    setCurrentMonth(new Date(year, month - 1, 1));

  const nextMonth = () =>
    setCurrentMonth(new Date(year, month + 1, 1));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={previousMonth}
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <h3 className="font-semibold text-slate-900 dark:text-white">
          {monthLabel}
        </h3>

        <button
          onClick={nextMonth}
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div
            key={day}
            className="text-center text-[11px] font-medium text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const hasAppointment = appointmentDays.includes(day);
          const isSelected = selectedDate === day;

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`relative h-11 rounded-xl text-sm transition-all ${
                isSelected
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              {day}

              {hasAppointment && (
                <span
                  className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-emerald-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}