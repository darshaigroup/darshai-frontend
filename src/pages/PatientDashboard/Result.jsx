import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export default function Result() {
  const { state } = useLocation();
  const { patient, answers } = state || {};

  //  AUTO SCORE CALCULATION
  const scores = useMemo(() => {
    let vata = 0;
    let pitta = 0;
    let kapha = 0;

    Object.entries(answers || {}).forEach(([key, value]) => {
      if (value === "Yes") {
        const index = parseInt(key.split("-")[1]);

        if (index === 0) vata++;
        if (index === 1) pitta++;
        if (index === 2) kapha++;
      }
    });

    return { vata, pitta, kapha };
  }, [answers]);

  const total = scores.vata + scores.pitta + scores.kapha || 1;

  const percent = (val) => Math.round((val / total) * 100);

  const getDominant = () => {
    const max = Math.max(scores.vata, scores.pitta, scores.kapha);

    if (max === scores.vata) return "Vata";
    if (max === scores.pitta) return "Pitta";
    return "Kapha";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
          Assessment Result
        </h1>

        {/* Patient */}
        <p className="text-center mb-4 text-gray-600">
          Patient: {patient?.name}
        </p>

        {/* Dominant Dosha */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold">
            Dominant Dosha:
          </h2>
          <p className="text-2xl font-bold text-green-700">
            {getDominant()}
          </p>
        </div>

        {/* SCORE BARS */}
        <div className="space-y-4">

          {/* VATA */}
          <div>
            <p className="flex justify-between">
              <span>Vata</span>
              <span>{percent(scores.vata)}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${percent(scores.vata)}%` }}
              />
            </div>
          </div>

          {/* PITTA */}
          <div>
            <p className="flex justify-between">
              <span>Pitta</span>
              <span>{percent(scores.pitta)}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{ width: `${percent(scores.pitta)}%` }}
              />
            </div>
          </div>

          {/* KAPHA */}
          <div>
            <p className="flex justify-between">
              <span>Kapha</span>
              <span>{percent(scores.kapha)}%</span>
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-green-600 h-4 rounded-full"
                style={{ width: `${percent(scores.kapha)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Insight */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-2">Insight</h3>
          <p>
            Your body constitution is primarily <strong>{getDominant()}</strong>.
            This helps guide lifestyle, diet, and treatment recommendations.
          </p>
        </div>

      </div>
    </div>
  );
}