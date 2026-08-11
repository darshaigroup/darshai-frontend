const API_URL = import.meta.env.VITE_API_URL;

/* =========================
   SAVE MATRIX
========================= */

export const saveLifestyleMatrix = async (payload) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/lifestyle-matrix`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to save lifestyle matrix");
  }

  return result.data;
};

/* =========================
   GET MATRIX
========================= */

export const getLifestyleMatrix = async (patientId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/lifestyle-matrix/${patientId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch lifestyle matrix");
  }

  return result.data;
};