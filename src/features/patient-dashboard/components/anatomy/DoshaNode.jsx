import { motion } from "motion/react";

export default function DoshaNode({
  x,
  y,
  color,
  active,
  label,
  onClick,
}) {
  return (
    <motion.g
      whileHover={{ scale: 1.1 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      {active && (
        <circle
          cx={x}
          cy={y}
          r="22"
          fill={color}
          opacity="0.15"
          className="animate-pulse"
        />
      )}

      <circle
        cx={x}
        cy={y}
        r="8"
        fill={color}
        stroke="white"
        strokeWidth="2"
      />

      <text
        x={x}
        y={y - 14}
        textAnchor="middle"
        className="fill-slate-300 text-[8px] font-mono"
      >
        {label}
      </text>
    </motion.g>
  );
}