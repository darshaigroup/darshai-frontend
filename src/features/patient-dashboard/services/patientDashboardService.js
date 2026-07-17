const API_URL = import.meta.env.VITE_API_URL;

const request = async endpoint => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok)
    throw new Error(result.message || "Request failed");

  return result;
};

export const getMyProfile = () =>
  request("/api/patients/profile");

export const getMyReport = () =>
  request("/api/reports/patient-report");

export const getMyAssessment = () =>
  request("/api/assessments/my-assessment");

export const getAssessmentProgress = patientId =>
  request(`/api/reports/${patientId}/progress`);