const Greeting = () => {
  return (
    <div className="bg-white rounded-[28px] p-8 flex justify-between items-center shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      
      <div>
        <p className="text-gray-500 text-sm">Good Morning,</p>

        <h1 className="text-[42px] font-bold text-[#1E293B] mt-2 leading-tight">
          Dr. Renjith N Raj
        </h1>
      </div>

      <img
        src="https://img.freepik.com/free-vector/doctors-concept-illustration_114360-1515.jpg"
        className="w-56 hidden md:block"
      />
    </div>
  );
};

export default Greeting;