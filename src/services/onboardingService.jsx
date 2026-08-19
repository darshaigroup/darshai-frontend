// import { api } from "./service";

// export const saveLifestyleMatrix=async(matrix_answers)=>{

//   return await api("/api/lifestyle-matrix",{
//     method:"POST",
//     body:JSON.stringify({
//       matrix_answers,
//     }),
//   });

// };

// export const getLifestyleMatrix=async()=>{

//   return await api("/api/lifestyle-matrix");

// };

import { apiClient } from "../lib/apiClient";

export const saveLifestyleMatrix=async(matrix_answers)=>{
  return apiClient("/api/lifestyle-matrix",{
    method:"POST",
    body:JSON.stringify({matrix_answers}),
  });
};

export const getLifestyleMatrix=async()=>{
  return apiClient("/api/lifestyle-matrix");
};