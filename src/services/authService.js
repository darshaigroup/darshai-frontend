import { apiClient } from "../lib/apiClient";

export const sendOtp=async(email)=>{
  try{
    return await apiClient("/api/otp/send",{
      method:"POST",
      body:JSON.stringify({email}),
    });
  }catch(err){
    return {success:false,message:err?.message||"Network error"};
  }
};

export const verifyOtp=async(email,otp)=>{
  try{
    return await apiClient("/api/otp/verify",{
      method:"POST",
      body:JSON.stringify({email,otp}),
    });
  }catch(err){
    return {success:false,message:err?.message||"Network error"};
  }
};

export const registerUser=async(data)=>{
  try{
    const result=await apiClient("/api/auth/register",{
      method:"POST",
      body:JSON.stringify(data),
    });

    if(result.success&&result.token){
      localStorage.setItem("token",result.token);
    }

    return result;
  }catch(err){
    return {success:false,message:err?.message||"Network error"};
  }
};