const API_BASE=import.meta.env.VITE_API_URL||"http://localhost:5000";

export const submitEnquiry=async payload=>{
  const response=await fetch(`${API_BASE}/api/client-wellness-enquiries`,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      ...payload,
      phone:payload.phone||null,
      ageBracket:payload.ageBracket||null,
      location:payload.location||null,
      occupation:payload.occupation||null,
      wellnessGoals:payload.wellnessGoals||[],
      otherWellnessGoal:payload.otherWellnessGoal||null,
      currentConcern:payload.currentConcern||null,
      healthContext:payload.healthContext||{},
      lifestyleContext:payload.lifestyleContext||{},
      environmentPreferences:payload.environmentPreferences||[],
      climatePreferences:payload.climatePreferences||[],
      travelPreferences:payload.travelPreferences||{},
      consent:{
        consentToProcess:payload.consent?.consentToProcess===true,
        medicalDisclaimer:payload.consent?.medicalDisclaimer===true,
        informationAccuracy:payload.consent?.informationAccuracy===true,
        recordedAt:payload.consent?.recordedAt||new Date().toISOString()
      }
    })
  });

  const data=await response.json();

  if(!response.ok||!data.success)
    throw new Error(data.message||"Unable to submit enquiry.");

  return data;
};