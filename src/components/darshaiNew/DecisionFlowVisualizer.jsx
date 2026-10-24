import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Target,
  FileSpreadsheet,
  TreePine,
  Sparkles,
  Building2,
  ArrowDown,
  Play,
  Pause,
} from "lucide-react";
const DECISION_LAYERS = [
  {
    id: "you",
    stepNum: "01",
    title: "YOU",
    stageName: "UNDERSTAND YOU",
    stagePhase: "Individual Baseline",
    metric: "Biological context & constitution",
    icon: User,
    accentColor: "#34D399",
    desc: "Every journey begins with who you are—your physiological rhythm, daily stress load, and sleep architecture.",
  },
  {
    id: "goals",
    stepNum: "02",
    title: "GOALS",
    stageName: "UNDERSTAND YOU",
    stagePhase: "Restoration Intent",
    metric: "Primary & secondary wellness aims",
    icon: Target,
    accentColor: "#34D399",
    desc: "Clarifying whether you seek metabolic decompression, neurological reset, circadian alignment, or longevity.",
  },
  {
    id: "context",
    stepNum: "03",
    title: "CONTEXT",
    stageName: "UNDERSTAND CONTEXT",
    stagePhase: "Lifestyle Telemetry",
    metric: "Schedule, climate sensitivity & readiness",
    icon: FileSpreadsheet,
    accentColor: "#38BDF8",
    desc: "Accounting for time availability, seasonal transition windows, prior treatments, and travel comfort.",
  },
  {
    id: "environment",
    stepNum: "04",
    title: "ENVIRONMENT",
    stageName: "MAP ENVIRONMENT",
    stagePhase: "Bioclimatic Intelligence",
    metric: "Altitude, salinity, humidity & phytoncides",
    icon: TreePine,
    accentColor: "#C6A660",
    desc: "Mapping specific microclimates—from maritime negative ions in Kerala to sub-alpine barometrics in the Himalayas.",
  },
  {
    id: "programme",
    stepNum: "05",
    title: "PROGRAMME",
    stageName: "MAP ENVIRONMENT",
    stagePhase: "Clinical Protocol",
    metric: "Tailored therapeutic methodologies",
    icon: Sparkles,
    accentColor: "#C6A660",
    desc: "Selecting authentic Panchakarma, Ayurvedic medicine, naturopathic detox, or integrative recovery regimes.",
  },
  {
    id: "centre",
    stepNum: "06",
    title: "CENTRE",
    stageName: "MATCH",
    stagePhase: "Verified Destination",
    metric: "Audited sovereign sanctuaries",
    icon: Building2,
    accentColor: "#10B981",
    desc: "Connecting you to rigorous, pre-evaluated centres across India equipped to deliver your bespoke itinerary.",
  },
];
const STAGES = [
  {
    id: "understand-you",
    label: "UNDERSTAND YOU",
    activeRange: [0, 1],
    color: "#34D399",
  },
  {
    id: "understand-context",
    label: "UNDERSTAND CONTEXT",
    activeRange: [2],
    color: "#38BDF8",
  },
  {
    id: "map-environment",
    label: "MAP ENVIRONMENT",
    activeRange: [3, 4],
    color: "#C6A660",
  },
  { id: "match", label: "MATCH", activeRange: [5], color: "#10B981" },
];
export function DecisionFlowVisualizer() {
  const [activeLayerIndex, setActiveLayerIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef(null);
  // Auto-cycle through the 6 layers smoothly
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveLayerIndex((prev) => (prev + 1) % DECISION_LAYERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying]);
  const currentLayer = DECISION_LAYERS[activeLayerIndex];
  // Derive current phase
  const currentStage =
    STAGES.find((s) => s.activeRange.includes(activeLayerIndex)) || STAGES[0];
  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-[24px] lg:rounded-[28px] overflow-hidden bg-[#0D1411] border border-white/15 shadow-2xl text-white flex flex-col"
    >
      <div className="absolute top-0 right-10 w-64 h-64 bg-[#0E4D3A]/40 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#C6A660]/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="relative z-10 px-5 sm:px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-widest text-[#C6A660] uppercase">
              CONCEPTUAL BRIDGE
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold tracking-tight text-white">
                {currentStage.label}
              </span>
              <span className="text-[10px] font-mono text-white/50">
                ({activeLayerIndex + 1}/6)
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-mono text-white/80 hover:text-white transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Pause className="w-3 h-3 text-[#34D399]" />
              <span className="hidden sm:inline">Auto</span>
            </>
          ) : (
            <>
              <Play className="w-3 h-3 text-[#C6A660]" />
              <span className="hidden sm:inline">Play</span>
            </>
          )}
        </button>
      </div>
      <div className="relative z-10 p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-2">
        <div className="space-y-1.5 sm:space-y-2">
          {DECISION_LAYERS.map((layer, index) => {
            const Icon = layer.icon;
            const isCurrent = activeLayerIndex === index;
            const isPassed = activeLayerIndex > index;
            return (
              <>
                <div
                  onClick={() => {
                    setActiveLayerIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`group relative flex items-center justify-between p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? "bg-white/[0.12] border-white/40 shadow-[0_0_20px_rgba(52,211,153,0.15)] translate-x-1"
                      : isPassed
                        ? "bg-white/[0.04] border-white/15 opacity-85 hover:opacity-100"
                        : "bg-black/30 border-white/5 opacity-50 hover:opacity-75"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isCurrent
                          ? "bg-[#0E4D3A] text-[#34D399] border border-[#34D399]/40"
                          : isPassed
                            ? "bg-white/10 text-white/90"
                            : "bg-white/5 text-white/40"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-[#C6A660]">
                          {layer.stepNum}
                        </span>
                        <h4
                          className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${isCurrent ? "text-white" : "text-white/80"}`}
                        >
                          {layer.title}
                        </h4>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-white/60 font-mono hidden sm:block">
                        {layer.metric}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md border transition-all ${
                        isCurrent
                          ? "bg-[#0E4D3A]/80 text-[#34D399] border-[#34D399]/40 font-semibold"
                          : isPassed
                            ? "bg-white/5 text-white/60 border-white/10"
                            : "bg-transparent text-white/30 border-transparent"
                      }`}
                    >
                      {layer.stageName}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-[#34D399] animate-ping shrink-0" />
                    )}
                  </div>
                </div>
                {index < DECISION_LAYERS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        index < activeLayerIndex
                          ? "text-[#34D399] opacity-80"
                          : index === activeLayerIndex
                            ? "text-[#C6A660] opacity-100 animate-bounce"
                            : "text-white/20 opacity-30"
                      }`}
                    />
                  </div>
                )}
              </>
            );
          })}
        </div>
        <div className="mt-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-black/50 border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A660]">
                ACTIVE PARAMETER
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[11px] font-semibold text-white">
                {currentLayer.stagePhase}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#34D399]">
              Layer {currentLayer.stepNum}
            </span>
          </div>
          <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed font-normal">
            {currentLayer.desc}
          </p>
        </div>
        <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-white/10">
          <span>Personal Context</span>
          <span className="text-[#34D399] font-bold">
            → Geo-Wellness Match →
          </span>
          <span>Curated Sanctuary</span>
        </div>
      </div>
    </div>
  );
}
export default DecisionFlowVisualizer;
