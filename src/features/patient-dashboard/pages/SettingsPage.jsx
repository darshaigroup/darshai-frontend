import SettingsView from "../sections/SettingsView";

export default function SettingsPage({
  activePatient,
  onUpdatePatient,
  onAddAlert,
}) {
  return (
    <div className="space-y-6 md:space-y-8">
      <SettingsView
        activePatient={activePatient}
        onUpdatePatient={onUpdatePatient}
        onAddAlert={onAddAlert}
      />
    </div>
  );
}