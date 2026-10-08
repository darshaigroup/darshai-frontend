import fs from "node:fs";

export async function takeFullPageScreenshot(page,name){
  fs.mkdirSync("test-results/screenshots",{recursive:true});

  await page.screenshot({
    path:`test-results/screenshots/${name}.png`,
    fullPage:true
  });
}