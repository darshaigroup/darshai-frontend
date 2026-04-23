const AddPatientModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">

      <div className="bg-white p-8 rounded-[28px] w-[420px] shadow-xl">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Add New Patient
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Enter the basic information to start the wellness journey.
        </p>

        <input
          placeholder="Full Name"
          className="w-full p-3 border rounded-full mb-4"
        />

        <div className="flex gap-3">
          <input
            placeholder="Date of Birth"
            className="w-full p-3 border rounded-full"
          />
          <input
            placeholder="Phone Number"
            className="w-full p-3 border rounded-full"
          />
        </div>

        <input
          placeholder="Location"
          className="w-full p-3 border rounded-full mt-4"
        />

        <button className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-[#1E3A5F] to-[#3BAA9D] text-white">
          Continue to Schedule
        </button>

      </div>
    </div>
  );
};

export default AddPatientModal;