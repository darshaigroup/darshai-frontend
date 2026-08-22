export default function SessionExpiredModal({ message, onConfirm }) {
  return (
    <div className="fixed inset-x-0 top-0 z-[99999] flex justify-center px-4 pt-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <div className="h-1 bg-amber-500" />

        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
              !
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold text-gray-900">
                Session Expired
              </h2>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                {message}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            className="mt-5 w-full rounded-xl bg-[#1E7A3A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#14532d]"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}