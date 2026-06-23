import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppointmentCalendar({
  appointments = [],
  selectedDate,
  setSelectedDate,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const hasAppointment = day => {
    return appointments.some(
      item => new Date(item.date).getDate() === day
    );
  };

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
          {monthName} {year}
        </h3>

        <button
          onClick={nextMonth}
          className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium text-slate-500 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(firstDay)].map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`relative h-11 rounded-xl text-sm transition-all ${
                selectedDate === day
                  ? "bg-emerald-600 text-white"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {day}

              {hasAppointment(day) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}