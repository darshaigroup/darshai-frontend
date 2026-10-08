import {test,expect} from "@playwright/test";
import {publicAuditRoutes} from "../fixtures/routes";
import {assertNoHorizontalOverflow} from "../utils/audit";

const viewports=[
  {
    name:"desktop",
    width:1440,
    height:900
  },
  {
    name:"laptop",
    width:1280,
    height:800
  },
  {
    name:"tablet",
    width:768,
    height:1024
  },
  {
    name:"mobile",
    width:430,
    height:932
  },
  {
    name:"small-mobile",
    width:390,
    height:844
  },
  {
    name:"tiny-mobile",
    width:360,
    height:800
  }
];

for(const viewport of viewports){
  for(const route of publicAuditRoutes){
    test(
      `responsive ${viewport.name}: ${route}`,
      async({page})=>{
        await page.setViewportSize({
          width:viewport.width,
          height:viewport.height
        });

        await page.goto(route,{
          waitUntil:"domcontentloaded"
        });

        await page.waitForTimeout(700);

        await assertNoHorizontalOverflow(page);

        await expect(
          page.locator("body")
        ).toBeVisible();
      }
    );
  }
}