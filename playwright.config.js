import {defineConfig,devices} from "@playwright/test";

export default defineConfig({
  testDir:"./tests",
  fullyParallel:true,
  timeout:30000,
  expect:{
    timeout:5000
  },
  reporter:[
    ["list"],
    ["html",{outputFolder:"playwright-report",open:"never"}]
  ],
  use:{
    baseURL:process.env.PLAYWRIGHT_BASE_URL||"http://localhost:5173",
    trace:"retain-on-failure",
    screenshot:"only-on-failure",
    video:"retain-on-failure",
    actionTimeout:10000,
    navigationTimeout:30000
  },
  webServer:{
    command:"npm run dev -- --host 0.0.0.0",
    url:process.env.PLAYWRIGHT_BASE_URL||"http://localhost:5173",
    reuseExistingServer:true,
    timeout:120000
  },
  projects:[
    {
      name:"chromium-desktop",
      use:{
        ...devices["Desktop Chrome"],
        viewport:{width:1440,height:900}
      }
    },
    {
      name:"chromium-laptop",
      use:{
        ...devices["Desktop Chrome"],
        viewport:{width:1280,height:800}
      }
    },
    {
      name:"chromium-tablet",
      use:{
        ...devices["iPad Mini"],
        viewport:{width:768,height:1024}
      }
    },
    {
      name:"chromium-mobile",
      use:{
        ...devices["iPhone 13"]
      }
    }
  ]
});