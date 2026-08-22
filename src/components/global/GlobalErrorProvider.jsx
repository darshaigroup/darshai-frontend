import { createContext, useContext, useEffect, useState } from "react";

const GlobalErrorContext = createContext(null);

export const useGlobalError = () => useContext(GlobalErrorContext);

export default function GlobalErrorProvider({ children }) {
  const [error, setError] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(null);

  useEffect(() => {
    const handleGlobalError = e => {
      setError({
        message:
          e.detail?.message ||
          "Server error. Please try again later.",
      });
    };

    const handleSessionExpired = e => {
      setSessionExpired({
        message:
          e.detail?.message ||
          "Your session has expired. Please login again.",
      });
    };

    const handleWindowError = () => {
      setError({
        message: "Something went wrong. Please try again later.",
      });
    };

    const handleUnhandledRejection = () => {
      setError({
        message: "Something went wrong. Please try again later.",
      });
    };

    window.addEventListener("global-error", handleGlobalError);
    window.addEventListener("session-expired", handleSessionExpired);
    window.addEventListener("error", handleWindowError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("global-error", handleGlobalError);
      window.removeEventListener("session-expired", handleSessionExpired);
      window.removeEventListener("error", handleWindowError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  const closeError = () => setError(null);

  const handleSessionOk = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    sessionStorage.clear();

    setSessionExpired(null);

    window.location.replace("/login");
  };

  return (
    <GlobalErrorContext.Provider value={{ error, setError }}>
      {children}

      {(error || sessionExpired) && (
        <div className="fixed inset-x-0 top-0 z-[99999] flex justify-center px-4 pt-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
            <div
              className={`h-1 ${
                sessionExpired ? "bg-amber-500" : "bg-red-500"
              }`}
            />

            <div className="p-5">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                    sessionExpired
                      ? "bg-amber-100 text-amber-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  !
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold text-gray-900">
                    {sessionExpired
                      ? "Session Expired"
                      : "Something went wrong"}
                  </h2>

                  <p className="mt-1 text-sm leading-5 text-gray-600">
                    {sessionExpired?.message || error?.message}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={sessionExpired ? handleSessionOk : closeError}
                className="mt-5 w-full rounded-xl bg-[#1E7A3A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#14532d]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </GlobalErrorContext.Provider>
  );
}