import {test,expect} from "@playwright/test";
import {publicAuditRoutes} from "../fixtures/routes";
import {captureConsoleErrors} from "../utils/console";

for(const route of publicAuditRoutes){
  test(`console audit: ${route}`,async({page})=>{
    const errors=captureConsoleErrors(page);

    await page.goto(route,{
      waitUntil:"domcontentloaded"
    });

    await page.waitForTimeout(1000);

    expect(
      errors,
      `JavaScript errors on ${route}\n${JSON.stringify(errors,null,2)}`
    ).toEqual([]);
  });
}