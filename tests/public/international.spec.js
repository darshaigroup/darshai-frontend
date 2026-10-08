import {test,expect} from "@playwright/test";
import {testData} from "../fixtures/test-data";

async function fillInternationalForm(page){
  await page
    .getByPlaceholder("e.g. Alistair Sterling")
    .fill(testData.international.name);

  await page
    .getByPlaceholder("e.g. alistair@example.com")
    .fill(testData.international.email);

  await page
    .getByPlaceholder("98765 43210")
    .fill(testData.international.phone);

  await page
    .getByPlaceholder(
      "Share any questions, preferred dates, or personal preferences..."
    )
    .fill(testData.international.message);
}

test.describe("International Wellness",()=>{

  test("international page loads",async({page})=>{
    const response=await page.goto(
      "/international-wellness-india"
    );

    expect(
      response?.status()
    ).toBeLessThan(400);

    await expect(
      page.locator("body")
    ).toBeVisible();
  });

  test("concierge form exposes required fields",async({page})=>{
    await page.goto(
      "/international-wellness-india"
    );

    await expect(
      page.getByPlaceholder(
        "e.g. Alistair Sterling"
      )
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "e.g. alistair@example.com"
      )
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "98765 43210"
      )
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "Select your country..."
      )
    ).toBeVisible();

    await expect(
      page.getByText(
        "WHAT ARE YOU INTERESTED IN? *",
        {exact:true}
      )
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "Share any questions, preferred dates, or personal preferences..."
      )
    ).toBeVisible();
  });

  test(
    "required field validation prevents empty submission",
    async({page})=>{
      await page.goto(
        "/international-wellness-india"
      );

      const name=page.getByPlaceholder(
        "e.g. Alistair Sterling"
      );

      await page.getByRole("button",{
        name:/start your journey/i
      }).click();

      await expect(name).toHaveJSProperty(
        "validity",
        expect.objectContaining({
          valid:false
        })
      );
    }
  );

  test("submits the expected API payload",async({page})=>{
    let requestBody=null;

    await page.route(
      "**/api/query/create",
      async route=>{
        requestBody=route
          .request()
          .postDataJSON();

        await route.fulfill({
          status:200,
          contentType:"application/json",
          body:JSON.stringify({
            success:true,
            message:"Inquiry submitted successfully!"
          })
        });
      }
    );

    await page.goto(
      "/international-wellness-india"
    );

    await fillInternationalForm(page);

    await page.getByRole("button",{
      name:/start your journey/i
    }).click();

    await expect(
      page.getByText(
        "Your Journey Request Has Been Received."
      )
    ).toBeVisible();

    expect(requestBody).toEqual({
      name:testData.international.name,
      email:testData.international.email,
      phone:expect.stringMatching(
        /^\+\d+$/
      ),
      location:"India",
      interest:"Executive Wellness",
      message:testData.international.message
    });
  });

  test(
    "shows backend error without crashing the page",
    async({page})=>{
      await page.route(
        "**/api/query/create",
        async route=>{
          await route.fulfill({
            status:500,
            contentType:"application/json",
            body:JSON.stringify({
              message:"Server unavailable"
            })
          });
        }
      );

      await page.goto(
        "/international-wellness-india"
      );

      await fillInternationalForm(page);

      await page.getByRole("button",{
        name:/start your journey/i
      }).click();

      await expect(
        page.getByText("Server unavailable")
      ).toBeVisible();

      await expect(
        page.locator("body")
      ).toBeVisible();
    }
  );
});