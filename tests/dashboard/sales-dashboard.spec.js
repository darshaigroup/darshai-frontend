import {test,expect} from "../fixtures/auth.fixture";
import {dashboardRoutes} from "../fixtures/routes";

test.describe("Sales Dashboard",()=>{

  for(const route of dashboardRoutes.sales){
    test(
      `sales route works: ${route}`,
      async({salesPage})=>{
        test.skip(
          !salesPage,
          "PW_SALES_EMAIL and PW_SALES_PASSWORD are not configured"
        );

        await salesPage.goto(route);

        await expect(
          salesPage.locator("body")
        ).toBeVisible();

        await expect(
          salesPage
        ).not.toHaveURL(/\/login$/);
      }
    );
  }
});