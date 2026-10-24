import{useEffect,useMemo,useState}from"react";
import{useNavigate}from"react-router-dom";
import{motion}from"framer-motion";
import{Search,RefreshCw,ClipboardList,ChevronRight,Mail,Phone,MapPin}from"lucide-react";
import{getEnquiries,searchEnquiries}from"../services/salesService";
import Loading from"../components/common/Loading";
import EmptyState from"../components/common/EmptyState";

const statusClass={new:"bg-blue-50 text-blue-700 border-blue-200",contacted:"bg-amber-50 text-amber-700 border-amber-200",qualified:"bg-emerald-50 text-emerald-700 border-emerald-200",registration_sent:"bg-purple-50 text-purple-700 border-purple-200",recommendation_sent:"bg-indigo-50 text-indigo-700 border-indigo-200",discovery_call:"bg-cyan-50 text-cyan-700 border-cyan-200",proposal:"bg-orange-50 text-orange-700 border-orange-200",booked:"bg-green-50 text-green-700 border-green-200",closed:"bg-gray-50 text-gray-700 border-gray-200"};
const label=s=>String(s||"new").replaceAll("_"," ").replace(/\b\w/g,c=>c.toUpperCase());

export default function EnquiryList(){
  const navigate=useNavigate();
  const[enquiries,setEnquiries]=useState([]);
  const[loading,setLoading]=useState(true);
  const[search,setSearch]=useState("");
  const[refreshing,setRefreshing]=useState(false);

  async function load(value=""){
    try{
      value?setRefreshing(true):setLoading(true);
      setEnquiries((value?await searchEnquiries(value):await getEnquiries())||[]);
    }catch(err){console.error("Enquiries error:",err);}
    finally{setLoading(false);setRefreshing(false);}
  }

  useEffect(()=>{load();const t=setInterval(()=>load(search),15000);return()=>clearInterval(t);},[]);
  useEffect(()=>{const t=setTimeout(()=>load(search),350);return()=>clearTimeout(t);},[search]);

  const total=enquiries.length;
  const fresh=useMemo(()=>enquiries.filter(e=>e.status==="new").length,[enquiries]);
  const qualified=useMemo(()=>enquiries.filter(e=>e.status==="qualified").length,[enquiries]);
  return(
    <div className="min-h-full bg-[#f6f8f5] p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mb-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold text-[#173C68] sm:text-2xl">Client Enquiries</h1>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">Review and manage new wellness enquiries.</p>
            </div>
           
          </div>
        </motion.div>

        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {[["Total Enquiries",total],["New",fresh],["Qualified",qualified]].map(([title,value])=>(
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="text-xs font-medium text-gray-500">{title}</p>
              <p className="mt-1 text-xl font-semibold text-[#173C68] sm:text-2xl">{value}</p>
            </div>
          ))}
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#173C68]">
              <ClipboardList size={18} className="text-[#1e7a3a]"/>Enquiry Pipeline
            </div>
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, phone..." className="w-full rounded-xl border border-gray-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#1e7a3a]"/>
            </div>
          </div>

          {!enquiries.length?<EmptyState title="No enquiries found."/>:(
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="bg-[#f8faf7] text-xs uppercase tracking-wider text-gray-500">
                    <tr>
                      <th className="px-5 py-4">Enquiry</th><th className="px-5 py-4">Client</th><th className="px-5 py-4">Location</th><th className="px-5 py-4">Budget</th><th className="px-5 py-4">Status</th><th/>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {enquiries.map((e,i)=>(
                      <motion.tr key={e.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*.025}} className="cursor-pointer hover:bg-[#f8faf7]" onClick={()=>navigate(`/sales-dashboard/enquiries/${e.id}`)}>
                        <td className="px-5 py-4"><div className="font-medium text-[#173C68]">{e.enquiry_id}</div><div className="mt-1 text-xs text-gray-400">{e.source||"website"}</div></td>
                        <td className="px-5 py-4"><div className="font-medium text-gray-800">{e.name}</div><div className="mt-1 text-xs text-gray-500">{e.email}</div><div className="mt-1 text-xs text-gray-500">{e.phone}</div></td>
                        <td className="px-5 py-4 text-sm text-gray-600">{e.location||"Not provided"}</td>
                        <td className="px-5 py-4 text-sm text-gray-600">{e.investment_preference||"Not provided"}</td>
                        <td className="px-5 py-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusClass[e.status]||statusClass.new}`}>{label(e.status)}</span></td>
                        <td className="px-5 py-4 text-right"><ChevronRight size={18} className="text-gray-400"/></td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-gray-100 md:hidden">
                {enquiries.map((e,i)=>(
                  <motion.button key={e.id} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*.025}} onClick={()=>navigate(`/sales-dashboard/enquiries/${e.id}`)} className="w-full p-4 text-left transition hover:bg-[#f8faf7]">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#173C68]">{e.enquiry_id}</p>
                        <p className="mt-1 truncate font-medium text-gray-800">{e.name}</p>
                      </div>
                      <span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-medium ${statusClass[e.status]||statusClass.new}`}>{label(e.status)}</span>
                    </div>
                    <div className="mt-3 space-y-1.5 text-xs text-gray-500">
                      <p className="flex items-center gap-2"><Mail size={13}/>{e.email}</p>
                      <p className="flex items-center gap-2"><Phone size={13}/>{e.phone}</p>
                      <p className="flex items-center gap-2"><MapPin size={13}/>{e.location||"Not provided"}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}