import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  UserRound,
  CalendarDays,
  Wallet,
  Globe2,
  Leaf,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Clock3,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getEnquiryDetails,
  updateEnquiryStatus,
  sendEnquiryRegistrationEmail,
} from "../services/salesService";
import Loading from "../components/common/Loading";

const statuses = [
  "new",
  "contacted",
  "qualified",
  "registration_sent",
  "closed",
];

const text = (v) => (v == null || v === "" ? "Not provided" : String(v));

const label = (v) =>
  text(v)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

/* =========================================================
   REUSABLE ROW
========================================================= */

function Row({ label, value }) {
  return (
    <div className="rounded-xl border border-[#e8eee8] bg-[#f8faf7] p-3.5 transition hover:border-[#cfdccf] hover:bg-[#f5f9f4]">
      <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1.5 break-words text-sm leading-6 text-[#243126]">
        {text(value)}
      </p>
    </div>
  );
}

/* =========================================================
   ARRAY VALUE
========================================================= */

function ArrayValue({ value }) {
  if (!Array.isArray(value) || value.length === 0) {
    return <p className="text-sm text-gray-400">Not provided</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {value.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded-full bg-[#eaf6ed] px-3 py-1.5 text-xs font-medium text-[#1e7a3a]"
        >
          {label(item)}
        </span>
      ))}
    </div>
  );
}

/* =========================================================
   ACCORDION SECTION
========================================================= */

function AccordionSection({
  id,
  title,
  description,
  icon: Icon,
  open,
  onToggle,
  children,
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e3e9e3] bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-[#fafcf9] sm:px-6 sm:py-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf6ed]">
            <Icon size={19} className="text-[#1e7a3a]" />
          </div>

          <div className="min-w-0">
            <h2 className="font-serif text-lg text-[#173C68] sm:text-xl">
              {title}
            </h2>

            {description && (
              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                {description}
              </p>
            )}
          </div>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f7f3] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={18} className="text-[#173C68]" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <div className="border-t border-[#edf1ed] px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================================================
   CONFIRMATION MODAL
========================================================= */

function ConfirmModal({
  title,
  message,
  warning,
  destructive = false,
  onCancel,
  onConfirm,
  saving,
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        className="w-full max-w-[500px] rounded-3xl bg-white p-6 text-center shadow-2xl sm:p-8"
      >
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
            destructive ? "bg-red-50" : "bg-[#f8faf7]"
          }`}
        >
          {destructive ? (
            <XCircle size={28} className="text-red-500" />
          ) : (
            <CheckCircle2 size={28} className="text-[#1e7a3a]" />
          )}
        </div>

        <h2 className="font-serif text-2xl text-[#173C68]">{title}</h2>

        <p className="mx-auto mt-4 max-w-[380px] text-sm leading-6 text-gray-500">
          {message}
        </p>

        {warning && (
          <p className="mt-4 text-sm font-medium text-red-500">{warning}</p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={saving}
            className={`w-full rounded-full px-5 py-3 text-sm font-medium text-white transition disabled:opacity-50 ${
              destructive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#1e7a3a] hover:bg-[#176b31]"
            }`}
          >
            {saving ? "Processing..." : "Confirm"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   SALES WORKFLOW
========================================================= */

function Workflow({ status, onAction, saving }) {
  const [modal, setModal] = useState(null);

  const steps = [
    ["new", "New"],
    ["contacted", "Contacted"],
    ["qualified", "Qualified"],
    ["registration_sent", "Registration Sent"],
    ["closed", "Closed"],
  ];

  const index = steps.findIndex(([step]) => step === status);

  const open = (nextStatus) => {
    setModal(nextStatus);
  };

  const confirm = async () => {
    if (!modal) return;

    await onAction(modal);
    setModal(null);
  };

  const isNotQualified = modal === "closed" && status === "contacted";

  const getModalTitle = () => {
    if (isNotQualified) {
      return "Mark as Not Qualified";
    }

    if (modal === "closed" && status === "registration_sent") {
      return "Complete Registration";
    }

    if (modal === "contacted") {
      return "Mark as Contacted";
    }

    if (modal === "qualified") {
      return "Mark as Qualified";
    }

    if (modal === "registration_sent") {
      return "Send Registration Email";
    }

    return "Confirm Action";
  };

  const getModalMessage = () => {
    if (isNotQualified) {
      return "Confirm that this enquiry is not qualified and should be closed.";
    }

    if (modal === "closed" && status === "registration_sent") {
      return "Confirm that the client has completed registration and close this enquiry.";
    }

    if (modal === "contacted") {
      return "Confirm that the sales team has contacted this client.";
    }

    if (modal === "qualified") {
      return "Confirm that this enquiry is qualified to proceed.";
    }

    if (modal === "registration_sent") {
      return "Confirm that you want to send the registration email to this client.";
    }

    return "Confirm this action.";
  };

  return (
    <>
      <section className="mb-5 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}

        <div className="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-[#173C68]">
              Sales Workflow
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Current Status:
              <span className="ml-2 rounded-full bg-[#eaf6ed] px-3 py-1 font-medium text-[#1e7a3a]">
                {label(status)}
              </span>
            </p>
          </div>

          {/* ACTION BUTTONS */}

          <div className="flex flex-col gap-2 sm:flex-row">
            {status === "new" && (
              <button
                type="button"
                onClick={() => open("contacted")}
                disabled={saving}
                className="rounded-full bg-[#173C68] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#123052] disabled:opacity-50"
              >
                Mark Contacted
              </button>
            )}

            {status === "contacted" && (
              <>
                <button
                  type="button"
                  onClick={() => open("qualified")}
                  disabled={saving}
                  className="rounded-full bg-[#173C68] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#123052] disabled:opacity-50"
                >
                  Mark Qualified
                </button>

                <button
                  type="button"
                  onClick={() => open("closed")}
                  disabled={saving}
                  className="rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
                >
                  Not Qualified
                </button>
              </>
            )}

            {status === "qualified" && (
              <button
                type="button"
                onClick={() => open("registration_sent")}
                disabled={saving}
                className="rounded-full bg-[#1e7a3a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#176b31] disabled:opacity-50"
              >
                <Mail size={15} className="mr-2 inline" />
                Send Registration
              </button>
            )}

            {status === "registration_sent" && (
              <button
                type="button"
                onClick={() => open("closed")}
                disabled={saving}
                className="rounded-full bg-[#1e7a3a] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#176b31] disabled:opacity-50"
              >
                Complete Registration
              </button>
            )}
          </div>
        </div>

        {/* WORKFLOW */}

        <div className="border-t border-gray-100 px-5 py-5 sm:px-6">
          <div className="flex items-center overflow-x-auto pb-1">
            {steps.map(([step, name], i) => (
              <div key={step} className="flex min-w-max items-center">
                <div
                  className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                    i <= index
                      ? "bg-[#1e7a3a] text-white"
                      : "bg-gray-100 text-[#173C68]"
                  }`}
                >
                  {name}
                </div>

                {i < steps.length - 1 && (
                  <div
                    className={`mx-2 h-px w-8 sm:w-12 ${
                      i < index ? "bg-[#1e7a3a]" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIRMATION */}

      {modal && (
        <ConfirmModal
          title={getModalTitle()}
          message={getModalMessage()}
          warning="Once confirmed, this action cannot be undone."
          destructive={isNotQualified}
          onCancel={() => setModal(null)}
          onConfirm={confirm}
          saving={saving}
        />
      )}
    </>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function EnquiryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [enquiry, setEnquiry] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  /*
   * First section is open by default.
   * Multiple sections can be opened at the same time.
   */

  const [openSections, setOpenSections] = useState({
    client: true,
    wellness: false,
    journey: false,
    travel: false,
    environment: false,
    additional: false,
    consent: false,
  });

  async function load() {
    try {
      setLoading(true);

      const data = await getEnquiryDetails(id);

      setEnquiry(data);
    } catch (err) {
      console.error("ENQUIRY DETAILS ERROR:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  async function statusChange(status) {
    try {
      setSaving(true);

      await updateEnquiryStatus(id, status);

      await load();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);

      alert(err.message || "Unable to update enquiry status.");
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     WORKFLOW ACTION
  ========================================================= */

  async function workflowAction(status) {
    /*
     * Registration email is handled separately
     * because sending the email automatically changes
     * the status to registration_sent.
     */

    if (status === "registration_sent") {
      try {
        setSaving(true);

        await sendEnquiryRegistrationEmail(id);

        await load();
      } catch (err) {
        console.error("REGISTRATION EMAIL ERROR:", err);

        alert(err.message || "Unable to send registration email.");
      } finally {
        setSaving(false);
      }

      return;
    }

    await statusChange(status);
  }

 

  if (!enquiry) {
    return <div className="p-8 text-center">Enquiry not found.</div>;
  }

  const health = enquiry.health_context || {};

  const lifestyle = enquiry.lifestyle_context || {};

  const travel = enquiry.travel_preferences || {};

  const environment = enquiry.environment_preferences || [];

  const climate = enquiry.climate_preferences || [];

  const consent = enquiry.consent || {};

  return (
    <div className="min-h-full bg-[#f6f8f5] p-3 sm:p-4 md:p-6">
      <div className="mx-auto max-w-[1200px]">
        {/* =====================================================
            BACK
        ===================================================== */}

        <button
          type="button"
          onClick={() => navigate("/sales-dashboard/enquiries")}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#1e7a3a]"
        >
          <ArrowLeft size={16} />
          Back to Enquiries
        </button>

        {/* =====================================================
            CLIENT HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#173C68] to-[#1e7a3a] p-5 text-white shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                Client Enquiry
              </p>

              <h1 className="mt-1 break-words font-serif text-2xl sm:text-3xl">
                {enquiry.name}
              </h1>

              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                {enquiry.enquiry_id}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                {label(enquiry.status)}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            WORKFLOW
        ===================================================== */}

        <Workflow
          status={enquiry.status}
          onAction={workflowAction}
          saving={saving}
        />

        {/* =====================================================
            ENQUIRY DETAILS
        ===================================================== */}

        <div className="space-y-4">
          {/* ===================================================
              CLIENT INFORMATION
          =================================================== */}

          <AccordionSection
            id="client"
            title="Client Information"
            description="Basic contact and personal information"
            icon={UserRound}
            open={openSections.client}
            onToggle={toggleSection}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Row label="Enquiry ID" value={enquiry.enquiry_id} />

              <Row label="Full Name" value={enquiry.name} />

              <Row label="Email Address" value={enquiry.email} />

              <Row label="Mobile Number" value={enquiry.phone} />

              <Row label="Location" value={enquiry.location} />
              <Row
                label="Preferred Contact Method"
                value={lifestyle.preferredContactMethod}
              />

              <Row label="Source" value={enquiry.source} />

              <Row
                label="Submitted At"
                value={
                  enquiry.submitted_at
                    ? new Date(enquiry.submitted_at).toLocaleString()
                    : null
                }
              />
            </div>
          </AccordionSection>

          {/* ===================================================
              WELLNESS JOURNEY
          =================================================== */}

          <AccordionSection
            id="wellness"
            title="Wellness Journey"
            description="Client goals and preferred wellness pathway"
            icon={Leaf}
            open={openSections.wellness}
            onToggle={toggleSection}
          >
            <div className="space-y-4">
              <Row label="Who is this journey for?" value={health.journeyFor} />

              <div className="rounded-xl border border-[#e8eee8] bg-[#f8faf7] p-3.5">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  What would you primarily like to explore?
                </p>

                <ArrayValue value={enquiry.wellness_goals} />
              </div>

              <Row
                label="Wellness Pathway"
                value={enquiry.journey_preference || lifestyle.pathway}
              />

              <Row label="Additional Concern" value={enquiry.current_concern} />
            </div>
          </AccordionSection>

          {/* ===================================================
              JOURNEY PREFERENCES
          =================================================== */}
          <AccordionSection
            id="journey"
            title="Journey Preferences"
            description="Preferred pathway, duration, start date and investment"
            icon={CalendarDays}
            open={openSections.journey}
            onToggle={toggleSection}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {(() => {
                const journeyPreference=String(enquiry.journey_preference||"").trim();

                let pathway="Not Yet Decided";
                let duration="Not Yet Decided";

                if(/restore/i.test(journeyPreference)){
                  pathway="Restore";
                  duration="7 Days";
                }else if(/rebalance/i.test(journeyPreference)){
                  pathway="Rebalance";
                  duration="14 Days";
                }else if(/longevity/i.test(journeyPreference)){
                  pathway="Longevity";
                  duration="21 Days";
                }

                return(
                  <>
                    <Row
                      label="Wellness Pathway"
                      value={pathway}
                    />

                    <Row
                      label="Duration"
                      value={duration}
                    />

                    <Row
                      label="Starting Your Journey"
                      value={lifestyle.startTime||travel.startTime}
                    />

                    <Row
                      label="Approximate Budget Range"
                      value={enquiry.investment_preference}
                    />
                  </>
                );
              })()}
            </div>
          </AccordionSection>

          {/* ===================================================
              TRAVEL PREFERENCES
          =================================================== */}

          <AccordionSection
            id="travel"
            title="Travel Preferences"
            description="Travel requirements provided by the client"
            icon={MapPin}
            open={openSections.travel}
            onToggle={toggleSection}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Row label="Travel Duration" value={travel.duration} />

              <Row label="Journey Start" value={travel.startTime} />
            </div>
          </AccordionSection>

          {/* ===================================================
              ADDITIONAL INFORMATION
          =================================================== */}

          <AccordionSection
            id="additional"
            title="Additional Information"
            description="Additional concerns or information shared by the client"
            icon={Wallet}
            open={openSections.additional}
            onToggle={toggleSection}
          >
            <div className="space-y-4">
              <div className="rounded-xl border border-[#e8eee8] bg-[#f8faf7] p-4">
                <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  Client Message / Current Concern
                </p>

                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#243126]">
                  {text(enquiry.current_concern)}
                </p>
              </div>

              <Row
                label="Other Wellness Goal"
                value={enquiry.other_wellness_goal}
              />
            </div>
          </AccordionSection>

          {/* ===================================================
              CONSENT INFORMATION
          =================================================== */}

          <AccordionSection
            id="consent"
            title="Consent & Acknowledgements"
            description="Consent information submitted with the enquiry"
            icon={ShieldCheck}
            open={openSections.consent}
            onToggle={toggleSection}
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Row
                label="Consent to Process Information"
                value={
                  consent.consentToProcess === true
                    ? "Accepted"
                    : "Not accepted"
                }
              />

              <Row
                label="Information Accuracy"
                value={
                  consent.informationAccuracy === true
                    ? "Confirmed"
                    : "Not confirmed"
                }
              />

              <Row
                label="Consent Recorded At"
                value={
                  consent.recordedAt
                    ? new Date(consent.recordedAt).toLocaleString()
                    : null
                }
              />
            </div>
          </AccordionSection>
        </div>

        {/* =====================================================
            SALES ACTIONS
        ===================================================== */}

        <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="text-center">
            <h2 className="font-serif text-xl text-[#173C68]">Sales Actions</h2>

            <p className="mt-1 text-sm text-gray-500">
              Actions available for the current enquiry stage
            </p>
          </div>

          {/* QUALIFIED */}

          {enquiry.status === "qualified" && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => workflowAction("registration_sent")}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e7a3a] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#176b31] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Mail size={15} />

                {saving ? "Sending..." : "Send Registration Email"}
              </button>
            </div>
          )}

          {/* REGISTRATION SENT */}

          {enquiry.status === "registration_sent" && (
            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => workflowAction("registration_sent")}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173C68] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#123052] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Mail size={15} />

                {saving ? "Resending..." : "Resend Registration Email"}
              </button>

              <button
                type="button"
                onClick={() => workflowAction("closed")}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e7a3a] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#176b31] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <CheckCircle2 size={15} />
                Complete Registration
              </button>
            </div>
          )}

          {/* CLOSED */}

          {enquiry.status === "closed" && (
            <div className="mt-5 flex justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#eaf6ed] px-5 py-2.5 text-sm font-medium text-[#1e7a3a]">
                <CheckCircle2 size={16} />
                Enquiry Closed
              </div>
            </div>
          )}

          {/* NEW / CONTACTED */}

          {(enquiry.status === "new" || enquiry.status === "contacted") && (
            <div className="mt-5 text-center">
              <p className="text-sm text-gray-500">
                Continue the enquiry using the workflow actions above.
              </p>
            </div>
          )}
        </div>

        {/* =====================================================
            STATUS INFORMATION
        ===================================================== */}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 pb-5 text-xs text-gray-500">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            <Clock3 size={14} />
            Created:{" "}
            {enquiry.created_at
              ? new Date(enquiry.created_at).toLocaleDateString()
              : "Not available"}
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
            Updated:{" "}
            {enquiry.updated_at
              ? new Date(enquiry.updated_at).toLocaleDateString()
              : "Not available"}
          </div>

          {enquiry.assigned_email && (
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
              Assigned: {enquiry.assigned_email}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
