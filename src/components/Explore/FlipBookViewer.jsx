import { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import * as pdfjsLib from "pdfjs-dist";

// ✅ worker setup (REQUIRED)
import worker from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjsLib.GlobalWorkerOptions.workerSrc = worker;

export default function FlipBookViewer({ pdf, onClose }) {
  const [pages, setPages] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [pageWidth, setPageWidth] = useState(600);
  const [pageHeight, setPageHeight] = useState(800);

  const containerRef = useRef(null);
  const bookRef = useRef(null);
  const flipSoundRef = useRef(null);

  // 🔊 Flip sound
  const playFlipSound = () => {
    if (flipSoundRef.current) {
      flipSoundRef.current.currentTime = 0;
      flipSoundRef.current.play().catch(() => {});
    }
  };

  // 📱 Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      const height = window.innerHeight;

      const mobile = width < 768;
      setIsMobile(mobile);

      if (mobile) {
        setPageWidth(width - 20);
        setPageHeight(height * 0.85);
      } else {
        setPageWidth(width / 2 - 60);
        setPageHeight(height * 0.85);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 📄 Load PDF manually
  useEffect(() => {
    const loadPDF = async () => {
      const pdfDoc = await pdfjsLib.getDocument(pdf).promise;

      const loadedPages = [];

      for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);

        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        loadedPages.push(canvas.toDataURL());
      }

      setPages(loadedPages);
    };

    loadPDF();
  }, [pdf]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 🔊 SOUND */}
      <audio ref={flipSoundRef} src="/sounds/page-flip.mp3" />

      {/* ❌ CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 text-white"
      >
        ✕
      </button>

      {/* 📖 BOOK */}
      {pages.length > 0 && (
        <HTMLFlipBook
          ref={bookRef}
          width={pageWidth}
          height={pageHeight}
          showCover={!isMobile}
          usePortrait={isMobile}
          drawShadow
          onFlip={playFlipSound}
        >
          {pages.map((src, i) => (
            <div
              key={i}
              className="w-full h-full flex items-center justify-center bg-white"
            >
              <img
                src={src}
                alt={`Page ${i + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </HTMLFlipBook>
      )}
    </div>
  );
}