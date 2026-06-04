const QuestionCard = ({
  question,
  children,
}) => {

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8">

      <h2 className="text-2xl font-bold text-slate-800 mb-8">
        {question}
      </h2>

      {children}

    </div>
  );
};

export default QuestionCard;