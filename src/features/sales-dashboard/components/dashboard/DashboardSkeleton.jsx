export default function DashboardSkeleton(){

  return(
    <div className="space-y-8 animate-pulse">

      <div className="h-44 rounded-[34px] bg-[#F3F4F6]" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {Array.from({length:8}).map((_,i)=>(
          <div
            key={i}
            className="h-36 rounded-[30px] bg-[#F3F4F6]"
          />
        ))}

      </div>

      <div className="h-[420px] rounded-[34px] bg-[#F3F4F6]" />

      <div className="grid gap-8 xl:grid-cols-2">

        <div className="h-[360px] rounded-[34px] bg-[#F3F4F6]" />

        <div className="h-[360px] rounded-[34px] bg-[#F3F4F6]" />

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        <div className="h-[420px] rounded-[34px] bg-[#F3F4F6]" />

        <div className="h-[420px] rounded-[34px] bg-[#F3F4F6]" />

      </div>

      <div className="h-[220px] rounded-[34px] bg-[#F3F4F6]" />

      <div className="h-[340px] rounded-[34px] bg-[#F3F4F6]" />

      <div className="h-[400px] rounded-[34px] bg-[#F3F4F6]" />

      <div className="h-[520px] rounded-[34px] bg-[#F3F4F6]" />

    </div>
  );

}