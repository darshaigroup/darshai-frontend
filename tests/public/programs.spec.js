import {test,expect} from "@playwright/test";
import {programSlugs} from "../fixtures/routes";

test.describe("DARSHAI Programs",()=>{

  test("program index loads",async({page})=>{
    const response=await page.goto("/program");

    expect(
      response?.status()
    ).toBeLessThan(400);

    await expect(
      page.locator("body")
    ).toBeVisible();
  });

  for(const slug of programSlugs){
    test(
      `program detail loads: ${slug}`,
      async({page})=>{
        const response=await page.goto(
          `/program/${slug}`
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
});