const API_URL =
  import.meta.env.VITE_API_URL;

export const submitAssessment =
  async (payload) => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const response =
        await fetch(
          `${API_URL}/api/assessments/submit`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              payload
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.message ||
          "Assessment submission failed"
        );
      }

      return data;

    } catch (error) {

      console.error(
        "ASSESSMENT ERROR:",
        error
      );

      throw error;
    }
};