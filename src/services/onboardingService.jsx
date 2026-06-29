import { api } from "./service";

export const saveLifestyleMatrix=async(matrix_answers)=>{

  return await api("/api/lifestyle-matrix",{
    method:"POST",
    body:JSON.stringify({
      matrix_answers,
    }),
  });

};

export const getLifestyleMatrix=async()=>{

  return await api("/api/lifestyle-matrix");

};