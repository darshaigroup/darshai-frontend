import { useState } from "react";
import { isValidPhoneNumber } from "libphonenumber-js";
import { submitEnquiry } from "../services/enquiryService";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  contactMethod: "",
  country: "",
  city: "",
  journeyFor: "",
  wellnessGoals: [],
  journeyPreference: "",
  startTime: "",
  budget: "",
  other: "",
  consentToProcess: false,
  medicalDisclaimer: false,
  informationAccuracy: false,
};

export default function useWellnessEnquiry() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleGoal = (value) => {
    setForm((prev) => ({
      ...prev,
      wellnessGoals: prev.wellnessGoals.includes(value)
        ? prev.wellnessGoals.filter((item) => item !== value)
        : [...prev.wellnessGoals, value],
    }));
  };

  const updateConsent = (value) => {
    setForm((prev) => ({
      ...prev,
      consentToProcess: value,
      medicalDisclaimer: value,
      informationAccuracy: value,
    }));
  };

  /*
   * EMAIL VALIDATION
   */
  const isEmailValid = () => {
    const email = String(form.email || "").trim();

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  /*
   * PHONE VALIDATION
   */
  const isPhoneValid = () => {
    const phone = String(form.phone || "").trim();

    if (!phone) return false;

    try {
      return isValidPhoneNumber(phone);
    } catch {
      return false;
    }
  };

  /*
   * STEP 1
   *
   * Basic client information.
   *
   * Required:
   * - Name
   * - Email
   * - Phone
   * - Country
   * - City
   *
   * Contact method is intentionally NOT required here
   * because it belongs to the preferences section.
   */
  const isStep1Valid =
    Boolean(form.name?.trim()) &&
    isEmailValid() &&
    isPhoneValid() &&
    Boolean(form.country?.trim()) &&
    Boolean(form.city?.trim());

  /*
   * STEP 2
   *
   * Wellness journey.
   *
   * Required:
   * - Who the journey is for
   * - At least one wellness goal
   * - One combined pathway + duration option
   *
   * journeyPreference contains values such as:
   *
   * Restore (7 Day)
   * Rebalance (14 Day)
   * Longevity (21 Day)
   * Not Yet Decided
   */
  const isStep2Valid =
    Boolean(form.journeyFor) &&
    Array.isArray(form.wellnessGoals) &&
    form.wellnessGoals.length > 0 &&
    Boolean(form.journeyPreference);

  /*
   * STEP 3
   *
   * Preferences.
   *
   * Required:
   * - Preferred contact method
   * - Start time
   * - Budget
   *
   * Privacy consent is NOT checked here.
   * Privacy belongs to Step 4.
   */
  const isStep3Valid =
    Boolean(form.contactMethod) &&
    Boolean(form.startTime) &&
    Boolean(form.budget);

  /*
   * STEP 4
   *
   * Privacy & submission.
   *
   * The UI uses one checkbox which updates all
   * three consent values.
   */
  const isStep4Valid =
    Boolean(form.consentToProcess) &&
    Boolean(form.medicalDisclaimer) &&
    Boolean(form.informationAccuracy);

  /*
   * CONTINUE BUTTON STATE
   *
   * Step 1 -> Step 2
   * Step 2 -> Step 3
   * Step 3 -> Step 4
   *
   * Step 4 has SUBMIT instead of Continue.
   */
  const canContinue =
    step === 1
      ? isStep1Valid
      : step === 2
        ? isStep2Valid
        : step === 3
          ? isStep3Valid
          : false;

  /*
   * MOVE TO NEXT STEP
   */
  const next = () => {
    if (!canContinue) return;

    setError("");

    setStep((prev) => Math.min(prev + 1, 4));
  };

  /*
   * GO BACK
   */
  const back = () => {
    setError("");

    setStep((prev) => Math.max(prev - 1, 1));
  };

  /*
   * SUBMIT ENQUIRY
   */
  const submit = async () => {
    setError("");

    /*
     * Validate Step 1
     */
    if (!isStep1Valid) {
      setError("Please complete your basic information.");
      setStep(1);
      return;
    }

    /*
     * Validate Step 2
     */
    if (!isStep2Valid) {
      setError("Please complete your wellness journey preferences.");
      setStep(2);
      return;
    }

    /*
     * Validate Step 3
     */
    if (!isStep3Valid) {
      setError("Please complete your preferences.");
      setStep(3);
      return;
    }

    /*
     * Validate Step 4
     */
    if (!isStep4Valid) {
      setError("Please accept the consent before submitting.");
      setStep(4);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name.trim(),

        email: form.email.trim().toLowerCase(),

        phone: form.phone.trim(),

        ageBracket: null,

        location: [form.city, form.country].filter(Boolean).join(", ") || null,

        occupation: null,

        wellnessGoals: form.wellnessGoals,

        otherWellnessGoal: null,

        currentConcern: form.other?.trim() || null,

        /*
         * Health context
         */
        healthContext: {
          journeyFor: form.journeyFor,
        },

        /*
         * Lifestyle context
         *
         * The combined pathway + duration
         * is stored as journeyPreference.
         */
        lifestyleContext: {
          journeyPreference: form.journeyPreference,

          startTime: form.startTime,

          preferredContactMethod: form.contactMethod,
        },

        environmentPreferences: [],

        climatePreferences: [],

        /*
         * MAIN JOURNEY PREFERENCE
         *
         * Example:
         * Restore (7 Day)
         * Rebalance (14 Day)
         * Longevity (21 Day)
         * Not Yet Decided
         */
        journeyPreference: form.journeyPreference,

        /*
         * Budget
         */
        investmentPreference: form.budget,

        /*
         * Travel preferences
         */
        travelPreferences: {
          journeyPreference: form.journeyPreference,

          startTime: form.startTime,
        },

        /*
         * Consent
         */
        consent: {
          consentToProcess: form.consentToProcess,

          medicalDisclaimer: form.medicalDisclaimer,

          informationAccuracy: form.informationAccuracy,

          recordedAt: new Date().toISOString(),
        },
      };

      console.log("ENQUIRY PAYLOAD:", payload);

      await submitEnquiry(payload);

      setSubmitted(true);
    } catch (error) {
      console.error("ENQUIRY SUBMISSION ERROR:", error);

      setError(error.message || "Unable to submit your enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,

    step,

    loading,

    submitted,

    error,

    update,

    updateConsent,

    toggleGoal,

    next,

    back,

    submit,

    isEmailValid: isEmailValid(),

    isPhoneValid: isPhoneValid(),

    isStep1Valid,

    isStep2Valid,

    isStep3Valid,

    isStep4Valid,

    canContinue,
  };
}
