import {useEffect,useRef,useState} from "react";
import {Briefcase,CalendarDays,Filter,RotateCcw,Search,X} from "lucide-react";
import {motion} from "framer-motion";

const ApplicantFilters=({filters={},positions=[],onChange,onClear,disabled=false})=>{
  const [search,setSearch]=useState(filters.search||""),
    [showFilters,setShowFilters]=useState(false);

  const lastSearch=useRef(filters.search||"");

  useEffect(()=>{
    const value=filters.search||"";
    setSearch(value);
    lastSearch.current=value;
  },[filters.search]);

  useEffect(()=>{
    const value=search.trim();

    if(value===lastSearch.current) return;

    const timer=setTimeout(()=>{
      lastSearch.current=value;
      onChange?.({search:value});
    },600);

    return()=>clearTimeout(timer);
  },[search,onChange]);

  const hasAdvanced=!!(filters.jobId||filters.from||filters.to);
  const activeCount=[filters.jobId,filters.from,filters.to].filter(Boolean).length;

  const update=(key,value)=>onChange?.({[key]:value});

  const clearSearch=()=>{
    setSearch("");

    if(lastSearch.current!==""){
      lastSearch.current="";
      onChange?.({search:""});
    }
  };

  const clearAll=()=>{
    setSearch("");
    lastSearch.current="";
    setShowFilters(false);
    onClear?.();
  };

  return(
    <motion.section
      initial={{opacity:0,y:6}}
      animate={{opacity:1,y:0}}
      transition={{duration:.25}}
      className="rounded-2xl border border-[#E3E9E4] bg-white p-3 sm:p-4 lg:rounded-3xl"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-[17px] w-[17px] -translate-y-1/2 text-[#8E9991]"/>

          <input
            type="search"
            value={search}
            onChange={e=>setSearch(e.target.value)}
            placeholder="Search candidate, email, phone, application or position..."
            className="h-11 w-full rounded-xl border border-[#DFE6E1] bg-[#FAFBFA] pl-10 pr-10 text-sm text-[#26352B] outline-none transition placeholder:text-[#9AA49D] focus:border-[#80AE8C] focus:bg-white focus:ring-2 focus:ring-[#1E7A3A]/5"
          />

          {search&&(
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-[#89948C] transition hover:bg-[#EEF3EF] hover:text-[#344239]"
            >
              <X className="h-3.5 w-3.5"/>
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={()=>setShowFilters(value=>!value)}
            className={`relative flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition lg:flex-none ${
              showFilters||hasAdvanced
                ?"border-[#B9D5C0] bg-[#EDF7F0] text-[#1E7A3A]"
                :"border-[#DFE6E1] bg-white text-[#56635A] hover:bg-[#F7F9F7]"
            }`}
          >
            <Filter className="h-4 w-4"/>
            Filters

            {activeCount>0&&(
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#1E7A3A] px-1 text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>

          {(search||hasAdvanced)&&(
            <button
              type="button"
              onClick={clearAll}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#DFE6E1] px-3 text-sm font-medium text-[#69756D] transition hover:bg-[#F7F9F7] sm:px-4"
            >
              <RotateCcw className="h-4 w-4"/>
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters&&(
        <motion.div
          initial={{opacity:0,height:0}}
          animate={{opacity:1,height:"auto"}}
          exit={{opacity:0,height:0}}
          className="overflow-hidden"
        >
          <div className="mt-4 grid gap-3 border-t border-[#EDF1EE] pt-4 sm:grid-cols-2 xl:grid-cols-3">

            {/* Position */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[.08em] text-[#68756D]">
                Position
              </label>

              <div className="relative">
                <Briefcase className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909B93]"/>

                <select
                  value={filters.jobId||""}
                  onChange={e=>update("jobId",e.target.value)}
                  disabled={disabled}
                  className="h-11 w-full appearance-none rounded-xl border border-[#DFE6E1] bg-white pl-10 pr-3 text-sm text-[#344239] outline-none transition focus:border-[#80AE8C] focus:ring-2 focus:ring-[#1E7A3A]/5 disabled:opacity-60"
                >
                  <option value="">All Positions</option>

                  {positions.map(position=>(
                    <option key={position.id} value={position.id}>
                      {position.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Applied From */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-[.08em] text-[#68756D]">
                Applied From
              </label>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909B93]"/>

                <input
                  type="date"
                  value={filters.from||""}
                  max={filters.to||undefined}
                  onChange={e=>update("from",e.target.value)}
                  disabled={disabled}
                  className="h-11 w-full rounded-xl border border-[#DFE6E1] bg-white pl-10 pr-3 text-sm text-[#344239] outline-none transition focus:border-[#80AE8C] focus:ring-2 focus:ring-[#1E7A3A]/5 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Applied To */}
            <div className="space-y-1.5 sm:col-span-2 xl:col-span-1">
              <label className="text-[11px] font-semibold uppercase tracking-[.08em] text-[#68756D]">
                Applied To
              </label>

              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#909B93]"/>

                <input
                  type="date"
                  value={filters.to||""}
                  min={filters.from||undefined}
                  onChange={e=>update("to",e.target.value)}
                  disabled={disabled}
                  className="h-11 w-full rounded-xl border border-[#DFE6E1] bg-white pl-10 pr-3 text-sm text-[#344239] outline-none transition focus:border-[#80AE8C] focus:ring-2 focus:ring-[#1E7A3A]/5 disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* Active Position */}
          {filters.jobId&&(
            <div className="mt-3 flex flex-col gap-2 rounded-xl border border-[#DDEAE0] bg-[#F6FAF7] p-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[.1em] text-[#78907E]">
                  Position Filter Active
                </p>

                <p className="mt-1 truncate text-xs font-medium text-[#344239]">
                  {positions.find(
                    position=>String(position.id)===String(filters.jobId)
                  )?.title||"Selected Position"}
                </p>
              </div>

              <button
                type="button"
                onClick={()=>update("jobId","")}
                disabled={disabled}
                className="flex shrink-0 items-center gap-1.5 self-start rounded-lg px-2 py-1.5 text-xs font-semibold text-[#1E7A3A] transition hover:bg-[#E8F3EA] disabled:opacity-50 sm:self-auto"
              >
                <X className="h-3.5 w-3.5"/>
                Remove
              </button>
            </div>
          )}
        </motion.div>
      )}
    </motion.section>
  );
};

export default ApplicantFilters;