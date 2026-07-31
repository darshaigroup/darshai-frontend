const badgeColors={
"Business Development":"border-[#C7E7D2] bg-[#EEF8F2] text-[#1E7A3A]",
"Client Experience":"border-[#C7E7D2] bg-[#EEF8F2] text-[#1E7A3A]",
"Consultant Opportunities":"border-[#F6D98E] bg-[#FFF7E1] text-[#A36A00]"
};

const PositionBadge=({children,className=""})=>(
<span className={`inline-flex items-center rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[.18em] ${badgeColors[children]??"border-[#DDE5DF] bg-[#F7F9F8] text-[#33443A]"} ${className}`}>
{children}
</span>
);

export default PositionBadge;