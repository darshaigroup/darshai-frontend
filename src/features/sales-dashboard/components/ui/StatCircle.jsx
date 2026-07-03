const COLORS={
  lead:"bg-blue-500",
  contacted:"bg-yellow-500",
  interested:"bg-emerald-500",
  assigned:"bg-indigo-500",
  converted:"bg-green-600",
  closed:"bg-red-500",
  inactive:"bg-slate-400"
};

export default function StatusCircle({
  status="inactive",
  size="md",
  pulse=false
}){

  const sizes={
    sm:"w-2 h-2",
    md:"w-3 h-3",
    lg:"w-4 h-4"
  };

  return(
    <span
      className={`
        inline-block
        rounded-full
        ${sizes[size]}
        ${COLORS[status?.toLowerCase()]||COLORS.inactive}
        ${pulse?"animate-pulse":""}
      `}
    />
  );

}