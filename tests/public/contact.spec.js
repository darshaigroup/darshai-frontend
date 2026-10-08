import {test,expect} from "@playwright/test";
import {testData} from "../fixtures/test-data";

test.describe("DARSHAI Contact",()=>{

  test.beforeEach(async({page})=>{
    await page.goto("/contact",{
      waitUntil:"domcontentloaded"
    });
  });

  test("contact form renders",async({page})=>{
    await expect(
      page.getByPlaceholder("Full Name")
    ).toBeVisible();

    await expect(
      page.getByPlaceholder("Email ")
    ).toBeVisible();

    await expect(
      page.getByPlaceholder("+91 9876543210")
    ).toBeVisible();

    await expect(
      page.getByPlaceholder("City,State")
    ).toBeVisible();

    await expect(
      page.getByText(
        "Select Interest",
        {exact:true}
      )
    ).toBeVisible();

    await expect(
      page.getByPlaceholder(
        "Describe your requirement..."
      )
    ).toBeVisible();
  });

  test(
    "required browser validation blocks an empty submission",
    async({page})=>{
      const name=page.getByPlaceholder(
        "Full Name"
      );

      await page.getByRole("button",{
        name:/send inquiry/i
      }).click();

      await expect(name).toHaveJSProperty(
        "validity",
        expect.objectContaining({
          valid:false
        })
      );
    }
  );

  test(
    "submits the expected contact payload",
    async({page})=>{
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

      await page
        .getByPlaceholder("Full Name")
        .fill(testData.contact.name);

      await page
        .getByPlaceholder("Email ")
        .fill(testData.contact.email);

      await page
        .getByPlaceholder("+91 9876543210")
        .fill(testData.contact.phone);

      await page
        .getByPlaceholder("City,State")
        .fill(testData.contact.location);

      await page
        .getByRole("combobox")
        .selectOption({
          label:testData.contact.interest
        });

      await page
        .getByPlaceholder(
          "Describe your requirement..."
        )
        .fill(testData.contact.message);

      await page.getByRole("button",{
        name:/send inquiry/i
      }).click();

      await expect(
        page.getByText(
          "Inquiry submitted successfully!"
        )
      ).toBeVisible();

      expect(requestBody).toEqual({
        name:testData.contact.name,
        email:testData.contact.email,
        phone:testData.contact.phone,
        location:testData.contact.location,
        interest:testData.contact.interest,
        message:testData.contact.message
      });
    }
  );
});