import { motion } from "framer-motion";
import PatientForm from "./PatientForm";

export default function AddPatientModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-slate-900 via-emerald-900/20 to-teal-900/30 p-8 rounded-3xl w-[500px] border border-white/20 shadow-2xl"
      >
       <div className="relative mb-6">

  {/* Center Title */}
  <h2 className="text-2xl font-bold text-white text-center">
    Add New Patient
  </h2>

  {/* Close Button (Right Corner) */}
  <button
    onClick={onClose}
    className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xl"
  >
    ✕
  </button>

</div>

        <PatientForm onSubmit={onSubmit} />
      </motion.div>
    </div>
  );
}