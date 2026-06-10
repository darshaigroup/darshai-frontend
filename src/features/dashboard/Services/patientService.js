const API_URL =
  import.meta.env.VITE_API_URL;

/* =========================
   GET ALL PATIENTS
========================= */

export const getPatients =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${API_URL}/api/patients`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const result =
      await response.json();

    // console.log(
    //   "PATIENT RESPONSE:",
    //   result
    // );

    if (!response.ok) {

      throw new Error(
        result.message ||
        "Failed to fetch patients"
      );

    }

    return result.patients || [];

  };

/* =========================
   GET PATIENT BY ID
========================= */

export const getPatientById =
  async (patientId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${API_URL}/api/patients/${patientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    const result =
      await response.json();

    console.log(
      "PATIENT DETAIL RESPONSE:",
      result
    );

    if (!response.ok) {

      throw new Error(
        result.message ||
        "Failed to fetch patient"
      );

    }

    return (
      result.patient ||
      result.data ||
      null
    );

  };