import {test,expect} from "../fixtures/auth.fixture";
import {dashboardRoutes} from "../fixtures/routes";

test.describe("Doctor Dashboard",()=>{

  for(const route of dashboardRoutes.doctor){
    test(
      `doctor route works: ${route}`,
      async({doctorPage})=>{
        test.skip(
          !doctorPage,
          "PW_DOCTOR_EMAIL and PW_DOCTOR_PASSWORD are not configured"
        );

        await doctorPage.goto(route);

        await expect(
          doctorPage.locator("body")
        ).toBeVisible();

        await expect(
          doctorPage
        ).not.toHaveURL(/\/login$/);
      }
    );
  }
});