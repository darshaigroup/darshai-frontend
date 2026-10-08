import {test,expect} from "@playwright/test";

const pages=[
  {
    name:"homepage",
    route:"/"
  },
  {
    name:"story",
    route:"/story"
  },
  {
    name:"program",
    route:"/program"
  },
  {
    name:"geo-wellness",
    route:"/geo-wellness-centres"
  },
  {
    name:"international",
    route:"/international-wellness-india"
  },
  {
    name:"insights",
    route:"/insights"
  },
  {
    name:"contact",
    route:"/contact"
  },
  {
    name:"careers",
    route:"/careers"
  }
];

for(const item of pages){
  test(`visual baseline: ${item.name}`,async({page})=>{
    await page.goto(item.route,{
      waitUntil:"networkidle"
    });

    await expect(page).toHaveScreenshot(
      `${item.name}.png`,
      {
        fullPage:true,
        animations:"disabled"
      }
    );
  });
}