import {
  Search,
  Bell,
  Menu,
  Moon,
  Sun,
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
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-stone-200">
      <div className="h-20 px-4 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Mobile Menu */}
        <button
          onClick={onOpenSidebar}
          className="lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Welcome */}
        <div className="hidden md:block">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Welcome Back
          </h2>
          <p className="text-xs text-slate-500">
            How are you feeling today?
          </p>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button onClick={onRestartTour}>
            <HelpCircle className="w-5 h-5" />
          </button>

          <button onClick={onToggleTheme}>
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <button>
            <Bell className="w-5 h-5" />
          </button>

          <img
            src={activePatient.avatar}
            alt=""
            className="w-10 h-10 rounded-full border-2 border-emerald-500"
          />

          <button onClick={onLogout}>
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}