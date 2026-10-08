import {test,expect} from "../fixtures/auth.fixture";
import {dashboardRoutes} from "../fixtures/routes";

test.describe("HR Dashboard",()=>{

  for(const route of dashboardRoutes.hr){
    test(
      `HR route works: ${route}`,
      async({hrPage})=>{
        test.skip(
          !hrPage,
          "PW_HR_EMAIL and PW_HR_PASSWORD are not configured"
        );

        await hrPage.goto(route);

        await expect(
          hrPage.locator("body")
        ).toBeVisible();

        await expect(
          hrPage
        ).not.toHaveURL(/\/login$/);
      }
    );
  }
});