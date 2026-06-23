import {
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Activity,
} from "lucide-react";
import WellnessCard from "./WellnessCard";

export default function WellnessMetrics() {
  const metrics = [
    {
      title: "Wellness Score",
      value: "84%",
      status: "Optimal",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      title: "Global Sync",
      value: "TriDosha",
      status: "Connected",
      icon: Sparkles,
      color: "blue",
    },
    {
      title: "Recovery Index",
      value: "92%",
      status: "Excellent",
      icon: ShieldCheck,
      color: "amber",
    },
    {
      title: "Activity Feed",
      value: "Live",
      status: "Updated 5m ago",
      icon: Activity,
      color: "teal",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {metrics.map(metric => (
        <WellnessCard
          key={metric.title}
          title={metric.title}
          value={metric.value}
          status={metric.status}
          icon={metric.icon}
          color={metric.color}
        />
      ))}
    </section>
  );
}