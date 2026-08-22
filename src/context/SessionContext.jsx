import { createContext, useContext } from "react";

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  return (
    <SessionContext.Provider value={{}}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);