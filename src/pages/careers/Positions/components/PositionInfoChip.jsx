const PositionInfoChip=({icon:Icon,children})=>(
<div className="inline-flex items-center gap-2 rounded-full border border-[#C7E7D2] bg-[#EEF8F2] px-4 py-2 text-[13px] font-medium text-[#1E7A3A]">
{Icon&&<Icon size={15} strokeWidth={2}/>}
<span>{children}</span>
</div>
);

export default PositionInfoChip;