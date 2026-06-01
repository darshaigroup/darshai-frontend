const API_URL =
  import.meta.env.VITE_API_URL;

export const submitAssessment =
  async (payload) => {

    try {

      console.log(
        "submitAssessment() called"
      );

      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {

        throw new Error(
          "No token found"
        );
      }

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

      console.log(
        "API Response Status:",
        response.status
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