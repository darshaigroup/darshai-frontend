export const clinicalDataSections = [

  {
    id: "medicalHistory",
    title: "Medical History",

    questions: [

      {
        id: "medicalConditions",

        type: "multiSelect",

        question:
          "Have you ever been diagnosed with any of the following conditions?(select all that apply)",

        options: [
          "Diabetes",
          "High Blood Pressure",
          "Thyroid Disorder",
          "PCOS / PCOD",
          "Heart Disease",
          "Autoimmune Condition",
          "Anxiety",
          "Depression",
          "Burnout Syndrome",
          "Other"
        ],
      },

      {
        id: "otherCondition",

        type: "text",

        question:
          "Please specify any other medical condition.",
      },

    ],
  },

  {
    id: "medications",
    title: "Medications & Supplements",

    questions: [

      {
        id: "takingMedication",

        type: "yesNo",

        question:
          "Are you currently taking any medications or supplements?",
      },

      {
        id: "medicationDetails",

        type: "textarea",

        question:
          "Please list medication name, dose and duration.",
      },

    ],
  },

  {
    id: "allergies",
    title: "Allergies",

    questions: [

      {
        id: "hasAllergies",

        type: "yesNo",

        question:
          "Do you have any food, drug or environmental allergies?",
      },

      {
        id: "allergyDetails",

        type: "textarea",

        question:
          "Please list your allergies.",
      },

    ],
  },

  {
    id: "surgeries",
    title: "Surgeries & Hospitalizations",

    questions: [

      {
        id: "surgeryHistory",

        type: "yesNo",

        question:
          "Have you ever had surgery or been hospitalized?",
      },

      {
        id: "surgeryDetails",

        type: "textarea",

        question:
          "Please provide procedure, year and notes.",
      },

    ],
  },

  {
    id: "familyHistory",
    title: "Family History",

    questions: [

      {
        id: "familyHistory",

        type: "multiSelect",

        question:
          "Does anyone in your immediate family have any of the following?",

        options: [
          "Diabetes",
          "Heart Disease",
          "Obesity",
          "Autoimmune Condition",
          "Cancer",
          "None",
        ],
      },

    ],
  },

  {
    id: "measurements",
    title: "Physical Measurements",

    questions: [

      {
        id: "height",

        type: "number",

        question:
          "What is your height (cm)?",
      },

      {
        id: "weight",

        type: "number",

        question:
          "What is your weight (kg)?",
      },

      {
        id: "waistCircumference",

        type: "number",

        question:
          "What is your waist circumference (cm)?",
      },

      {
        id: "bloodPressureKnown",

        type: "yesNo",

        question:
          "Do you know your blood pressure reading?",
      },

      {
        id: "bloodPressure",

        type: "text",

        question:
          "Enter your blood pressure (Example: 120 / 80)",
      },

    ],
  },

  {
    id: "womenHealth",
    title: "Women's Health",

    gender: "Female",

    questions: [

      {
        id: "cycle",

        type: "singleSelect",

        question:
          "How would you describe your menstrual cycle?",

        options: [
          "Regular",
          "Irregular",
        ],
      },

      {
        id: "pms",

        type: "singleSelect",

        question:
          "How severe are PMS symptoms?",

        options: [
          "None",
          "Mild",
          "Moderate",
          "Severe",
        ],
      },

      {
        id: "pregnancy",

        type: "yesNo",

        question:
          "Are you currently pregnant or breastfeeding?",
      },

    ],
  },

  {
    id: "menHealth",
    title: "Men's Health",

    gender: "Male",

    questions: [

      {
        id: "prostateSymptoms",

        type: "singleSelect",

        question:
          "Are you experiencing prostate related symptoms?",

        options: [
          "None",
          "Mild",
          "Significant",
        ],
      },

      {
        id: "androgenSymptoms",

        type: "singleSelect",

        question:
          "Which best describes you recently?",

        options: [
          "Normal Energy and Drive",
          "Reduced Motivation",
          "Fatigue / Low Energy",
        ],
      },

    ],
  },

  {
    id: "hormonalHealth",
    title: "Hormonal Health",

    questions: [

      {
        id: "libido",

        type: "singleSelect",

        question:
          "How would you rate your libido?",

        options: [
          "Low",
          "Normal",
          "High",
        ],
      },

      {
        id: "hairSkin",

        type: "yesNo",

        question:
          "Have you experienced hair loss or skin issues recently?",
      },

      {
        id: "hairSkinDetails",

        type: "textarea",

        question:
          "Please describe the issue.",
      },

      {
        id: "fatiguePattern",

        type: "singleSelect",

        question:
          "When do you feel most tired?",

        options: [
          "Morning",
          "Afternoon",
          "Evening",
          "Constantly",
        ],
      },

    ],
  },

  {
    id: "wellnessGoals",
    title: "Wellness Goals",

    questions: [

      {
        id: "primaryGoal",

        type: "singleSelect",

        question:
          "What is your primary wellness goal right now?",

        options: [
          "Weight Loss",
          "Improve Digestion",
          "Increase Energy",
          "Reduce Stress",
          "Disease Reversal",
          "Longevity / Healthy Aging",
          "Hormonal Balance",
          "Other",
        ],
      },

      {
        id: "goalOther",

        type: "text",

        question:
          "Please describe your goal.",
      },

    ],
  },

];