import {http,HttpResponse} from "msw";

export const handlers=[
  http.post("http://localhost:5000/api/query/create",async()=>{
    return HttpResponse.json({
      success:true,
      message:"Inquiry submitted successfully!"
    });
  })
];