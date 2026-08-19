// SettingsPage.jsx
import {useOutletContext} from "react-router-dom";
import SettingsView from "../sections/SettingsView";

export default function SettingsPage(){
  const {
    patientData,
    activePatient,
    isDarkMode,
    onToggleTheme
  }=useOutletContext();

  return(
    <div className="space-y-6 md:space-y-8">
      <SettingsView
        activePatient={activePatient}
        patientData={patientData}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />
    </div>
  );
}