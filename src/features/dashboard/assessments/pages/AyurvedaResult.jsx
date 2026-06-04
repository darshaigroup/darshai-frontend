import {
  useLocation,
} from "react-router-dom";

const AyurvedaResult =
  () => {

    const location =
      useLocation();

    const report =
      location.state?.report;

    if (!report) {

      return (

        <div className="p-10 text-center">

          No Ayurveda Report Found

        </div>

      );

    }

    return (

      <div className="max-w-7xl mx-auto p-8 space-y-8">

        {/* HEADER */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h1 className="text-4xl font-bold text-slate-800">

            Ayurveda Assessment Report

          </h1>

          <p className="text-gray-500 mt-3">

            {report.patient_name}

          </p>

        </div>

        {/* PRAKRITI */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Prakriti

          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <Card
              title="Vata"
              value={`${report.prakriti.vata_pct}%`}
            />

            <Card
              title="Pitta"
              value={`${report.prakriti.pitta_pct}%`}
            />

            <Card
              title="Kapha"
              value={`${report.prakriti.kapha_pct}%`}
            />

            <Card
              title="Type"
              value={
                report.prakriti
                  .prakriti_type
              }
            />

          </div>

        </div>

        {/* VIKRITI */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Vikriti

          </h2>

          <div className="space-y-4">

            {Object.entries(
              report.vikriti
                .deviations
            ).map(
              (
                [
                  dosha,
                  item,
                ]
              ) => (

                <div
                  key={dosha}
                  className="border rounded-xl p-4"
                >

                  <h3 className="font-bold">

                    {dosha}

                  </h3>

                  <p>
                    Baseline:
                    {" "}
                    {
                      item.baseline
                    }
                    %
                  </p>

                  <p>
                    Current:
                    {" "}
                    {
                      item.current
                    }
                    %
                  </p>

                  <p>
                    Delta:
                    {" "}
                    {
                      item.delta
                    }
                    %
                  </p>

                  <p>
                    Level:
                    {" "}
                    {
                      item.level
                    }
                  </p>

                </div>

              )
            )}

          </div>

        </div>

        {/* AGNI */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Agni

          </h2>

          <div className="space-y-3">

            <p>

              Type:
              {" "}
              {report.agni.agni_type}

            </p>

            <p>

              Linked Dosha:
              {" "}
              {
                report.agni
                  .linked_dosha
              }

            </p>

            <p>

              {
                report.agni
                  .clinical_meaning
              }

            </p>

          </div>

        </div>

        {/* AMA */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Ama

          </h2>

          <div className="space-y-3">

            <p>

              Severity:
              {" "}
              {
                report.ama
                  .severity
              }

            </p>

            <p>

              Score:
              {" "}
              {
                report.ama
                  .raw_score
              }
              /
              {
                report.ama
                  .max_score
              }

            </p>

            <p>

              Percentage:
              {" "}
              {
                report.ama
                  .percentage
              }
              %

            </p>

          </div>

        </div>

        {/* CLINICAL SUMMARY */}

        <div className="bg-white rounded-[32px] shadow-xl p-8">

          <h2 className="text-2xl font-bold mb-6">

            Clinical Summary

          </h2>

          <p>

            {
              report.clinical_summary
            }

          </p>

          <p className="mt-4">

            Risk Tier:
            {" "}
            <strong>

              {
                report.risk_tier
              }

            </strong>

          </p>

        </div>

      </div>

    );

};

const Card = ({
  title,
  value,
}) => (

  <div className="border rounded-xl p-5">

    <p className="text-gray-500">

      {title}

    </p>

    <p className="text-2xl font-bold">

      {value}

    </p>

  </div>

);

export default AyurvedaResult;