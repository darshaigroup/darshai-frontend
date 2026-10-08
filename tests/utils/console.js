export function captureConsoleErrors(page){
  const errors=[];

  page.on("console",message=>{
    if(message.type()==="error"){
      errors.push({
        type:"console",
        message:message.text()
      });
    }
  });

  page.on("pageerror",error=>{
    errors.push({
      type:"pageerror",
      message:error.message
    });
  });

  return errors;
}