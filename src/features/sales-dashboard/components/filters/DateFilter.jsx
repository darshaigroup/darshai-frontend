import { CalendarDays } from "lucide-react";

export default function DateFilter({
  from="",
  to="",
  onFromChange,
  onToChange
}){

  return(

    <div className="flex flex-col md:flex-row gap-3 w-full">

      <div className="relative flex-1">

        <CalendarDays
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="date"
          value={from}
          onChange={e=>onFromChange(e.target.value)}
          className="
            w-full h-12
            rounded-full
            border border-[#E7E3DB]
            bg-white
            pl-11 pr-4
            text-sm
            outline-none
            focus:border-[#1E7A3A]
            focus:ring-4
            focus:ring-[#1E7A3A]/10
          "
        />

      </div>

      <div className="relative flex-1">

        <CalendarDays
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="date"
          value={to}
          onChange={e=>onToChange(e.target.value)}
          className="
            w-full h-12
            rounded-full
            border border-[#E7E3DB]
            bg-white
            pl-11 pr-4
            text-sm
            outline-none
            focus:border-[#1E7A3A]
            focus:ring-4
            focus:ring-[#1E7A3A]/10
          "
        />

      </div>

    </div>

  );

}