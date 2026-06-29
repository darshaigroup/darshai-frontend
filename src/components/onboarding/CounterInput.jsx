import { Minus, Plus } from "lucide-react";

const CounterInput = ({
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
}) => {

  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[24px] p-5">
      <div className="text-sm text-slate-500 mb-4">
        {label}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={decrease}
          className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200"
        >
          <Minus size={16} />
        </button>

        <div className="text-2xl font-bold text-[#173C68]">
          {value}
        </div>

        <button
          type="button"
          onClick={increase}
          className="w-10 h-10 rounded-full bg-[#173C68] text-white flex items-center justify-center hover:opacity-90"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );

};

export default CounterInput;