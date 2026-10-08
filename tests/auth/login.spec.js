import {test,expect} from "@playwright/test";
import {testData} from "../fixtures/test-data";

test.describe("Authentication - Login",()=>{

  test.beforeEach(async({page})=>{
    await page.goto("/login");

    await page.evaluate(()=>{
      localStorage.clear();
    });

    await page.reload();
  });

  test("login page renders",async({page})=>{
    await expect(
      page.getByText("Welcome Back")
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "wellness@darshai.com"
      )
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "••••••••"
      )
    ).toBeVisible();

    await expect(
      page.getByRole("button",{
        name:/sign in/i
      })
    ).toBeVisible();
  });

  test(
    "empty login shows validation message",
    async({page})=>{
      await page.getByRole("button",{
        name:/sign in/i
      }).click();

      await expect(
        page.getByText(
          "Email and password required"
        )
      ).toBeVisible();
    }
  );

  test(
    "invalid credentials produce an error instead of a crash",
    async({page})=>{
      await page
        .getByPlaceholder(
          "wellness@darshai.com"
        )
        .fill(testData.login.email);

      await page
        .getByPlaceholder(
          "••••••••"
        )
        .fill(testData.login.password);

      await page.getByRole("button",{
        name:/sign in/i
      }).click();

      await expect(
        page.locator("body")
      ).toContainText(
        /login failed|invalid|error|not found|unauthorized/i
      );
    }
  );

  test("forgot password link works",async({page})=>{
    await page.getByRole("link",{
      name:/forgot password/i
    }).click();

    await expect(page).toHaveURL(
      /\/forgot-password$/
    );
  });

  test("register link works",async({page})=>{
    await page.getByRole("link",{
      name:/register for waitlist/i
    }).click();

    await expect(page).toHaveURL(
      /\/register$/
    );
  });
});