export default function ReviewCard({title,value}) {

  return (

    <div className="bg-white rounded-[24px] border border-slate-200 p-5">

      <div className="text-xs uppercase tracking-[2px] text-slate-400 mb-2">

        {title}

      </div>

      <div className="text-[#173C68] font-semibold break-words">

        {Array.isArray(value) ? value.join(", ") : value || "-"}

      </div>

    </div>

  );

}