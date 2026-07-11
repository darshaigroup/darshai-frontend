const API_URL = import.meta.env.VITE_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ==============================
// ADD PATIENT
// ==============================

export const addPatient = async payload => {
  const response = await fetch(`${API_URL}/api/patients/add`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// ==============================
// UPDATE PATIENT
// ==============================

export const updatePatient = async (patientId, payload) => {
  const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

// ==============================
// GET ALL PATIENTS
// ==============================

export const getPatients = async () => {
  const response = await fetch(`${API_URL}/api/patients`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.patients;
};

// ==============================
// GET PATIENT BY ID
// ==============================

export const getPatientById = async patientId => {
  const response = await fetch(`${API_URL}/api/patients/${patientId}`, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data.patient;
};