import {test,expect} from "@playwright/test";

test.describe("DARSHAI Homepage",()=>{

  test.beforeEach(async({page})=>{
    await page.goto("/",{
      waitUntil:"domcontentloaded"
    });
  });

  test("renders the homepage",async({page})=>{
    await expect(
      page.locator("body")
    ).toBeVisible();

    await expect(
      page.locator("h1").first()
    ).toBeVisible();
  });

  test("contains the main journey CTA",async({page})=>{
    await expect(
      page.locator(
        'a[href="/begin-your-journey"]'
      ).first()
    ).toBeVisible();
  });

  test("contains Geo-Wellness navigation",async({page})=>{
    await expect(
      page.locator(
        'a[href="/geo-wellness-centres"]'
      ).first()
    ).toBeVisible();
  });

  test("homepage can scroll through the full document",async({page})=>{
    const initialHeight=await page.evaluate(
      ()=>document.body.scrollHeight
    );

    await page.evaluate(()=>
      window.scrollTo({
        top:document.body.scrollHeight,
        behavior:"instant"
      })
    );

    await page.waitForTimeout(500);

    const scrollY=await page.evaluate(
      ()=>window.scrollY
    );

    expect(initialHeight).toBeGreaterThan(0);
    expect(scrollY).toBeGreaterThan(0);
  });
});