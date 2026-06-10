import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
} from "lucide-react";

const LifestyleMatrixResult = () => {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const patient =
    location.state?.patient;

  const report =
    location.state?.report;

  const answers =
    report?.matrix_answers ||
    {};

  const sections = [
    {
      title:
        "Retreat Profile",

      fields: [
        "retreat_for",
        "attendees_count",
        "retreat_goal",
      ],
    },

    {
      title:
        "Wellness Preferences",

      fields: [
        "natural_environment",
        "mind_body_practice",
        "therapeutic_experience",
        "creative_activity",
        "activity_intensity",
        "wellness_learning",
      ],
    },

    {
      title:
        "Food & Lifestyle",

      fields: [
        "food_style",
        "retreat_experience",
        "comfort_level",
        "diet_pattern",
        "meals_per_day",
        "water_intake",
      ],
    },

    {
      title:
        "Environment & Exposure",

      fields: [
        "living_environment",
        "climate_type",
        "terrain_type",
        "sunlight_exposure",
        "pollution_exposure",
        "travel_frequency",
      ],
    },
  ];

  const formatLabel =
    (value) =>
      value
        .replaceAll(
          "_",
          " "
        )
        .replace(
          /\b\w/g,
          (char) =>
            char.toUpperCase()
        );

  return (

    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* HERO */}

      <div className="rounded-[36px] p-10 mb-8 bg-gradient-to-r from-[#03ad20] to-[#0db840] text-white shadow-[0_20px_60px_rgba(83,215,179,0.25)]">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>

            <div className="flex items-center gap-3 mb-4">

              <CheckCircle2
                size={28}
              />

              <span className="font-medium">
                Assessment Completed
              </span>

            </div>

            <h1 className="text-4xl font-bold">

              Lifestyle Matrix Result

            </h1>

            <p className="mt-3 text-white/90">

              Review wellness preferences before proceeding to the Ayurvedic assessment.

            </p>

          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-[28px] px-8 py-5">

            <div className="text-sm text-white/80">

              Responses Captured

            </div>

            <div className="text-4xl font-bold mt-2">

              {Object.keys(
                answers
              ).length}

            </div>

          </div>

        </div>

      </div>

      {/* PATIENT */}

      <div className="bg-white rounded-[32px] shadow-xl p-8 mb-8">

        <div className="flex items-center gap-3 mb-6">

          <User
            size={22}
            className="text-[#46C18D]"
          />

          <h2 className="text-2xl font-bold text-[#173C68]">

            Patient Information

          </h2>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

          <InfoCard
            label="Patient Name"
            value={
              patient?.name
            }
          />

          <InfoCard
            label="Gender"
            value={
              patient?.gender
            }
          />

          <InfoCard
            label="Phone"
            value={
              patient?.phone
            }
          />

          <InfoCard
            label="Location"
            value={
              patient?.location
            }
          />

        </div>

      </div>

      {/* MATRIX DATA */}

      {sections.map(
        (section) => (

          <div
            key={
              section.title
            }
            className="bg-white rounded-[32px] shadow-xl p-8 mb-8"
          >

            <h2 className="text-2xl font-bold text-[#173C68] mb-8">

              {section.title}

            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {section.fields.map(
                (field) => (

                  <div
                    key={field}
                    className="rounded-[28px] p-5 border border-[#46C18D]/20 bg-gradient-to-br from-[#F8FFFC] to-[#ECFFF7]"
                  >

                    <div className="text-sm text-slate-500">

                      {formatLabel(
                        field
                      )}

                    </div>

                    <div className="font-semibold text-lg text-[#173C68] mt-2">

                      {
                        answers[
                          field
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

      {/* ACTIONS */}

      <div className="flex justify-between items-center">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="h-14 px-8 rounded-full border border-[#46C18D]/20 bg-white text-[#173C68] flex items-center gap-2"
        >

          <ArrowLeft
            size={18}
          />

          Back

        </button>

        <button
          onClick={() =>
            navigate(
              "/dashboard/assessments",
              {
                state: {
                  patient,

                  lifestyleMatrix:
                    report,
                },
              }
            )
          }
          className="h-14 px-10 rounded-full bg-gradient-to-r from-[#46C18D] to-[#53D7B3] text-white font-semibold flex items-center gap-2 shadow-[0_15px_40px_rgba(83,215,179,0.35)]"
        >

          Continue Assessment

          <ArrowRight
            size={18}
          />

        </button>

      </div>

    </div>

  );

};

const InfoCard = ({
  label,
  value,
}) => (

  <div className="rounded-[28px] p-5 border border-[#46C18D]/20 bg-gradient-to-br from-[#F8FFFC] to-[#ECFFF7]">

    <div className="text-sm text-slate-500">

      {label}

    </div>

    <div className="font-semibold text-lg text-[#173C68] mt-2">

      {value || "-"}

    </div>

  </div>

);

export default LifestyleMatrixResult;