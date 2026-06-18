const QuestionnaireHeader = () => {
  return (
    <div className="flex justify-between items-start">

      <div>
        <h1 className="text-3xl font-semibold text-[#1E3A5F]">
          Clinical Questionnaires
        </h1>
        <p className="text-gray-500 text-sm">
          Assign standardized assessments to your patients
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-5 py-2 rounded-full bg-[#8DC63F] text-white shadow">
          + Add Patients
        </button>

        <button className="px-5 py-2 rounded-full border">
          Questionnaires
        </button>

       
      </div>

    </div>
  );
};

export default QuestionnaireHeader;