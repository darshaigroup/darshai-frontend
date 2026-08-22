import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { SessionProvider } from "./context/SessionContext";
import GlobalErrorProvider from "./components/global/GlobalErrorProvider";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <GlobalErrorProvider>
          <App />
        </GlobalErrorProvider>
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>
);