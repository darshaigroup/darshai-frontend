import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {publicAuditRoutes} from "../fixtures/routes";

for(const route of publicAuditRoutes){
  test(`accessibility audit: ${route}`,async({page})=>{
    await page.goto(route,{
      waitUntil:"domcontentloaded"
    });

    await page.waitForTimeout(500);

    const results=await new AxeBuilder({
      page
    }).analyze();

    expect(
      results.violations,
      `Accessibility violations on ${route}\n${JSON.stringify(results.violations,null,2)}`
    ).toEqual([]);
  });
}