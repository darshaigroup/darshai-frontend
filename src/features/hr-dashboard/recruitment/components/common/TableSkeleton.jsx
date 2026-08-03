import {motion} from "framer-motion";

const ROWS=8,COLS=7;

const Header=()=>(
  <div className="grid grid-cols-7 gap-4 border-b border-[#E8EDE9] bg-[#F8FAF8] px-6 py-4">
    {Array.from({length:COLS},(_,i)=>(
      <div key={i} className="h-3 w-20 animate-pulse rounded bg-[#E8EEEA]"/>
    ))}
  </div>
);

const DesktopRow=({index})=>(
  <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:index*.04}}
    className="grid grid-cols-7 gap-4 border-b border-[#EEF2EF] px-6 py-4 last:border-0"
  >
    <div className="flex items-center gap-3">
      <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-[#EAF1EC]"/>
      <div className="space-y-2">
        <div className="h-3 w-32 animate-pulse rounded bg-[#EEF2EF]"/>
        <div className="h-2.5 w-24 animate-pulse rounded bg-[#F4F6F5]"/>
        <div className="h-2.5 w-40 animate-pulse rounded bg-[#F4F6F5]"/>
      </div>
    </div>

    <div className="space-y-2">
      <div className="h-3 w-28 animate-pulse rounded bg-[#EEF2EF]"/>
      <div className="h-2.5 w-20 animate-pulse rounded bg-[#F4F6F5]"/>
      <div className="h-2.5 w-24 animate-pulse rounded bg-[#F4F6F5]"/>
    </div>

    <div className="space-y-2">
      <div className="h-3 w-24 animate-pulse rounded bg-[#EEF2EF]"/>
      <div className="h-2.5 w-28 animate-pulse rounded bg-[#F4F6F5]"/>
      <div className="h-2.5 w-20 animate-pulse rounded bg-[#F4F6F5]"/>
    </div>

    <div className="space-y-2">
      <div className="h-3 w-24 animate-pulse rounded bg-[#EEF2EF]"/>
      <div className="h-2.5 w-20 animate-pulse rounded bg-[#F4F6F5]"/>
    </div>

    <div className="flex items-center">
      <div className="h-6 w-20 animate-pulse rounded-full bg-[#EEF2EF]"/>
    </div>

    <div className="flex items-center">
      <div className="h-8 w-20 animate-pulse rounded-lg bg-[#EEF2EF]"/>
    </div>

    <div className="flex justify-center">
      <div className="h-9 w-9 animate-pulse rounded-xl bg-[#EEF2EF]"/>
    </div>
  </motion.div>
);

const MobileCard=({index})=>(
  <motion.div
    initial={{opacity:0}}
    animate={{opacity:1}}
    transition={{delay:index*.04}}
    className="rounded-2xl border border-[#E4EAE5] bg-white p-4"
  >
    <div className="flex gap-3">
      <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-[#EAF1EC]"/>

      <div className="flex-1 space-y-2">
        <div className="h-3 w-32 animate-pulse rounded bg-[#EEF2EF]"/>
        <div className="h-2.5 w-24 animate-pulse rounded bg-[#F4F6F5]"/>
        <div className="h-2.5 w-40 animate-pulse rounded bg-[#F4F6F5]"/>
      </div>

      <div className="h-5 w-16 animate-pulse rounded-full bg-[#EEF2EF]"/>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="h-2.5 w-14 animate-pulse rounded bg-[#F4F6F5]"/>
        <div className="h-3 w-24 animate-pulse rounded bg-[#EEF2EF]"/>
      </div>

      <div className="space-y-2">
        <div className="h-2.5 w-14 animate-pulse rounded bg-[#F4F6F5]"/>
        <div className="h-3 w-20 animate-pulse rounded bg-[#EEF2EF]"/>
      </div>
    </div>

    <div className="mt-5 flex justify-between">
      <div className="h-8 w-20 animate-pulse rounded-lg bg-[#EEF2EF]"/>
      <div className="h-8 w-24 animate-pulse rounded-lg bg-[#EEF2EF]"/>
    </div>
  </motion.div>
);

const TableSkeleton=()=>(
  <>
    <div className="space-y-3 md:hidden">
      {Array.from({length:5},(_,i)=><MobileCard key={i} index={i}/>)}
    </div>

    <div className="hidden overflow-hidden rounded-3xl border border-[#E3E9E4] bg-white md:block">
      <Header/>
      <div>
        {Array.from({length:ROWS},(_,i)=><DesktopRow key={i} index={i}/>)}
      </div>
    </div>
  </>
);

export default TableSkeleton;