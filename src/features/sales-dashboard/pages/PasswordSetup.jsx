import {useEffect,useState} from "react";
import {Mail,RefreshCw,ShieldCheck,Clock} from "lucide-react";
import {
  getPasswordSetupPending,
  sendPasswordSetupEmail,
} from "../services/salesService";

export default function PasswordSetup(){
  const [patients,setPatients]=useState([]);
  const [loading,setLoading]=useState(true);
  const [sending,setSending]=useState(null);
  const [error,setError]=useState("");

  const loadPatients=async()=>{
    try{
      setError("");
      setLoading(true);
      const data=await getPasswordSetupPending();
      setPatients(data||[]);
    }catch(err){
      console.error(err);
      setError(err.message||"Unable to load password setup patients");
    }finally{
      setLoading(false);
    }
  };

  useEffect(()=>{
    loadPatients();
  },[]);

  const handleSend=async patientId=>{
    try{
      setSending(patientId);
      setError("");
      await sendPasswordSetupEmail(patientId);
      await loadPatients();
    }catch(err){
      console.error(err);
      setError(err.message||"Unable to send password setup email");
    }finally{
      setSending(null);
    }
  };

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Password Setup
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Send secure password creation links to eligible patients.
            </p>
          </div>

          <button
            type="button"
            onClick={loadPatients}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw size={17} className={loading?"animate-spin":""}/>
            Refresh
          </button>
        </div>

        {error&&(
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22}/>
              </div>

              <div>
                <p className="text-sm text-slate-500">Pending Setup</p>
                <p className="text-2xl font-bold text-slate-800">
                  {patients.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4">
            <h2 className="font-semibold text-slate-800">
              Patient Password Setup
            </h2>
          </div>

          {loading?(
            <div className="px-5 py-12 text-center text-sm text-slate-500">
              Loading patients...
            </div>
          ):patients.length===0?(
            <div className="px-5 py-12 text-center">
              <ShieldCheck className="mx-auto mb-3 text-green-500" size={36}/>
              <p className="font-medium text-slate-700">
                No patients are pending password setup.
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Patients who become eligible will appear here.
              </p>
            </div>
          ):(
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                      <th className="px-5 py-4">Patient</th>
                      <th className="px-5 py-4">Email</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4">Last Sent</th>
                      <th className="px-5 py-4 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patients.map(patient=>(
                      <tr
                        key={patient.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-slate-800">
                            {patient.full_name||patient.name||"Unknown"}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {patient.email||"-"}
                        </td>

                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                            patient.password_created_at
                              ?"bg-green-50 text-green-700"
                              :"bg-amber-50 text-amber-700"
                          }`}>
                            {patient.password_created_at
                              ?"Password Created"
                              :"Not Created"}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {patient.last_setup_sent_at?(
                            <span className="inline-flex items-center gap-1.5">
                              <Clock size={14}/>
                              {new Date(patient.last_setup_sent_at).toLocaleString()}
                            </span>
                          ):"Never"}
                        </td>

                        <td className="px-5 py-4 text-right">
                          {!patient.password_created_at&&(
                            <button
                              type="button"
                              onClick={()=>handleSend(patient.id)}
                              disabled={sending===patient.id}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#173C68] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Mail size={16}/>
                              {sending===patient.id
                                ?"Sending..."
                                :patient.last_setup_sent_at
                                  ?"Resend"
                                  :"Send Setup"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-slate-100 md:hidden">
                {patients.map(patient=>(
                  <div key={patient.id} className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-800">
                          {patient.full_name||patient.name||"Unknown"}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {patient.email||"-"}
                        </p>
                      </div>

                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        patient.password_created_at
                          ?"bg-green-50 text-green-700"
                          :"bg-amber-50 text-amber-700"
                      }`}>
                        {patient.password_created_at
                          ?"Created"
                          :"Not Created"}
                      </span>
                    </div>

                    {!patient.password_created_at&&(
                      <button
                        type="button"
                        onClick={()=>handleSend(patient.id)}
                        disabled={sending===patient.id}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#173C68] px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
                      >
                        <Mail size={16}/>
                        {sending===patient.id
                          ?"Sending..."
                          :patient.last_setup_sent_at
                            ?"Resend Password Setup"
                            :"Send Password Setup"}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}