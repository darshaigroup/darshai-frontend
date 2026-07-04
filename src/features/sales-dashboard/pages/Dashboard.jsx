import { useEffect, useState } from "react";
import {
  Users,
  PhoneCall,
  HeartHandshake,
  CreditCard,
  UserCheck,
  CheckCircle2,
  XCircle,
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
        subtitle="Overview of complete sales pipeline."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">

        <StatsCard
          title="Total Leads"
          value={stats.total_leads || 0}
          icon={Users}
          color="#173C68"
        />

        <StatsCard
          title="Lead"
          value={stats.lead || 0}
          icon={Users}
          color="#2563EB"
        />

        <StatsCard
          title="Contacted"
          value={stats.contacted || 0}
          icon={PhoneCall}
          color="#0EA5E9"
        />

        <StatsCard
          title="Interested"
          value={stats.interested || 0}
          icon={HeartHandshake}
          color="#16A34A"
        />

        <StatsCard
          title="Purchased"
          value={stats.purchased || 0}
          icon={CreditCard}
          color="#C6A75E"
        />

        <StatsCard
          title="Assigned"
          value={stats.assigned || 0}
          icon={UserCheck}
          color="#1E7A3A"
        />

        <StatsCard
          title="Sales Closed"
          value={stats.closed || 0}
          icon={CheckCircle2}
          color="#15803D"
        />

        <StatsCard
          title="Lost Opportunity"
          value={stats.lost || 0}
          icon={XCircle}
          color="#DC2626"
        />

      </div>
    </div>
  );
}