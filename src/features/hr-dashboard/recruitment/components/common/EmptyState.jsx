import {ArrowRight} from "lucide-react";
import {motion} from "framer-motion";

const EmptyState=({
  icon:Icon,
  title="Nothing Found",
  description="There is no data available.",
  actionText,
  onAction
})=>(
  <motion.div
    initial={{opacity:0,y:10}}
    animate={{opacity:1,y:0}}
    transition={{duration:.25}}
    className="flex min-h-[380px] flex-col items-center justify-center rounded-3xl border border-dashed border-[#DCE6DF] bg-white px-6 text-center"
  >
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EDF7F0] text-[#1E7A3A]">
      {Icon&&<Icon className="h-8 w-8"/>}
    </div>

    <h3 className="mt-6 text-xl font-semibold tracking-[-.02em] text-[#243128]">
      {title}
    </h3>

    <p className="mt-3 max-w-md text-sm leading-7 text-[#748078]">
      {description}
    </p>

    {actionText&&onAction&&(
      <button
        type="button"
        onClick={onAction}
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-[#1E7A3A] px-5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(30,122,58,.18)] transition hover:bg-[#17652F] active:scale-[.98]"
      >
        {actionText}
        <ArrowRight className="h-4 w-4"/>
      </button>
    )}
  </motion.div>
);

export default EmptyState;