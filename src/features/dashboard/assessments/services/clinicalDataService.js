const API_URL =
  import.meta.env.VITE_API_URL;

export const submitClinicalData =
  async (payload) => {

    const token =
      localStorage.getItem(
        "token"
      );

    const response =
      await fetch(
        `${API_URL}/api/clinical/submit`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      throw new Error(
        data.message
      );

    }

    return data;

};