export default function ProgressHeader({ current,total }) {
  const progress=(current/total)*100;

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-[#C6A75E] tracking-[4px] text-xs">DARSHAI WELLNESS JOURNEY</p>
          <h2 className="text-2xl font-serif text-[#173C68]">Personal Wellness Blueprint</h2>
        </div>

        <div className="text-sm text-slate-500">
          Step {current} of {total}
        </div>
      </div>

      <div className="h-2 bg-white rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#1E7A3A] to-[#C6A75E] transition-all duration-700"
          style={{ width:`${progress}%` }}
        />
      </div>
    </div>
  );
}