import { Search,X } from "lucide-react";

export default function SearchBar({
  value="",
  onChange,
  placeholder="Search by patient, email or phone..."
}){

  return(
    <div className="relative w-full">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={e=>onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full h-12
          rounded-full
          border border-[#E7E3DB]
          bg-white
          pl-11 pr-11
          text-sm
          outline-none
          focus:border-[#1E7A3A]
          focus:ring-4
          focus:ring-[#1E7A3A]/10
          transition
        "
      />

      {value&&(
        <button
          onClick={()=>onChange("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500"
        >
          <X size={17}/>
        </button>
      )}

    </div>
  );

}