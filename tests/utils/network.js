const IGNORED_PATHS=[
  "/favicon.ico"
];

export function captureFailedRequests(page){
  const failures=[];

  page.on("response",response=>{
    const status=response.status();
    const url=response.url();

    if(
      status>=400&&
      !IGNORED_PATHS.some(path=>url.endsWith(path))
    ){
      failures.push({
        type:"response",
        url,
        status,
        method:response.request().method()
      });
    }
  });

  page.on("requestfailed",request=>{
    const url=request.url();

    if(!IGNORED_PATHS.some(path=>url.endsWith(path))){
      failures.push({
        type:"requestfailed",
        url,
        status:"REQUEST_FAILED",
        method:request.method(),
        error:request.failure()?.errorText||"Unknown network failure"
      });
    }
  });

  return failures;
}