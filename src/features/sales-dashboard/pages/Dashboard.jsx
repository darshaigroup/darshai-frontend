// import { useEffect, useState } from "react";

// import Loading from "../components/common/Loading";
// import EmptyState from "../components/common/EmptyState";

// import DashboardHeader from "../components/dashboard/DashboardHeader";
// import QuickActions from "../components/dashboard/QuickActions";
// import ConversionOverview from "../components/dashboard/ConversionOverview";
// import RecentRegistrations from "../components/dashboard/RecentRegistrations";
// import DashboardCharts from "../components/dashboard/DashboardCharts";

// import {
//   getDashboard,
//   getLeads,
//   getDoctors,
// } from "../services/salesService";

// export default function Dashboard() {

//   const [loading,setLoading]=useState(true);

//   const [stats,setStats]=useState(null);
//   const [leads,setLeads]=useState([]);
//   const [priorityLeads,setPriorityLeads]=useState([]);
//   const [doctors,setDoctors]=useState([]);

//   useEffect(()=>{
//     loadDashboard();
//   },[]);

//   async function loadDashboard(){

//     try{

//       const[
//         dashboardData,
//         leadData,
//         doctorData,
//       ]=await Promise.all([
//         getDashboard(),
//         getLeads(),
//         getDoctors(),
//       ]);

//       setStats(dashboardData);
//       setLeads(leadData||[]);
//       setDoctors(doctorData||[]);

//       setPriorityLeads(
//         (leadData||[])
//           .filter(lead=>
//             ["Lead","Contacted","Interested"].includes(lead.lead_status)
//           )
//           .sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
//           .slice(0,6)
//       );

//     }catch(err){

//       console.error(err);

//     }finally{

//       setLoading(false);

//     }

//   }

//   if(loading) return <Loading/>;

//   if(!stats){
//     return(
//       <EmptyState
//         title="Dashboard Unavailable"
//         description="Unable to load dashboard statistics."
//       />
//     );
//   }

//   return(

//     <div className="space-y-10">

//       <DashboardHeader/>

//       <ConversionOverview
//         stats={stats}
//       />

//       <DashboardCharts
//         stats={stats}
//       />
//        <RecentRegistrations
//         leads={leads}
//       />
//       <QuickActions/>


//     </div>

//   );

// }


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
  console.log("========== Dashboard Render ==========");

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [priorityLeads, setPriorityLeads] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    console.log("Dashboard mounted");
    loadDashboard();
  }, []);

  async function loadDashboard() {
    console.log("Loading Dashboard...");

    try {
      const [
        dashboardData,
        leadData,
        doctorData,
      ] = await Promise.all([
        getDashboard(),
        getLeads(),
        getDoctors(),
      ]);

      console.log("Dashboard API:", dashboardData);
      console.log("Leads API:", leadData);
      console.log("Doctors API:", doctorData);

      setStats(dashboardData);
      console.log("Stats State Updated");

      setLeads(leadData || []);
      console.log("Leads State Updated");

      setDoctors(doctorData || []);
      console.log("Doctors State Updated");

      const priority = (leadData || [])
        .filter((lead) =>
          ["Lead", "Contacted", "Interested"].includes(lead.lead_status)
        )
        .sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        )
        .slice(0, 6);

      console.log("Priority Leads:", priority);

      setPriorityLeads(priority);
      console.log("Priority Leads State Updated");

    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      console.log("Loading Finished");
      setLoading(false);
    }
  }

  console.log("Current Loading:", loading);
  console.log("Current Stats:", stats);
  console.log("Current Leads:", leads);
  console.log("Current Doctors:", doctors);
  console.log("Current Priority:", priorityLeads);

  if (loading) {
    console.log("Rendering Loading Component");
    return <Loading />;
  }

  if (!stats) {
    console.log("Stats is NULL");
    return (
      <EmptyState
        title="Dashboard Unavailable"
        description="Unable to load dashboard statistics."
      />
    );
  }

  console.log("Rendering Dashboard Components");

  return (
    <div className="space-y-10">
      {console.log("Rendering DashboardHeader")}
      <DashboardHeader />

      {console.log("Rendering ConversionOverview")}
      <ConversionOverview
        stats={stats}
      />

      {console.log("Rendering DashboardCharts")}
      <DashboardCharts
        stats={stats}
      />

      {console.log("Rendering RecentRegistrations")}
      <RecentRegistrations
        leads={leads}
      />

      {console.log("Rendering QuickActions")}
      <QuickActions />
    </div>
  );
}