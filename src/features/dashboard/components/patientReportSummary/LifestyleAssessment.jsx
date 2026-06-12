import {Leaf} from "lucide-react";

const LifestyleAssessment = ({patient}) => {

  const answers =
    patient?.matrix_answers || {};

  return (

    <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-[#46C18D]/10 flex items-center justify-center">

          <Leaf
            size={22}
            className="text-[#46C18D]"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-[#173C68]">

            Lifestyle Assessment

          </h2>

          <p className="text-slate-500">

            Wellness Preferences & Lifestyle Profile

          </p>

        </div>

      </div>

      {

        Object.keys(
          answers
        ).length === 0 ? (

          <div className="text-center py-10 text-slate-500">

            No Lifestyle Assessment Available

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {

              Object.entries(
                answers
              ).map(
                ([key,value]) => (

                  <div
                    key={key}
                    className="rounded-[24px] border border-[#46C18D]/15 bg-gradient-to-br from-[#F8FFFC] to-[#ECFFF7] p-5"
                  >

                    <div className="text-xs uppercase tracking-wide text-slate-500 mb-2 break-words">

                      {key.replaceAll("_"," ")}

                    </div>

                    <div className="font-semibold text-[#173C68] break-words">

                      {

                        Array.isArray(
                          value
                        )
                          ? value.join(", ")
                          : String(value)

                      }

                    </div>

                  </div>

                )
              )

            }

          </div>

        )

      }

    </div>

  );

};

export default LifestyleAssessment;