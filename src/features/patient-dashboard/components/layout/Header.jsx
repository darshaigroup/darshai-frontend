import {
  Search,
  Bell,
  Moon,
  Sun,
  Menu,
  LogOut,
  HelpCircle,
} from "lucide-react";

export default function Header({
  activePatient,
  searchQuery,
  setSearchQuery,
  onLogout,
  currentTab,
  isDarkMode,
  onToggleTheme,
  onRestartTour,
  onOpenSidebar,
}) {
  const titles = {
    dashboard: {
      title: `Good Morning ${activePatient?.full_name?.split(" ")[0] || "Patient"}!`,
      subtitle: "Your personalized longevity companion is monitoring your wellness.",
    },
    assessment: {
      title: "Clinical Assessment",
      subtitle: "Continue your Geo-Prakriti assessment.",
    },
    report: {
      title: "Health Reports",
      subtitle: "View your latest wellness reports.",
    },
    result: {
      title: "Health Insights",
      subtitle: "Review your personalized recommendations.",
    },
    settings: {
      title: "Profile Settings",
      subtitle: "Manage your preferences and account.",
    },
  };

  const page = titles[currentTab] || titles.dashboard;

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/70 bg-[#F8F6F1]/90 backdrop-blur-xl">
      <div className="max-w-[1520px] mx-auto h-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">

        {/* Mobile Menu */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden w-11 h-11 rounded-xl border border-stone-200 bg-white flex items-center justify-center shadow-sm"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>

        {/* Title */}
        <div className="hidden md:block min-w-[250px]">
          <h2 className="font-serif text-[28px] font-bold text-slate-900 leading-none">
            {page.title}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {page.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="hidden lg:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports, appointments, recommendations..."
              className="w-full h-12 rounded-2xl border border-stone-200 bg-white pl-11 pr-4 text-sm outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* UTC */}
          <div className="hidden xl:flex flex-col text-right">
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
              UTC Server Health
            </span>

            <span className="text-xs font-semibold text-emerald-600">
              Healthy • Online
            </span>
          </div>

          {/* Tour */}
          <button
            onClick={onRestartTour}
            className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-emerald-50 transition-all"
            title="Restart Tour"
          >
            <HelpCircle className="w-5 h-5 text-slate-600" />
          </button>

          {/* Theme */}
          <button
            onClick={onToggleTheme}
            className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-emerald-50 transition-all"
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-emerald-50 transition-all">
            <Bell className="w-5 h-5 text-slate-700" />

            {(activePatient?.alerts?.length || 0) > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-rose-500" />
            )}
          </button>

          {/* Profile */}
          <div className="hidden md:flex items-center gap-3 pl-2">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">
                {activePatient?.full_name || "Patient"}
              </p>

              <p className="text-[11px] uppercase tracking-[0.15em] text-emerald-600">
                {activePatient?.primaryDosha || "TriDosha"}
              </p>
            </div>

            <img
              src={
                activePatient?.avatar ||
                "https://ui-avatars.com/api/?name=Patient"
              }
              alt="Patient"
              className="w-11 h-11 rounded-full border-2 border-emerald-500 object-cover"
            />
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="w-11 h-11 rounded-xl bg-white border border-stone-200 flex items-center justify-center hover:bg-rose-50 hover:border-rose-300 transition-all"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-slate-700 hover:text-rose-600" />
          </button>
        </div>
      </div>
    </header>
  );
}