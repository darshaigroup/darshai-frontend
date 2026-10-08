import {test,expect} from "@playwright/test";

test.describe("DARSHAI navigation",()=>{

  test("desktop primary navigation is present",async({page})=>{
    await page.goto("/");

    await expect(
      page.locator('a[href="/"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/story"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/geo-wellness-centres"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/program"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/international-wellness-india"]').first()
    ).toBeVisible();

    await expect(
      page.getByText("INSIGHTS",{exact:true}).first()
    ).toBeVisible();
  });

  test("Begin Journey points to the configured route",async({page})=>{
    await page.goto("/");

    const link=page.locator(
      'a[href="/begin-your-journey"]'
    ).first();

    await expect(link).toBeVisible();

    await link.click();

    await expect(page).toHaveURL(
      /\/begin-your-journey$/
    );
  });

  test("Insights dropdown exposes current links",async({page})=>{
    await page.goto("/");

    await page
      .getByText("INSIGHTS",{exact:true})
      .first()
      .hover();

    await expect(
      page.locator('a[href="/insights"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/explore/journal"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/explore/video"]').first()
    ).toBeVisible();
  });

  test("Contact dropdown exposes contact and careers",async({page})=>{
    await page.goto("/");

    await page
      .getByText("CONTACT",{exact:true})
      .first()
      .hover();

    await expect(
      page.locator('a[href="/contact"]').first()
    ).toBeVisible();

    await expect(
      page.locator('a[href="/careers"]').first()
    ).toBeVisible();
  });

  test("mobile menu opens and exposes navigation",async({page})=>{
    await page.setViewportSize({
      width:390,
      height:844
    });

    await page.goto("/");

    await page
      .getByRole("button",{name:"Open menu"})
      .click();

    await expect(
      page.getByText("NAVIGATION",{exact:true})
    ).toBeVisible();

    await expect(
      page.getByRole("button",{name:"Close menu"})
    ).toBeVisible();

    await expect(
      page.getByText("Home",{exact:true})
    ).toBeVisible();

    await expect(
      page.getByText("Geo-Wellness",{exact:true})
    ).toBeVisible();
  });
});