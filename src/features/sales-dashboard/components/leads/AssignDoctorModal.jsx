import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Stethoscope, X, Loader2, CheckCircle2 } from "lucide-react";

import GradientButton from "../ui/GradientButton";
import { getDoctors, assignDoctor } from "../../services/salesService";

export default function AssignDoctorModal({
  open,
  leadId,
  onClose,
  onAssigned,
}) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmAssign, setConfirmAssign] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (open) loadDoctors();
  }, [open]);

  async function loadDoctors() {
    try {
      setLoading(true);

      const data = await getDoctors();

      setDoctors(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const filtered = useMemo(() => {
    return doctors.filter(
      (doctor) =>
        doctor.full_name?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, doctors]);

  async function handleAssign() {
    if (!selected) return;

    try {
      setSaving(true);

      await assignDoctor(leadId, selected);

      onAssigned?.();
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-3xl overflow-hidden rounded-[36px] bg-white shadow-2xl"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b px-8 py-6">
              <div>
                <h2 className="font-serif text-3xl text-[#173C68]">
                  Assign Doctor
                </h2>

                <p className="mt-1 text-slate-500">
                  Select a wellness expert for this patient.
                </p>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Search */}

            <div className="border-b p-6">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search doctor..."
                  className="h-12 w-full rounded-full border border-[#E7E3DB] pl-11 pr-4 outline-none focus:border-[#1E7A3A]"
                />
              </div>
            </div>

            {/* Doctors */}

            <div className="max-h-[420px] overflow-y-auto p-6">
              {loading ? (
                <div className="flex justify-center py-20">
                  <Loader2 size={34} className="animate-spin text-[#1E7A3A]" />
                </div>
              ) : (
                filtered.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setSelected(doctor.id)}
                    className={`mb-4 flex cursor-pointer items-center justify-between rounded-[24px] border p-5 transition ${
                      selected === doctor.id
                        ? "border-[#1E7A3A] bg-[#F7FCF8]"
                        : "border-[#ECE7DD] hover:border-[#1E7A3A]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#173C68]/10">
                        <Stethoscope size={22} className="text-[#173C68]" />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#173C68]">
                          {doctor.full_name}
                        </h3>

                        <p className="text-sm text-slate-500">{doctor.email}</p>
                      </div>
                    </div>

                    {selected === doctor.id && (
                      <CheckCircle2 size={24} className="text-[#1E7A3A]" />
                    )}
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}

            <div className="flex flex-col justify-end gap-4 border-t p-6 sm:flex-row">
              <button
                onClick={onClose}
                className="rounded-full border border-slate-300 px-8 py-3 hover:border-[#173C68]"
              >
                Cancel
              </button>

              <GradientButton
                onClick={() => setConfirmAssign(true)}
                disabled={!selected || saving}
                icon={<CheckCircle2 size={18} />}
              >
                Assign Doctor
              </GradientButton>
            </div>
          </motion.div>
        </motion.div>
      )}
      {confirmAssign && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl"
          >
            <div className="flex justify-center mb-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1E7A3A]/10">
                <CheckCircle2 size={34} className="text-[#1E7A3A]" />
              </div>
            </div>

            <h2 className="text-center text-2xl font-serif text-[#173C68]">
              Confirm Assignment
            </h2>

            <p className="mt-4 text-center leading-7 text-slate-600">
              Are you sure you want to assign
              <span className="font-semibold text-[#173C68]">
                {" "}
                {doctors.find((d) => d.id === selected)?.full_name}
              </span>{" "}
              to this patient?
            </p>

            <p className="mt-3 text-center text-sm text-red-500 font-medium">
              Once assigned, this cannot be changed.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => setConfirmAssign(false)}
                disabled={saving}
                className="flex-1 rounded-full border border-slate-300 py-3 hover:border-[#173C68]"
              >
                Cancel
              </button>

              <GradientButton
                onClick={async () => {
                  setConfirmAssign(false);
                  await handleAssign();
                }}
                disabled={saving}
                className="flex-1"
                icon={
                  saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CheckCircle2 size={18} />
                  )
                }
              >
                {saving ? "Assigning..." : "Yes, Assign"}
              </GradientButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
