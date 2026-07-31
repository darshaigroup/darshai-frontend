const BASE_URL = `${import.meta.env.VITE_API_URL}/careers`;

const getError = async (response) => {
  try {
    const error = await response.json();

    return error?.message || "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
};

const getJobs = async () => {
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: "GET",
  });

  if (!response.ok) throw new Error(await getError(response));

  const data = await response.json();

  return data.data;
};

const submitApplication = async (values) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    formData.append(key, value);
  });

  const response = await fetch(`${BASE_URL}/apply`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error(await getError(response));

  return await response.json();
};

const getApplicationStatus = async (id) => {
  const response = await fetch(`${BASE_URL}/status/${id}`);

  if (!response.ok) throw new Error(await getError(response));

  return await response.json();
};

export default {
  getJobs,

  submitApplication,

  getApplicationStatus,
};
