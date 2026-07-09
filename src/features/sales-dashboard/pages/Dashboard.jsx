import { useEffect, useState } from "react";

import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickActions from "../components/dashboard/QuickActions";
import ConversionOverview from "../components/dashboard/ConversionOverview";
import RecentRegistrations from "../components/dashboard/RecentRegistrations";
import DashboardCharts from "../components/dashboard/DashboardCharts";

import {
  getDashboard,
  getLeads,
  getDoctors,
} from "../services/salesService";

export default function Dashboard() {

  const [loading,setLoading]=useState(true);

  const [stats,setStats]=useState(null);
  const [leads,setLeads]=useState([]);
  const [priorityLeads,setPriorityLeads]=useState([]);
  const [doctors,setDoctors]=useState([]);

  useEffect(()=>{
    loadDashboard();
  },[]);

  async function loadDashboard(){

    try{

      const[
        dashboardData,
        leadData,
        doctorData,
      ]=await Promise.all([
        getDashboard(),
        getLeads(),
        getDoctors(),
      ]);

      setStats(dashboardData);
      setLeads(leadData||[]);
      setDoctors(doctorData||[]);

      setPriorityLeads(
        (leadData||[])
          .filter(lead=>
            ["Lead","Contacted","Interested"].includes(lead.lead_status)
          )
          .sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
          .slice(0,6)
      );

    }catch(err){

      console.error(err);

    }finally{

      setLoading(false);

    }

  }

  if(loading) return <Loading/>;

  if(!stats){
    return(
      <EmptyState
        title="Dashboard Unavailable"
        description="Unable to load dashboard statistics."
      />
    );
  }

  return (
  <div className="space-y-10">

    <DashboardHeader />

    <ConversionOverview stats={stats} />

    <DashboardCharts />

  </div>
);

}


