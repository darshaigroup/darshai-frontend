const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("refreshToken");
  sessionStorage.clear();
};

const dispatchError = message => {
  window.dispatchEvent(
    new CustomEvent("global-error", {
      detail: { message },
    })
  );
};

const dispatchSessionExpired = message => {
  clearSession();

  window.dispatchEvent(
    new CustomEvent("session-expired", {
      detail: { message },
    })
  );
};

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const result = await response.json().catch(() => ({}));

    if (response.status === 401) {
      dispatchSessionExpired(
        result?.message || "Your session has expired. Please login again."
      );

      throw new Error("SESSION_EXPIRED");
    }

    if (response.status >= 500) {
      const message = "Server error. Please try again later.";

      dispatchError(message);

      const error = new Error(message);
      error.serverError = true;
      error.status = response.status;
      throw error;
    }

    if (!response.ok) {
      const message =
        result?.message ||
        result?.error ||
        "Request failed. Please try again.";

      dispatchError(message);

      const error = new Error(message);
      error.status = response.status;
      throw error;
    }

    return result;
  } catch (error) {
    if (
      error.message === "SESSION_EXPIRED" ||
      error.serverError
    ) {
      throw error;
    }

    if (error.name === "TypeError") {
      const message =
        "Unable to connect to server. Please try again later.";

      dispatchError(message);

      const networkError = new Error(message);
      networkError.networkError = true;
      throw networkError;
    }

    throw error;
  }
};

export default request;