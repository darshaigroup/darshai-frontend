import {test,expect} from "@playwright/test";

test(
  "Begin Your Journey route opens the current registration flow",
  async({page})=>{
    await page.goto(
      "/begin-your-journey"
    );

    await expect(page).toHaveURL(
      /\/begin-your-journey$/
    );

    await expect(
      page.getByText("Join the Elite")
    ).toBeVisible();
  }
);