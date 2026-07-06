import {
  Users,
  PhoneCall,
  HeartHandshake,
  CreditCard,
  UserCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import StatsCard from "../card/StatsCard";

export default function KPISections({stats}){

  return(

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      <StatsCard
        title="Total Leads"
        value={stats.total_leads||0}
        icon={Users}
        color="#173C68"
      />

      <StatsCard
        title="Lead"
        value={stats.lead||0}
        icon={Users}
        color="#2563EB"
      />

      <StatsCard
        title="Contacted"
        value={stats.contacted||0}
        icon={PhoneCall}
        color="#0EA5E9"
      />

      <StatsCard
        title="Interested"
        value={stats.interested||0}
        icon={HeartHandshake}
        color="#16A34A"
      />

      <StatsCard
        title="Purchased"
        value={stats.purchased||0}
        icon={CreditCard}
        color="#C6A75E"
      />

      <StatsCard
        title="Assigned"
        value={stats.assigned||0}
        icon={UserCheck}
        color="#1E7A3A"
      />

      <StatsCard
        title="Sales Closed"
        value={stats.closed||0}
        icon={CheckCircle2}
        color="#15803D"
      />

      <StatsCard
        title="Lost Opportunity"
        value={stats.lost||0}
        icon={XCircle}
        color="#DC2626"
      />

    </div>

  );

}