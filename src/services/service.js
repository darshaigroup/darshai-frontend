const API_URL=import.meta.env.VITE_API_URL||"http://localhost:5000";

export const api=async(url,options={})=>{

  const token=localStorage.getItem("token");

  const res=await fetch(`${API_URL}${url}`,{
    headers:{
      "Content-Type":"application/json",
      ...(token&&{
        Authorization:`Bearer ${token}`
      }),
      ...options.headers,
    },
    ...options,
  });

  return await res.json();

};