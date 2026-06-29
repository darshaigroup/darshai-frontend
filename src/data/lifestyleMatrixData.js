export const lifestyleMatrixSections = [
  {
    id: "retreat_profile",
    title: "Retreat Profile",
    questions: [
      {
        id: "retreat_for",
        question: "Who is this retreat for?",
        options: ["Solo", "Couple", "Family", "Corporate","Friends"],
      },

      {
        id: "adult_count",
        question: "Number of Adults",
        type: "number",
        min: 1,
        max: 100,
        visibleFor: ["Family", "Corporate","Friends"],
      },

      {
        id: "children_count",
        question: "Number of Children",
        type: "number",
        min: 0,
        max: 20,
        visibleFor: ["Family", "Corporate"],
      },

      {
        id: "room_count",
        question: "Number of Rooms",
        type: "select",
        max: 10,
        visibleFor: ["Family", "Corporate","Friends"],
      },

      {
        id: "retreat_goal",
        question: "Primary retreat goal",
        multiple: true,
        allowOther: true,
        options: [
          "Stress Recovery",
          "Better Sleep",
          "Burnout Recovery",
          "Preventive Health",
          "Detox & Rejuvenation",
          "Longevity & Healthy Ageing",
          "Nature-Based Wellness",
          "Other",
        ],
      },

      {
        id: "preferred_experience",
        question: "Which Darshai wellness experience interests you the most?",
        options: [
          "Darshai Vital Reset",
          "Darshai Mind Balance",
          "Darshai Deep Detox",
          "Darshai Personalised Journey",
        ],
      },

      {
        id: "travel_timeline",
        question: "When are you planning to begin your wellness journey?",
        options: ["Within 30 Days", "Within 60 Days", "Exploring Options"],
      },

      {
        id: "budget_range",
        question:
          "What is your preferred investment range for this wellness retreat?(per person)",
        options: [
          "₹10,000–20,000",
          "₹20,000–40,000",
          "₹40,000–75,000",
          "₹75,000+",
        ],
      },
    ],
  },

  {
    id: "wellness_preferences",
    title: "Wellness Preferences",
    questions: [
      {
        id: "natural_environment",
        question: "Preferred natural environment?",
        options: ["Forest", "Beach", "Mountain", "Garden"],
      },

      {
        id: "mind_body_practice",
        question: "Interested mind-body practice?",
        multiple: true,
        allowOther: true,
        options: ["Yoga", "Pranayama", "Meditation", "Breathwork", "Other"],
      },

      {
        id: "therapeutic_experience",
        question: "Preferred therapeutic experience?",
        multiple: true,
        allowOther: true,
        options: ["Panchakarma", "Sound Healing", "Acupuncture", "Other"],
      },
      {
        id: "creative_activity",
        question: "Preferred creative activity?",
        multiple: true,
        allowOther: true,
        options: ["Music Therapy", "Art Therapy", "Movement Therapy", "Other"],
      },

      {
        id: "activity_intensity",
        question: "Preferred activity intensity?",
        options: ["Low", "Moderate", "High"],
      },

      {
        id: "wellness_learning",
        question: "Wellness learning interest?",
        multiple: true,
        allowOther: true,
        options: [
          "Workshops",
          "Nutrition Education",
          "Stress Management",
          "Other",
        ],
      },
    ],
  },

  {
    id: "food_lifestyle",
    title: "Food & Lifestyle",
    questions: [
      {
        id: "food_style",
        question: "Preferred food style?",
        options: ["Vegetarian", "Non-Vegetarian", "Vegan", "Mixed"],
      },
      {
        id: "retreat_experience",
        question: "Preferred retreat experience?",
        multiple: true,
        allowOther: true,
        options: ["Silent", "Therapy-Focused", "Leisure", "Other"],
      },

      {
        id: "comfort_level",
        question: "Preferred comfort level?",
        options: ["Luxury", "Therapeutic", "Balanced"],
      },
    ],
  },

  {
    id: "environment_exposure",
    title: "Environment & Exposure",
    questions: [
      {
        id: "work_posture",
        question: "Work posture mainly?",
        options: ["Desk-bound", "Standing", "Physical Labour", "Mixed"],
      },

      {
        id: "alcohol_consumption",
        question: "Do you consume alcohol?",
        options: ["Yes", "No"],
      },

      {
        id: "tobacco_use",
        question: "Do you use tobacco?",
        options: ["Yes", "No"],
      },

      {
        id: "living_environment",
        question: "Current living environment?",
        options: ["Urban", "Semi-Urban", "Rural"],
      },

      {
        id: "climate_type",
        question: "Preferred climate type?",
        options: ["Hot", "Cold", "Moderate"],
      },

      {
        id: "terrain_type",
        question: "Preferred terrain type?",
        options: ["Plains", "Coastal", "Hills", "Arid"],
      },

      {
        id: "sunlight_exposure",
        question: "Daily sunlight exposure?",
        options: ["Low", "Moderate", "High"],
      },

      {
        id: "pollution_exposure",
        question: "Pollution exposure level?",
        options: ["Low", "High"],
      },

      {
        id: "ac_dependency",
        question: "Air-conditioner dependency level?",
        options: ["Most of Day", "Occasional", "No"],
      },

      {
        id: "travel_frequency",
        question: "Travel frequency currently?",
        options: ["Rare", "Monthly", "Weekly"],
      },
    ],
  },
];
