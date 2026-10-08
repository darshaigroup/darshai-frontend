import {test,expect} from "../fixtures/auth.fixture";
import {dashboardRoutes} from "../fixtures/routes";

test.describe("Patient Dashboard",()=>{

  for(const route of dashboardRoutes.patient){
    test(
      `patient route works: ${route}`,
      async({patientPage})=>{
        test.skip(
          !patientPage,
          "PW_PATIENT_EMAIL and PW_PATIENT_PASSWORD are not configured"
        );

        await patientPage.goto(route);

        await expect(
          patientPage.locator("body")
        ).toBeVisible();

        await expect(
          patientPage
        ).not.toHaveURL(/\/login$/);
      }
    );
  }
});