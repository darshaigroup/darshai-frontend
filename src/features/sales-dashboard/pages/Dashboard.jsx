import { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  UserCheck,
  CheckCircle2,
} from "lucide-react";

import SectionTitle from "../components/ui/SectionTitle";
import StatsCard from "../components/card/StatsCard";
import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import { getDashboard } from "../services/salesService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getDashboard();
      setStats(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loading />;

  if (!stats)
    return (
      <EmptyState
        title="Dashboard Unavailable"
        description="Unable to load dashboard statistics."
      />
    );

  return (
    <div className="space-y-8">

      <SectionTitle
        title="Sales Dashboard"
        subtitle="Overview of sales pipeline and lead conversion."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatsCard
          title="Total Leads"
          value={stats.total_leads}
          icon={Users}
          color="#173C68"
        />

        <StatsCard
          title="New Leads"
          value={stats.new_leads}
          icon={UserPlus}
          color="#2563EB"
        />

        <StatsCard
          title="Assigned"
          value={stats.assigned}
          icon={UserCheck}
          color="#1E7A3A"
        />

        <StatsCard
          title="Closed"
          value={stats.closed}
          icon={CheckCircle2}
          color="#C6A75E"
        />

      </div>

    </div>
  );
}