import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const THEMES = {
  primary: { bg: "from-indigo-50 to-violet-50", border: "border-indigo-200", icon: "bg-indigo-100 text-indigo-600", badge: "bg-indigo-100 text-indigo-700", bar: "bg-indigo-500" },
  success: { bg: "from-emerald-50 to-green-50", border: "border-emerald-200", icon: "bg-emerald-100 text-emerald-600", badge: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  warning: { bg: "from-amber-50 to-orange-50", border: "border-amber-200", icon: "bg-amber-100 text-amber-600", badge: "bg-amber-100 text-amber-700", bar: "bg-amber-500" },
  danger: { bg: "from-rose-50 to-red-50", border: "border-rose-200", icon: "bg-rose-100 text-rose-600", badge: "bg-rose-100 text-rose-700", bar: "bg-rose-500" },
  info: { bg: "from-sky-50 to-cyan-50", border: "border-sky-200", icon: "bg-sky-100 text-sky-600", badge: "bg-sky-100 text-sky-700", bar: "bg-sky-500" },
  neutral: { bg: "from-slate-50 to-stone-50", border: "border-slate-200", icon: "bg-slate-100 text-slate-600", badge: "bg-slate-100 text-slate-700", bar: "bg-slate-500" },
};

export default function MetricCard({title,value,subtitle,icon: Icon,color = "primary",badge,footer,trend,className = "",}) {
  const t = THEMES[color] ?? THEMES.primary, display = value ?? "--";

  return (
    <motion.div whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: .25 }} className={`relative overflow-hidden rounded-3xl border ${t.border} bg-gradient-to-br ${t.bg} p-6 shadow-sm transition-all hover:shadow-xl ${className}`}>
      <div className={`absolute left-0 top-0 h-full w-1 ${t.bar}`} />

      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-slate-500">{title}</p>
          <h3 className="mt-3 break-words text-3xl font-bold leading-tight text-slate-900">{display}</h3>
          {subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>}
        </div>

        {Icon && <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${t.icon}`}><Icon className="h-7 w-7" /></div>}
      </div>

      {(badge || trend || footer) && (
        <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
          <div className="flex items-center gap-2">
            {badge && <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${t.badge}`}>{badge}</span>}
            {trend && <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${t.badge}`}><ArrowUpRight className="h-3.5 w-3.5" />{trend}</span>}
          </div>

          {footer && <span className="text-xs font-medium text-slate-500">{footer}</span>}
        </div>
      )}
    </motion.div>
  );
}