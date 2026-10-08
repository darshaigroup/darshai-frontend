import {test,expect} from "@playwright/test";
import {protectedRoutes} from "../fixtures/routes";

for(const item of protectedRoutes){
  test(
    `unauthenticated access: ${item.route} -> ${item.redirect}`,
    async({page})=>{
      await page.goto(item.route);

      await expect(page).toHaveURL(
        new RegExp(
          `${item.redirect.replace("/","\\/")}$`
        )
      );
    }
  );
}