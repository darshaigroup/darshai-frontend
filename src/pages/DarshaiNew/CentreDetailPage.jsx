import React from "react";
import { useParams } from "react-router-dom";
import {
  getCentreBySlug,
  CENTRES_DATA,
} from "../../data/darshaiNew/centresData";
import UnifiedCentreDetailView from "../../components/darshaiNew/centres/UnifiedCentreDetailView";
export function CentreDetailPage({ onNavigate }) {
  const { slug } = useParams();
  // Resolve centre by slug or aliases (kanasu, chitrakoota, shathayu, etc.)
  const centre = getCentreBySlug(slug || "kanasu") || CENTRES_DATA.kanasu;
  return <UnifiedCentreDetailView centre={centre} onNavigate={onNavigate} />;
}
export default CentreDetailPage;
