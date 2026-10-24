import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PROGRAMS_DATA } from "../../data/darshaiNew/programsData";
import UnifiedProgramDetailView from "../../components/darshaiNew/programs/UnifiedProgramDetailView";
import { track } from "../../lib/darshaiNew/analytics";
export function ProgramDetailPage({ onNavigate, programSlug }) {
  const params = useParams();
  const navigate = useNavigate();
  const rawSlug = (programSlug || params.slug || "restore").toLowerCase();
  const slug = rawSlug.replace(/^darshai-/, "");
  const program = PROGRAMS_DATA[slug] || PROGRAMS_DATA["restore"];
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    track("programme_select", { program: program.name, slug: program.slug });
  }, [program.slug, program.name]);
  return <UnifiedProgramDetailView program={program} onNavigate={onNavigate} />;
}
export default ProgramDetailPage;
