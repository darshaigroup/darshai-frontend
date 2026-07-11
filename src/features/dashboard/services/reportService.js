const API_URL = import.meta.env.VITE_API_URL;

export const getReportsTable =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${API_URL}/api/reports`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

    const result =
      await response.json();

    // console.log(
    //   "REPORT TABLE:",
    //   result
    // );

    if(!response.ok){

      throw new Error(
        result.message
      );

    }

    return result;

  };

export const getPatientReport =
  async (patientId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${API_URL}/api/reports/${patientId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

    const result =
      await response.json();

    // console.log(
    //   "REPORT DETAIL:",
    //   result
    // );

    if(!response.ok){

      throw new Error(
        result.message
      );

    }

    return result;

  };

 export const getSignatures =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${API_URL}/api/practitioner/signatures`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

    const result =
      await response.json();

    return (
      result.data || []
    );

  };

  export const getPatientSummary =
  async (patientId) => {

    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        `${API_URL}/api/reports/${patientId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

    const result =
      await response.json();

    if(!response.ok){

      throw new Error(
        result.message
      );

    }

    return result;

  };

  export const getAssessmentProgress = async patientId => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/reports/${patientId}/progress`,
    {
      headers:{
        Authorization:`Bearer ${token}`
      }
    }
  );

  const result = await response.json();

  if(!response.ok){
    throw new Error(result.message);
  }

  return result;

};