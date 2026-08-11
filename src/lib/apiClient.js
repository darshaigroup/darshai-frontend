const API_URL=import.meta.env.VITE_API_URL;

export const apiClient=async(endpoint,options={})=>{
  const token=localStorage.getItem("token");
  const response=await fetch(`${API_URL}${endpoint}`,{
    ...options,
    headers:{
      "Content-Type":"application/json",
      ...(token&&{Authorization:`Bearer ${token}`}),
      ...options.headers
    }
  });

  const data=await response.json().catch(()=>({}));

  if(response.status===401){
    window.dispatchEvent(new CustomEvent("session-expired",{
      detail:{message:data?.message||"Your session has expired. Please login again."}
    }));
    throw new Error("SESSION_EXPIRED");
  }

  if(!response.ok) throw new Error(data?.message||"Request failed");
  return data;
};