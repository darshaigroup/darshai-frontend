import { X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar({
  open,
  onClose,
  currentTab,
  setCurrentTab,
  activePatient,
  onLogout,
}) {
  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />

          <div className="fixed left-0 top-0 bottom-0 z-50 lg:hidden">
            <div className="absolute right-3 top-3">
              <button
                onClick={onClose}
                className="bg-white/10 p-2 rounded-xl text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Sidebar
              currentTab={currentTab}
              setCurrentTab={(tab) => {
                setCurrentTab(tab);
                onClose();
              }}
              activePatient={activePatient}
              onLogout={onLogout}
            />
          </div>
        </>
      )}
    </>
  );
}