import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  ArrowRight,
  Compass,
  Shield,
  BookOpen,
  Building2,
} from "lucide-react";
import { track } from "../../lib/darshaiNew/analytics";
const SEARCH_INDEX = [
  // Pages
  {
    id: "page-home",
    title: "Home",
    category: "Page",
    subtitle: "The Geo-Wellness Platform",
    page: "home",
  },
  {
    id: "page-geo-wellness",
    title: "Geo-Wellness",
    category: "Page",
    subtitle: "Geography & Environment Matching",
    page: "geo-wellness",
  },
  {
    id: "page-programs",
    title: "Programs",
    category: "Page",
    subtitle: "Structured Protocols & Clinical Pathways",
    page: "programs",
  },
  {
    id: "page-centres",
    title: "Centres",
    category: "Page",
    subtitle: "Curated International Partner Network",
    page: "centres",
  },
  {
    id: "page-corporate",
    title: "Corporate",
    category: "Page",
    subtitle: "Executive Health & Resilience Pathways",
    page: "corporate",
  },
  {
    id: "page-insights",
    title: "Insights",
    category: "Page",
    subtitle: "Perspectives on Geo-Wellness & Longevity",
    page: "insights",
  },
  {
    id: "page-about",
    title: "About",
    category: "Page",
    subtitle: "Philosophy, Standards & Architecture",
    page: "about",
  },
  {
    id: "page-governance",
    title: "Trust & Governance",
    category: "Page",
    subtitle: "Clinical Governance & Partner Standards",
    page: "governance",
  },
  {
    id: "page-contact",
    title: "Contact",
    category: "Page",
    subtitle: "Assessment & Consultation Inquiries",
    page: "contact",
  },
  // Protocols
  {
    id: "proto-restore",
    title: "DARSHAI Restore",
    category: "Protocol",
    subtitle: "7 Days · Focused Recovery & Routine Reset",
    page: "/programs/restore",
  },
  {
    id: "proto-rebalance",
    title: "DARSHAI Rebalance",
    category: "Protocol",
    subtitle: "14 Days · Deeper Structured Immersion",
    page: "/programs/rebalance",
  },
  {
    id: "proto-longevity",
    title: "DARSHAI Longevity",
    category: "Protocol",
    subtitle: "21 Days · Foundations for Long-Term Vitality",
    page: "/programs/longevity",
  },
  {
    id: "proto-1",
    title: "Executive Reset Protocol",
    category: "Protocol",
    subtitle: "Cognitive exhaustion & endocrine recalibration",
    page: "programs",
  },
  {
    id: "proto-2",
    title: "Deep Detox Protocol",
    category: "Protocol",
    subtitle: "Metabolic reset & cellular purification",
    page: "programs",
  },
  {
    id: "proto-3",
    title: "Longevity & Healthy Ageing Protocol",
    category: "Protocol",
    subtitle: "Cellular rejuvenation & biomarker optimization",
    page: "programs",
  },
  {
    id: "proto-4",
    title: "Sovereign Protocol",
    category: "Protocol",
    subtitle: "Bespoke high-privacy institutional pathway",
    page: "programs",
  },
  // Centres
  {
    id: "centre-1",
    title: "Ananda in the Himalayas",
    category: "Centre",
    subtitle: "Garhwal Himalayas, Uttarakhand, India",
    page: "centres",
  },
  {
    id: "centre-2",
    title: "Clinique La Prairie",
    category: "Centre",
    subtitle: "Montreux, Lake Geneva, Switzerland",
    page: "centres",
  },
  {
    id: "centre-3",
    title: "SHA Wellness Clinic",
    category: "Centre",
    subtitle: "Alicante, Costa Blanca, Spain",
    page: "centres",
  },
  {
    id: "centre-4",
    title: "Chiva-Som",
    category: "Centre",
    subtitle: "Hua Hin, Gulf of Thailand",
    page: "centres",
  },
  {
    id: "centre-5",
    title: "Kamalaya",
    category: "Centre",
    subtitle: "Koh Samui, Gulf of Thailand",
    page: "centres",
  },
  {
    id: "centre-6",
    title: "Lanserhof Lans",
    category: "Centre",
    subtitle: "Tyrol, Austrian Alps, Austria",
    page: "centres",
  },
  {
    id: "centre-7",
    title: "Chenot Palace Weggis",
    category: "Centre",
    subtitle: "Lake Lucerne, Switzerland",
    page: "centres",
  },
  {
    id: "centre-8",
    title: "Euphoria Retreat",
    category: "Centre",
    subtitle: "Mystras, Peloponnese, Greece",
    page: "centres",
  },
  {
    id: "centre-9",
    title: "RAKxa Wellness",
    category: "Centre",
    subtitle: "Bang Krachao, Bangkok, Thailand",
    page: "centres",
  },
  {
    id: "centre-10",
    title: "Bürgenstock Alpine",
    category: "Centre",
    subtitle: "Lake Lucerne, Switzerland",
    page: "centres",
  },
  // Insights
  {
    id: "insight-1",
    title: "The missing variable in wellness may be geography.",
    category: "Insight",
    subtitle: "Geo-Wellness · 8 min read",
    page: "insights",
  },
  {
    id: "insight-2",
    title: "Why matching matters more than choice in wellness.",
    category: "Insight",
    subtitle: "Longevity · 6 min read",
    page: "insights",
  },
  {
    id: "insight-3",
    title: "The future of executive recovery.",
    category: "Insight",
    subtitle: "Executive Wellness · 5 min read",
    page: "insights",
  },
  {
    id: "insight-4",
    title:
      "The Physiology of Environment: How Elevation and Air Quality Alter Recovery Biomarkers",
    category: "Insight",
    subtitle: "Research · 8 min read",
    page: "insights",
  },
  {
    id: "insight-5",
    title: "Circadian Recalibration in Clinical Hospitality Environments",
    category: "Insight",
    subtitle: "Clinical Perspective · 6 min read",
    page: "insights",
  },
  {
    id: "insight-6",
    title:
      "Why Most Executive Retreats Fail to Produce Lasting Biomarker Improvement",
    category: "Insight",
    subtitle: "Executive Health · 7 min read",
    page: "insights",
  },
  {
    id: "insight-7",
    title: "The Role of Thermal Mineral Water in Cellular Inflammation",
    category: "Insight",
    subtitle: "Environmental Medicine · 5 min read",
    page: "insights",
  },
  {
    id: "insight-8",
    title:
      "Biomarker Verification in Preventive Health: Moving Beyond Self-Reported Outcomes",
    category: "Insight",
    subtitle: "Clinical Methodology · 7 min read",
    page: "insights",
  },
];
export function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  // Filter items based on query
  const filteredResults = query.trim()
    ? SEARCH_INDEX.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()),
      )
    : SEARCH_INDEX.slice(0, 8); // Default suggestions
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev + 1) % Math.max(1, filteredResults.length),
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev === 0 ? Math.max(0, filteredResults.length - 1) : prev - 1,
        );
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleSelect(filteredResults[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);
  const handleSelect = (item) => {
    if (item.category === "Protocol") {
      track("protocol_select", { protocol: item.title });
    } else if (item.category === "Centre") {
      track("centre_view", { centre: item.title });
    }
    onNavigate(item.page);
    onClose();
  };
  if (!isOpen) return null;
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Page":
        return (
          <Compass className="w-4 h-4 text-[#0E4D3A]" aria-hidden="true" />
        );
      case "Protocol":
        return <Shield className="w-4 h-4 text-[#0E4D3A]" aria-hidden="true" />;
      case "Centre":
        return (
          <Building2 className="w-4 h-4 text-[#0E4D3A]" aria-hidden="true" />
        );
      case "Insight":
        return (
          <BookOpen className="w-4 h-4 text-[#0E4D3A]" aria-hidden="true" />
        );
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search DARSHAI"
    >
      <div
        className="w-full max-w-2xl bg-white rounded-[24px] border border-[#D2D2D7] shadow-2xl overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-6 py-4 border-b border-[#D2D2D7]">
          <Search
            className="w-5 h-5 text-[#6E6E73] flex-shrink-0"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, protocols, centres, insights..."
            className="w-full px-4 py-2 text-base md:text-lg text-[#1D1D1F] bg-transparent outline-none placeholder:text-[#6E6E73]"
            aria-label="Search query"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-[#6E6E73] hover:text-[#1D1D1F] rounded-full"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2.5 py-1 text-xs text-[#6E6E73] hover:text-[#1D1D1F] border border-[#D2D2D7] rounded-lg"
            aria-label="Close search"
          >
            ESC
          </button>
        </div>
        <div
          ref={resultsRef}
          className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-[#D2D2D7]/30"
          role="listbox"
        >
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-[#6E6E73]">
              <p className="typography-body">No matching results found</p>
            </div>
          ) : (
            filteredResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelect(item);
                    }
                  }}
                  className={`flex items-center justify-between p-3.5 rounded-[16px] cursor-pointer transition-colors ${isSelected ? "bg-[#F5F5F7] text-[#1D1D1F]" : "hover:bg-[#F5F5F7]/60 text-[#1D1D1F]"}`}
                  key={item.id}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-4">
                    <div className="w-8 h-8 rounded-full bg-[#0E4D3A]/10 flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="typography-body font-medium truncate">
                          {item.title}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D2D2D7]/40 text-[#0E4D3A]">
                          {item.category}
                        </span>
                      </div>
                      <p className="typography-metadata text-[#6E6E73] truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform ${isSelected ? "text-[#0E4D3A] translate-x-1" : "text-[#6E6E73]"}`}
                    aria-hidden="true"
                  />
                </div>
              );
            })
          )}
        </div>
        <div className="px-6 py-3 bg-[#F5F5F7] border-t border-[#D2D2D7] flex items-center justify-between typography-metadata text-[#6E6E73]">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
export default SearchModal;
