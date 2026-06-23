import { SearchX } from "lucide-react";

export default function EmptyState({
  title = "No Data Found",
  description = "Nothing available right now.",
  action,
  icon: Icon = SearchX,
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 md:p-14 text-center">
      <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <Icon className="w-7 h-7 text-slate-500" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}