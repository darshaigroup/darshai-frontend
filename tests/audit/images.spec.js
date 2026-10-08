import {test,expect} from "@playwright/test";
import {publicAuditRoutes} from "../fixtures/routes";
import {
  getBrokenImages,
  getImagesMissingAlt
} from "../utils/audit";

for(const route of publicAuditRoutes){
  test(`image audit: ${route}`,async({page})=>{
    await page.goto(route,{
      waitUntil:"domcontentloaded"
    });

    await page.waitForTimeout(1000);

    const brokenImages=await getBrokenImages(page);
    const missingAlt=await getImagesMissingAlt(page);

    expect(
      brokenImages,
      `Broken images on ${route}\n${JSON.stringify(brokenImages,null,2)}`
    ).toEqual([]);

    expect(
      missingAlt,
      `Images without alt attributes on ${route}\n${JSON.stringify(missingAlt,null,2)}`
    ).toEqual([]);
  });
}