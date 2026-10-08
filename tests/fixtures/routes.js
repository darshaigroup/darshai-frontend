export const publicRoutes=[
  "/",
  "/philosophy",
  "/story",
  "/contact",
  "/program",
  "/program/executive-reset-protocol",
  "/program/deep-detox-protocol",
  "/program/longevity-healthy-ageing-protocol",
  "/program/personalized-sovereign-protocol",
  "/geo-wellness-centres",
  "/geo-wellness-centres/kanasu-ayurveda-wellness-retreat",
  "/geo-wellness-centres/shathayu-ayurveda-yoga-retreat",
  "/geo-wellness-centres/chithrakoota-ayurveda",
  "/international-wellness-india",
  "/insights",
  "/insights/future-of-geo-wellness",
  "/insights/from-data-to-diagnosis",
  "/explore",
  "/explore/journal",
  "/explore/video",
  "/explore/image",
  "/explore/brochure",
  "/explore/blog",
  "/blog/future-of-geo-wellness",
  "/blog/from-data-to-diagnosis",
  "/begin-your-journey",
  "/coming-soon/test",
  "/privacy-policy",
  "/terms-and-conditions",
  "/careers",
  "/login",
  "/register",
  "/create-password",
  "/forgot-password"
];

export const publicAuditRoutes=[
  "/",
  "/philosophy",
  "/story",
  "/contact",
  "/program",
  "/geo-wellness-centres",
  "/international-wellness-india",
  "/insights",
  "/explore",
  "/explore/journal",
  "/explore/video",
  "/explore/image",
  "/explore/brochure",
  "/explore/blog",
  "/careers",
  "/privacy-policy",
  "/terms-and-conditions",
  "/login",
  "/register",
  "/create-password",
  "/forgot-password"
];

export const programSlugs=[
  "executive-reset-protocol",
  "deep-detox-protocol",
  "longevity-healthy-ageing-protocol",
  "personalized-sovereign-protocol"
];

export const geoCentreSlugs=[
  "kanasu-ayurveda-wellness-retreat",
  "shathayu-ayurveda-yoga-retreat",
  "chithrakoota-ayurveda"
];

export const exploreCategories=[
  "journal",
  "video",
  "image",
  "brochure",
  "blog"
];

export const dashboardRoutes={
  doctor:[
    "/dashboard",
    "/dashboard/analysis",
    "/dashboard/patients",
    "/dashboard/patient-assessment",
    "/dashboard/reports",
    "/dashboard/geowellness",
    "/dashboard/questionnaires",
    "/dashboard/lifestyle-matrix-assessment",
    "/dashboard/lifestyle-matrix-result",
    "/dashboard/assessments",
    "/dashboard/result",
    "/dashboard/ayurveda-assessment",
    "/dashboard/ayurveda-result",
    "/dashboard/clinical-data-assessment",
    "/dashboard/clinical-data-result",
    "/dashboard/result-summary"
  ],
  patient:[
    "/patient-dashboard",
    "/patient-dashboard/assessment",
    "/patient-dashboard/reports",
    "/patient-dashboard/results",
    "/patient-dashboard/settings"
  ],
  sales:[
    "/sales-dashboard",
    "/sales-dashboard/dashboard",
    "/sales-dashboard/leads",
    "/sales-dashboard/followups",
    "/sales-dashboard/assign-doctor",
    "/sales-dashboard/password-setup",
    "/sales-dashboard/closed"
  ],
  hr:[
    "/hr-dashboard",
    "/hr-dashboard/overview",
    "/hr-dashboard/applications",
    "/hr-dashboard/profile",
    "/hr-dashboard/settings"
  ]
};

export const protectedRoutes=[
  {route:"/dashboard",redirect:"/login"},
  {route:"/sales-dashboard",redirect:"/login"},
  {route:"/hr-dashboard",redirect:"/login"},
  {route:"/patient-dashboard",redirect:"/login"},
  {route:"/lifestyle/welcome",redirect:"/register"},
  {route:"/lifestyle/onboard",redirect:"/register"},
  {route:"/lifestyle/review",redirect:"/register"},
  {route:"/lifestyle/wellness-blueprint",redirect:"/register"}
];