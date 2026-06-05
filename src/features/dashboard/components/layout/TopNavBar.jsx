import { Search, Settings, Bell, LogOut } from "lucide-react";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};

const TopNavbar = ({ openModal }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="flex items-center bg-white px-4 py-2 rounded-full w-[350px] shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search..."
            className="ml-2 outline-none text-sm w-full bg-transparent"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

  <button
    onClick={openModal}
    className="
      bg-[#8BC34A]
      text-white
      px-5 py-2
      rounded-full
      shadow
      hover:bg-[#7CB342]
    "
  >
    + Add Patient
  </button>

  <Settings
    size={18}
    className="text-gray-500"
  />

  <Bell
    size={18}
    className="text-gray-500"
  />

  <button
    onClick={handleLogout}
    className="
      flex items-center gap-2
      px-4 py-2
      rounded-full
      border border-red-200
      text-red-600
      hover:bg-red-50
      transition
    "
  >
    <LogOut size={16} />

    <span className="text-sm">
      Logout
    </span>
  </button>

  <img
    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
    alt="Profile"
    className="w-10 h-10 rounded-full"
  />

</div>
    </div>
  );
};

export default TopNavbar;