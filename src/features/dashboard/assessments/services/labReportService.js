const API_URL =
  import.meta.env.VITE_API_URL;

/* =========================
   UPLOAD LAB REPORT
========================= */

export const uploadLabReport = async (
  patientId,
  file
) => {

  if (
    file.type !==
    "application/pdf"
  ) {
    throw new Error(
      "Only PDF files are allowed"
    );
  }

  if (
    file.size >
    1024 * 1024
  ) {
    throw new Error(
      "File size must be less than 1 MB"
    );
  }

  const formData =
    new FormData();

  formData.append(
    "patient_id",
    patientId
  );

  formData.append(
    "report",
    file
  );

  const response =
    await fetch(
      `${API_URL}/api/lab-reports/upload`,
      {
        method: "POST",
        body: formData,
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
   GET PATIENT REPORTS
========================= */

export const getPatientReports =
  async (patientId) => {

    const response =
      await fetch(
        `${API_URL}/api/lab-reports/patient/${patientId}`
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
   DELETE REPORT
========================= */

export const deleteLabReport =
  async (reportId) => {

    const response =
      await fetch(
        `${API_URL}/api/lab-reports/${reportId}`,
        {
          method: "DELETE",
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