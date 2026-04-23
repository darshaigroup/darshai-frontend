import avatar from "@/assets/images/logo.png";

const Greeting = () => {
  const hour = new Date().getHours();

  let message = "Good Evening";
  if (hour < 12) message = "Good Morning";
  else if (hour < 18) message = "Good Afternoon";

  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">{message}, Dr. John 👋</h1>
        <p className="text-gray-500">Here’s your dashboard overview</p>
      </div>

      <img
        src={avatar}
        alt="doctor"
        className="w-12 h-12 rounded-full object-cover border"
      />
    </div>
  );
};

export default Greeting;