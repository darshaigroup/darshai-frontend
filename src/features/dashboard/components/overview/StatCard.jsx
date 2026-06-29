const LoadingDots=()=>(
  <div className="flex justify-center gap-2 mt-4">
    <span className="w-3 h-3 rounded-full bg-[#1E7A3A] animate-bounce"></span>
    <span className="w-3 h-3 rounded-full bg-[#1E7A3A] animate-bounce" style={{animationDelay:"0.15s"}}></span>
    <span className="w-3 h-3 rounded-full bg-[#1E7A3A] animate-bounce" style={{animationDelay:"0.3s"}}></span>
  </div>
);

const StatCard=({title,value,icon,color})=>{
  return(
    <div className="bg-white rounded-[32px] min-h-[220px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-300">

      <div className="h-full flex flex-col items-center justify-center text-center">

        <div className={`${color} text-5xl mb-5 drop-shadow-[0_0_12px_rgba(34,197,94,0.35)]`}>
          {icon}
        </div>

        {value===undefined||value===null?(
          <LoadingDots/>
        ):(
          <h2 className="text-[64px] font-bold leading-none text-[#1E293B]">
            {value}
          </h2>
        )}

        <p className="mt-3 text-xl font-medium text-gray-500">
          {title}
        </p>

      </div>

    </div>
  );
};

export default StatCard;