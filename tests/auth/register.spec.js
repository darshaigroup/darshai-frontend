import {test,expect} from "@playwright/test";

test.describe("Authentication - Register",()=>{

  test.beforeEach(async({page})=>{
    await page.goto("/register",{
      waitUntil:"domcontentloaded"
    });

    await page.evaluate(()=>{
      localStorage.clear();
    });
  });

  test("register page renders",async({page})=>{
    await expect(
      page.getByText("Join the Elite")
    ).toBeVisible();

    await expect(
      page.getByText(
        "Register to join our exclusive waitlist"
      )
    ).toBeVisible();
  });

  test(
    "registration fields are available",
    async({page})=>{
      await expect(
        page.getByText("FULL NAME")
      ).toBeVisible();

      await expect(
        page.getByText("PHONE NUMBER")
      ).toBeVisible();

      await expect(
        page.getByText("CURRENT OCCUPATION")
      ).toBeVisible();

      await expect(
        page.getByText("LOCATION")
      ).toBeVisible();

      await expect(
        page.getByText("EMAIL ADDRESS")
      ).toBeVisible();
    }
  );

  test("privacy checkbox exists",async({page})=>{
    await expect(
      page.locator("#agree")
    ).toBeVisible();
  });

  test("privacy policy link exists",async({page})=>{
    await expect(
      page.getByRole("link",{
        name:/privacy policy/i
      })
    ).toBeVisible();
  });

  test("login link works",async({page})=>{
    await page.getByRole("link",{
      name:/login/i
    }).click();

    await expect(page).toHaveURL(
      /\/login$/
    );
  });
});