import {test,expect} from "@playwright/test";

const articleSlugs=[
  "future-of-geo-wellness",
  "from-data-to-diagnosis"
];

test.describe("DARSHAI Insights and Explore",()=>{

  test("Insights route loads",async({page})=>{
    const response=await page.goto(
      "/insights"
    );

    expect(
      response?.status()
    ).toBeLessThan(400);

    await expect(
      page.locator("body")
    ).toBeVisible();
  });

  for(const slug of articleSlugs){
    test(
      `Insights article loads: ${slug}`,
      async({page})=>{
        const response=await page.goto(
          `/insights/${slug}`
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

  test("legacy Explore route loads",async({page})=>{
    const response=await page.goto(
      "/explore"
    );

    expect(
      response?.status()
    ).toBeLessThan(400);

    await expect(
      page.locator("body")
    ).toBeVisible();
  });
});