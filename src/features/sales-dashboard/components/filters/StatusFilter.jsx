import { Filter } from "lucide-react";

const STATUS=[
  "All",
  "Lead",
  "Contacted",
  "Interested",
  "Assigned",
  "Converted",
  "Closed"
];

export default function StatusFilter({
  value="All",
  onChange
}){

  return(
    <div className="relative w-full sm:w-60">

      <Filter
        size={17}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />

      <select
        value={value}
        onChange={e=>onChange(e.target.value)}
        className="
          w-full h-12
          rounded-full
          border border-[#E7E3DB]
          bg-white
          pl-11 pr-5
          text-sm
          outline-none
          appearance-none
          focus:border-[#1E7A3A]
          focus:ring-4
          focus:ring-[#1E7A3A]/10
        "
      >

        {STATUS.map(item=>(
          <option
            key={item}
            value={item}
          >
            {item}
          </option>
        ))}

      </select>

    </div>
  );

}