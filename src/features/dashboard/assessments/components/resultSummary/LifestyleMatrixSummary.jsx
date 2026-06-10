import {ChevronRight} from "lucide-react";

import {lifestyleMatrixSections,} from "../../data/lifestyleMatrixData";

const LifeStyleMatrixSummary = ({lifestyleMatrixReport}) => {
  const answers =
    lifestyleMatrixReport?.matrix_answers ||
    {};

  if (
    !Object.keys(
      answers
    ).length
  ) {

    return (

      <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

        <h2 className="text-2xl font-bold mb-6">
          Lifestyle Matrix
        </h2>

        <div className="text-slate-500">
          No lifestyle matrix data available
        </div>

      </div>

    );

  }

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-[#46C18D]/10 flex items-center justify-center">

          <ChevronRight
            size={22}
            className="text-[#46C18D]"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-[#173C68]">
            Lifestyle Matrix Summary
          </h2>

          <p className="text-slate-500 text-sm">
            Wellness preferences and retreat profile
          </p>

        </div>

      </div>

      <div className="space-y-8">

        {lifestyleMatrixSections.map(
          (section) => (

            <div
              key={section.id}
            >

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-lg font-semibold text-[#173C68]">

                  {section.title}

                </h3>

                <span className="text-xs px-3 py-1 rounded-full bg-[#46C18D]/10 text-[#46C18D]">

                  {
                    section.questions.filter(
                      (question) =>
                        answers[
                          question.id
                        ]
                    ).length
                  }
                  /
                  {
                    section.questions.length
                  }

                </span>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                {section.questions.map(
                  (question) => (

                    <div
                      key={question.id}
                      className="rounded-[24px] border border-[#46C18D]/15 bg-gradient-to-br from-[#F8FFFC] to-[#ECFFF7] p-5"
                    >

                      <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">

                        {question.question}

                      </div>

                      <div className="font-semibold text-[#173C68]">

                        {
                          answers[
                            question.id
                          ] || "-"
                        }

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

};

export default LifeStyleMatrixSummary;