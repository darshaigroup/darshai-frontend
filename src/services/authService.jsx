const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

console.log("API URL:", API_URL);

/* SEND OTP */
export const sendOtp = async (email) => {
  try {
    const res = await fetch(`${API_URL}/api/otp/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      return { success: false, message: "Server error" };
    }

    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: "Network error" };
  }
};

/* VERIFY OTP */
export const verifyOtp = async (email, otp) => {
  try {
    const res = await fetch(`${API_URL}/api/otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        otp,
      }),
    });

    return await res.json();
  } catch (err) {
    return { success: false, message: "Network error" };
  }
};

/* REGISTER USER */
export const registerUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Error" };
    }

    return result;
  } catch (err) {
    return { success: false, message: "Network error" };
  }
};
