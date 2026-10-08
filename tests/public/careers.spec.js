import {test,expect} from "@playwright/test";

test.describe("DARSHAI Careers",()=>{

  test("careers page loads",async({page})=>{
    const response=await page.goto(
      "/careers"
    );

    expect(
      response?.status()
    ).toBeLessThan(400);

    await expect(
      page.locator("body")
    ).toBeVisible();
  });

  test(
    "career application section contains form controls",
    async({page})=>{
      await page.goto("/careers");

      expect(
        await page
          .locator("input, textarea, select")
          .count()
      ).toBeGreaterThan(0);
    }
  );

  test(
    "career page can reach the application area",
    async({page})=>{
      await page.goto("/careers");

      const forms=page.locator("form");

      if(await forms.count()>0){
        await forms
          .first()
          .scrollIntoViewIfNeeded();

        await expect(
          forms.first()
        ).toBeVisible();
      }else{
        await page.evaluate(()=>
          window.scrollTo({
            top:document.body.scrollHeight,
            behavior:"instant"
          })
        );

        expect(
          await page.evaluate(
            ()=>window.scrollY
          )
        ).toBeGreaterThan(0);
      }
    }
  );
});