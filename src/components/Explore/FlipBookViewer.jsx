import { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { pdfjs, Document, Page } from "react-pdf";
import worker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export default function FlipBookViewer({ pdf, onClose }) {
  const [numPages, setNumPages] = useState(null);
  const [isOpened, setIsOpened] = useState(false);

  const [pageWidth, setPageWidth] = useState(600);
  const [pageHeight, setPageHeight] = useState(800);
  const [isMobile, setIsMobile] = useState(false);

  const bookRef = useRef(null);
  const flipSoundRef = useRef(null);
  const containerRef = useRef(null);

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
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = window.innerHeight;

      const mobile = containerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        // 📱 MOBILE → single page full width
        const width = containerWidth - 20;
        setPageWidth(width);
        setPageHeight(containerHeight * 0.85);
      } else {
        // 💻 DESKTOP → 2-page spread
        const width = containerWidth / 2 - 60;
        setPageWidth(width);
        setPageHeight(containerHeight * 0.85);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 📖 Auto open animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpened(true);

      setTimeout(() => {
        bookRef.current?.pageFlip().flipNext();
      }, 600);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* 🔊 SOUND */}
      <audio
        ref={flipSoundRef}
        src="/sounds/page-flip.mp3"
        preload="auto"
      />

      {/* ❌ CLOSE */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-11 h-11 rounded-full bg-white/10 backdrop-blur text-white border border-white/20 hover:bg-white/20 transition"
      >
        ✕
      </button>

      {/* 🌫 BACKGROUND GLOW */}
      <div className="absolute w-[80%] h-[80%] bg-green-700/20 blur-[140px] rounded-full" />

      {/* 📚 PAGE STACK (DEPTH EFFECT) */}
      {!isMobile && (
        <>
          <div className="absolute w-[80%] h-[85%] bg-white/5 rounded-[20px] blur-[2px] translate-x-4 translate-y-4" />
          <div className="absolute w-[80%] h-[85%] bg-white/10 rounded-[20px] blur-[1px] translate-x-2 translate-y-2" />
        </>
      )}

      {/* 📖 BOOK WRAPPER */}
      <div
        className={`relative transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpened ? "scale-100 rotate-0" : "scale-75 rotate-[-6deg]"
        }`}
      >
        <Document
          file={pdf}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="text-white">Loading PDF...</div>}
          onLoadError={(err) => console.error("PDF ERROR:", err)}
        >
          {numPages && (
            <HTMLFlipBook
              ref={bookRef}
              width={pageWidth}
              height={pageHeight}
              size="fixed"
              showCover={!isMobile}
              usePortrait={isMobile}
              mobileScrollSupport={true}
              drawShadow={true}
              maxShadowOpacity={0.5}
              className="shadow-[0_60px_160px_rgba(0,0,0,0.9)]"
              onFlip={playFlipSound}
            >
              {Array.from(new Array(numPages), (_, i) => (
                <div
                  key={i}
                  className="relative w-full h-full bg-white overflow-hidden flex items-center justify-center"
                >
                  {/* 📄 FULL PAGE */}
                 <Page
  pageNumber={i + 1}
  scale={Math.min(
    pageWidth / 600,     // fit width
    pageHeight / 800     // fit height
  )}
  renderTextLayer={false}
  renderAnnotationLayer={false}
/>

                  {/* 🌗 EDGE SHADING */}
                  {!isMobile && (
                    <>
                      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                    </>
                  )}
                </div>
              ))}
            </HTMLFlipBook>
          )}
        </Document>
      </div>
    </div>
  );
}