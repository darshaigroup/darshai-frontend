import { Search,X } from "lucide-react";

export default function SearchBar({
  value="",
  onChange,
  onSearch,
  placeholder="Search by patient, email or phone..."
}){

  return(
    <div className="relative w-full">

      <Search
        size={18}
        onClick={onSearch}
        className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 transition hover:text-[#1E7A3A]"
      />

      <input
        value={value}
        placeholder={placeholder}
        onChange={e=>onChange(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&onSearch?.()}
        className="
          h-12 w-full
          rounded-full
          border border-[#E7E3DB]
          bg-white
          pl-11 pr-11
          text-sm
          outline-none
          transition
          focus:border-[#1E7A3A]
          focus:ring-4
          focus:ring-[#1E7A3A]/10
        "
      />

      {value&&(
        <button
          onClick={()=>{
            onChange("");
            onSearch?.();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-500"
        >
          <X size={17}/>
        </button>
      )}

    </div>
  );

}