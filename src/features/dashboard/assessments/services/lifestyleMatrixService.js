const API_URL =
  import.meta.env.VITE_API_URL;

/* =========================
   SAVE MATRIX
========================= */

export const saveLifestyleMatrix =
  async (payload) => {

    const response =
      await fetch(
        `${API_URL}/api/lifestyle-matrix`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              payload
            ),
        }
      );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message
      );
    }

    return result.data;

  };

/* =========================
   GET MATRIX
========================= */

export const getLifestyleMatrix =
  async (patientId) => {

    const response =
      await fetch(
        `${API_URL}/api/lifestyle-matrix/${patientId}`
      );

    const result =
      await response.json();

    if (!response.ok) {
      throw new Error(
        result.message
      );
    }

    return result.data;

  };