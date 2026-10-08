import {test,expect} from "@playwright/test";
import {publicAuditRoutes} from "../fixtures/routes";
import {captureFailedRequests} from "../utils/network";

for(const route of publicAuditRoutes){
  test(`network audit: ${route}`,async({page})=>{
    const failures=captureFailedRequests(page);

    await page.goto(route,{
      waitUntil:"domcontentloaded"
    });

    await page.waitForTimeout(1500);

    expect(
      failures,
      `Failed requests on ${route}\n${JSON.stringify(failures,null,2)}`
    ).toEqual([]);
  });
}