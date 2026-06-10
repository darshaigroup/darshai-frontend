const API_URL = import.meta.env.VITE_API_URL;

/* =========================
   GET SIGNATURES
========================= */

export const getSignatures = async () => {
  const response = await fetch(
    `${API_URL}/api/practitioner/signatures`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};

/* =========================
   SAVE NOTES
========================= */

export const savePractitionerNotes = async (
  payload
) => {
  const response = await fetch(
    `${API_URL}/api/practitioner/clinical-notes`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify(payload),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};

/* =========================
   GET PATIENT NOTES
========================= */

export const getPatientNotes = async (
  patientId
) => {
  const response = await fetch(
    `${API_URL}/api/practitioner/clinical-notes/${patientId}`
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result.data;
};