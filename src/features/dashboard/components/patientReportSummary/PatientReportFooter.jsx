const PatientReportFooter = ({patient}) => {

  return (

    <div className="mt-12">

   

      <div className="text-center text-slate-500 text-sm py-8">

        © {new Date().getFullYear()} DarshAI Clinical Intelligence Platform

        <br />

        Confidential Wellness Assessment Report

      </div>

    </div>

  );

};

export default PatientReportFooter;