const API_URL =
  import.meta.env.VITE_API_URL;

export const generateAyurvedaReport =
  async (payload) => {

    try {

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

          `${API_URL}/api/ayurveda/submit`,

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

          "Ayurveda assessment submission failed"

        );

      }

      return data;

    } catch (error) {

      console.error(

        "AYURVEDA ERROR:",

        error

      );

      throw error;

    }

  };