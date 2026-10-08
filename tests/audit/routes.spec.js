import {test,expect} from "@playwright/test";
import {publicRoutes} from "../fixtures/routes";

for(const route of publicRoutes){
  test(`route loads: ${route}`,async({page})=>{
    const response=await page.goto(route,{
      waitUntil:"domcontentloaded"
    });

    expect(
      response?.status(),
      `${route} returned ${response?.status()}`
    ).toBeLessThan(400);

    await expect(page.locator("body")).toBeVisible();

    const bodyText=(await page.locator("body").innerText()).trim();

    expect(
      bodyText,
      `${route} rendered an empty body`
    ).not.toBe("");
  });
}