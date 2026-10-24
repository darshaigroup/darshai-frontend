const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const getToken = () => localStorage.getItem("token");

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API}${endpoint}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (response.status === 401) {
    window.dispatchEvent(
      new CustomEvent("session-expired", {
        detail: {
          message:
            data.message || "Your session has expired. Please login again.",
        },
      }),
    );
    throw new Error("SESSION_EXPIRED");
  }

  if (!response.ok) throw new Error(data.message || "Something went wrong");

  return data.data;
};

export const getEnquiries = () => request("/api/sales/enquiries");

export const searchEnquiries = (search) =>
  request(`/api/sales/enquiries/search?search=${encodeURIComponent(search)}`);

export const getEnquiryDetails = (id) => request(`/api/sales/enquiries/${id}`);

export const updateEnquiryStatus = (id, status) =>
  request(`/api/sales/enquiries/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });

export const updateEnquiryNotes = (id, notes) =>
  request(`/api/sales/enquiries/${id}/notes`, {
    method: "PATCH",
    body: JSON.stringify({ notes }),
  });

export const assignEnquiry = (id, assignedTo) =>
  request(`/api/sales/enquiries/${id}/assign`, {
    method: "PATCH",
    body: JSON.stringify({ assignedTo }),
  });

export const sendRegistrationEmail = (id) =>
  request(`/api/sales/enquiries/${id}/registration-email`, {
    method: "POST",
  });
