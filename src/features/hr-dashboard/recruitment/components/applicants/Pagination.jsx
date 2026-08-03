import {ChevronLeft,ChevronRight} from "lucide-react";

const getPages=(page,totalPages)=>{
  if(totalPages<=7) return Array.from({length:totalPages},(_,i)=>i+1);

  const pages=[1];

  if(page>4) pages.push("left");

  const start=Math.max(2,page-1),end=Math.min(totalPages-1,page+1);
  for(let i=start;i<=end;i++) pages.push(i);

  if(page<totalPages-3) pages.push("right");

  pages.push(totalPages);
  return pages;
};

const Pagination=({page=1,totalPages=1,total=0,limit=20,onChange})=>{
  const pages=getPages(page,totalPages);
  const from=total?((page-1)*limit)+1:0,to=Math.min(page*limit,total);

  if(totalPages<=0) return null;

  return(
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E3E9E4] bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-center text-xs text-[#7D8981] sm:text-left">
        Showing <span className="font-semibold text-[#344239]">{from.toLocaleString()}</span>–<span className="font-semibold text-[#344239]">{to.toLocaleString()}</span> of <span className="font-semibold text-[#344239]">{total.toLocaleString()}</span> applications
      </p>

      <div className="flex items-center justify-center gap-1">
        <button type="button" onClick={()=>onChange?.(page-1)} disabled={page<=1} aria-label="Previous page" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DFE6E1] text-[#68756D] transition hover:border-[#B9D5C0] hover:bg-[#F1F8F3] hover:text-[#1E7A3A] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#DFE6E1] disabled:hover:bg-transparent disabled:hover:text-[#68756D]">
          <ChevronLeft className="h-4 w-4"/>
        </button>

        <div className="hidden items-center gap-1 sm:flex">
          {pages.map((item,index)=>item==="left"||item==="right"?(
            <span key={`${item}-${index}`} className="flex h-9 w-7 items-center justify-center text-xs text-[#9AA49D]">•••</span>
          ):(
            <button key={item} type="button" onClick={()=>onChange?.(item)} aria-current={item===page?"page":undefined} className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2 text-xs font-semibold transition ${item===page?"bg-[#1E7A3A] text-white shadow-[0_4px_12px_rgba(30,122,58,.18)]":"border border-transparent text-[#68756D] hover:border-[#DCE6DF] hover:bg-[#F4F8F5] hover:text-[#1E7A3A]"}`}>
              {item}
            </button>
          ))}
        </div>

        <div className="flex h-9 min-w-[92px] items-center justify-center rounded-lg bg-[#F5F8F6] px-3 text-xs font-medium text-[#56635A] sm:hidden">
          {page} / {totalPages}
        </div>

        <button type="button" onClick={()=>onChange?.(page+1)} disabled={page>=totalPages} aria-label="Next page" className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DFE6E1] text-[#68756D] transition hover:border-[#B9D5C0] hover:bg-[#F1F8F3] hover:text-[#1E7A3A] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#DFE6E1] disabled:hover:bg-transparent disabled:hover:text-[#68756D]">
          <ChevronRight className="h-4 w-4"/>
        </button>
      </div>
    </div>
  );
};

export default Pagination;