const API_URL=import.meta.env.VITE_API_URL;

const forgotPasswordService={
  sendOtp:async(email)=>{
    const response=await fetch(
      `${API_URL}/api/otp/forgot-password/send`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email}),
      }
    );

    const data=await response.json();

    if(!response.ok)
      throw new Error(data.message||"Unable to send OTP");

    return data;
  },

  verifyOtp:async(email,otp)=>{
    const response=await fetch(
      `${API_URL}/api/otp/forgot-password/verify`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({email,otp}),
      }
    );

    const data=await response.json();

    if(!response.ok)
      throw new Error(data.message||"Unable to verify OTP");

    return data;
  },

  resetPassword:async(token,password)=>{
    const response=await fetch(
      `${API_URL}/api/password/reset`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({token,password}),
      }
    );

    const data=await response.json();

    if(!response.ok)
      throw new Error(data.message||"Unable to reset password");

    return data;
  },
};

export default forgotPasswordService;