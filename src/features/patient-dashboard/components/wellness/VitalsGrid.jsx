import {
  Thermometer,
  Heart,
  Activity,
  Wind,
} from "lucide-react";
import WellnessCard from "./WellnessCard";

export default function VitalsGrid() {
  const vitals = [
    {
      title: "Body Temperature",
      value: "36.2°C",
      status: "Normal Baseline",
      icon: Thermometer,
      color: "amber",
    },
    {
      title: "Pulse Spectrum",
      value: "85 BPM",
      status: "Sama Equilibrium",
      icon: Heart,
      color: "rose",
    },
    {
      title: "Blood Pressure",
      value: "110/70",
      status: "Optimal Flow",
      icon: Activity,
      color: "emerald",
    },
    {
      title: "Breathing Cadence",
      value: "15/min",
      status: "Prana Balanced",
      icon: Wind,
      color: "teal",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {vitals.map(vital => (
        <WellnessCard
          key={vital.title}
          title={vital.title}
          value={vital.value}
          status={vital.status}
          icon={vital.icon}
          color={vital.color}
        />
      ))}
    </div>
  );
}