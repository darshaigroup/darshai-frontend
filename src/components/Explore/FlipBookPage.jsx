import { useParams, useNavigate } from "react-router-dom";
import FlipBookViewer from "./FlipBookViewer";

export default function FlipBookPage() {
  const { file } = useParams();
  const navigate = useNavigate();

  // ❌ Safety check
  if (!file) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p>Invalid file</p>
      </div>
    );
  }

  const pdfPath = `/pdfs/${file}.pdf`;

  return (
    <FlipBookViewer
      pdf={pdfPath}
      onClose={() => navigate(-1)}
    />
  );
}