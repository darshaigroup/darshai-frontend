
import hero from "../../../../assets/images/Doctor_hero.png";
const Greeting = () => {
  return (
    <div className="bg-white rounded-[36px] px-12 py-10 min-h-[300px] flex items-center justify-between shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

      <div className="max-w-[600px]">
        <p className="text-[28px] text-gray-500 font-medium">
          Good Morning,
        </p>

        <h1 className="mt-4 text-[72px] font-bold leading-[1.1] text-[#1E293B]">
          Dr. Renjith N Raj
        </h1>
      </div>

      <img
        src={hero}
        className="hidden lg:block h-[240px] object-contain"
      />

    </div>
  );
};

export default Greeting;