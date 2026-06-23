import { Search, X } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />

      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-3"
        >
          <X className="w-4 h-4 text-slate-400 hover:text-slate-700" />
        </button>
      )}
    </div>
  );
}