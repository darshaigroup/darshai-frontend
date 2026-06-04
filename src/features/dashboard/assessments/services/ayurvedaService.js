const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const generateAyurvedaReport =
  async ({
    patientName,
    prakritiAnswers,
    vikritiAnswers,
    agniAnswers,
    amaAnswers,
  }) => {

    const response =
      await fetch(
        `${API_BASE_URL}/assess/full`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            patient_name:
              patientName,

            prakriti_answers:
              prakritiAnswers,

            vikriti_answers:
              vikritiAnswers,

            agni_answers:
              agniAnswers,

            ama_answers:
              amaAnswers,

          }),
        }
      );

    if (!response.ok) {

      const error =
        await response.json();

      throw new Error(
        error.detail ||
          "Failed to generate report"
      );

    }

    return response.json();

  };