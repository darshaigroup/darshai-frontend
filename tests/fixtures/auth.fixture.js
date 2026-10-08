import {test as base,expect} from "@playwright/test";

async function loginAs(
  page,
  {email,password,expectedPath}
){
  await page.goto("/login");

  await page
    .getByPlaceholder(
      "wellness@darshai.com"
    )
    .fill(email);

  await page
    .getByPlaceholder(
      "••••••••"
    )
    .fill(password);

  await page.getByRole("button",{
    name:/sign in/i
  }).click();

  await page.waitForURL(
    url=>url.pathname.startsWith(
      expectedPath
    ),
    {
      timeout:15000
    }
  );
}

export const test=base.extend({

  doctorPage:async({browser},use)=>{
    const email=
      process.env.PW_DOCTOR_EMAIL;

    const password=
      process.env.PW_DOCTOR_PASSWORD;

    if(!email||!password){
      await use(null);
      return;
    }

    const context=
      await browser.newContext();

    const page=
      await context.newPage();

    await loginAs(page,{
      email,
      password,
      expectedPath:"/dashboard"
    });

    await use(page);

    await context.close();
  },

  patientPage:async({browser},use)=>{
    const email=
      process.env.PW_PATIENT_EMAIL;

    const password=
      process.env.PW_PATIENT_PASSWORD;

    if(!email||!password){
      await use(null);
      return;
    }

    const context=
      await browser.newContext();

    const page=
      await context.newPage();

    await loginAs(page,{
      email,
      password,
      expectedPath:"/patient-dashboard"
    });

    await use(page);

    await context.close();
  },

  salesPage:async({browser},use)=>{
    const email=
      process.env.PW_SALES_EMAIL;

    const password=
      process.env.PW_SALES_PASSWORD;

    if(!email||!password){
      await use(null);
      return;
    }

    const context=
      await browser.newContext();

    const page=
      await context.newPage();

    await loginAs(page,{
      email,
      password,
      expectedPath:"/sales-dashboard"
    });

    await use(page);

    await context.close();
  },

  hrPage:async({browser},use)=>{
    const email=
      process.env.PW_HR_EMAIL;

    const password=
      process.env.PW_HR_PASSWORD;

    if(!email||!password){
      await use(null);
      return;
    }

    const context=
      await browser.newContext();

    const page=
      await context.newPage();

    await loginAs(page,{
      email,
      password,
      expectedPath:"/hr-dashboard"
    });

    await use(page);

    await context.close();
  }
});

export {expect};