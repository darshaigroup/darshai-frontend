import {test,expect} from "@playwright/test";
import {geoCentreSlugs} from "../fixtures/routes";

test.describe("DARSHAI Geo-Wellness",()=>{

  test("centre directory loads",async({page})=>{
    const response=await page.goto(
      "/geo-wellness-centres"
    );

    expect(
      response?.status()
    ).toBeLessThan(400);

    await expect(
      page.locator("body")
    ).toBeVisible();
  });

  test("centre directory exposes centre links",async({page})=>{
    await page.goto(
      "/geo-wellness-centres"
    );

    const centreLinks=page.locator(
      'a[href^="/geo-wellness-centres/"]'
    );

    await expect(
      centreLinks.first()
    ).toBeVisible();

    expect(
      await centreLinks.count()
    ).toBeGreaterThan(0);
  });

  for(const slug of geoCentreSlugs){
    test(
      `centre detail loads: ${slug}`,
      async({page})=>{
        const response=await page.goto(
          `/geo-wellness-centres/${slug}`
        );

        expect(
          response?.status()
        ).toBeLessThan(400);

        await expect(
          page.locator("body")
        ).toBeVisible();
      }
    );
  }

  test("filters can be interacted with",async({page})=>{
    await page.goto(
      "/geo-wellness-centres"
    );

    const selects=page.locator("select");

    if(await selects.count()>0){
      for(
        let i=0;
        i<await selects.count();
        i++
      ){
        const options=await selects
          .nth(i)
          .locator("option")
          .count();

        expect(options).toBeGreaterThan(0);
      }
    }
  });
});