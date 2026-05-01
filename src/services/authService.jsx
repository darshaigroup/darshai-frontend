export const sendOtp = async (email) => {
  return { success: true }; // replace with API
};

export const verifyOtp = async (email, code) => {
  return { success: code === "123456" }; // replace with API
};