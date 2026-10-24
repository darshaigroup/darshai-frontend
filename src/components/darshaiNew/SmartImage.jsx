import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
const APPLE_EASE = [0.22, 1, 0.36, 1];
export function buildUnsplashSrcSet(rawUrl) {
  if (!rawUrl || !rawUrl.includes("images.unsplash.com")) {
    return undefined;
  }
  try {
    const urlObj = new URL(rawUrl);
    const widths = [400, 800, 1200, 1800];
    return widths
      .map((w) => {
        const params = new URLSearchParams(urlObj.search);
        params.set("w", w.toString());
        params.set("fm", "webp");
        params.set("q", "75");
        params.set("auto", "format");
        return `${urlObj.origin}${urlObj.pathname}?${params.toString()} ${w}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
}
export function formatUnsplashSrc(rawUrl, priority) {
  if (!rawUrl || !rawUrl.includes("images.unsplash.com")) {
    return rawUrl;
  }
  try {
    const urlObj = new URL(rawUrl);
    if (!urlObj.searchParams.has("fm")) urlObj.searchParams.set("fm", "webp");
    if (!urlObj.searchParams.has("q")) urlObj.searchParams.set("q", "75");
    if (!urlObj.searchParams.has("auto"))
      urlObj.searchParams.set("auto", "format");
    if (priority && !urlObj.searchParams.has("w")) {
      urlObj.searchParams.set("w", "1800");
    }
    return urlObj.toString();
  } catch {
    return rawUrl;
  }
}
export function SmartImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  decorative = false,
  style = {},
  clipReveal = true,
  revealDuration = 0.75, // 750ms within 600–900ms range
  revealDelay = 0,
  revealDirection = "top-to-bottom",
  ...rest
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const finalAlt = decorative ? "" : alt;
  const optimizedSrc = formatUnsplashSrc(src, priority);
  const srcSet = buildUnsplashSrcSet(src);
  // Compute aspect ratio style to prevent layout shifts
  const computedStyle = {
    ...style,
    ...(aspectRatio ? { aspectRatio } : {}),
  };
  if (hasError) {
    return (
      <div
        className={`bg-[#1D1D1F] flex items-center justify-center text-white/40 overflow-hidden relative ${className}`}
        style={computedStyle}
        aria-label={finalAlt || "Image unavailable"}
        role={decorative ? "presentation" : "img"}
      >
        <span className="typography-metadata text-white/30 tracking-widest uppercase">
          DARSHAI
        </span>
      </div>
    );
  }
  const getInitialClip = () => {
    switch (revealDirection) {
      case "bottom-to-top":
        return "inset(100% 0% 0% 0%)";
      case "left-to-right":
        return "inset(0% 100% 0% 0%)";
      case "top-to-bottom":
      default:
        return "inset(0% 0% 100% 0%)";
    }
  };
  // If reduced motion is requested or clipReveal is explicitly disabled, render standard image
  if (shouldReduceMotion || !clipReveal) {
    return (
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={finalAlt}
        width={width}
        height={height}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        aria-hidden={decorative ? "true" : undefined}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        style={computedStyle}
        className={`transition-opacity duration-300 ${isLoaded || priority ? "opacity-100" : "opacity-90"} ${className}`}
      />
    );
  }
  return (
    <motion.img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={finalAlt}
      width={width}
      height={height}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      aria-hidden={decorative ? "true" : undefined}
      onError={() => setHasError(true)}
      onLoad={() => setIsLoaded(true)}
      style={computedStyle}
      initial={{
        clipPath: getInitialClip(),
        scale: 1.05,
      }}
      whileInView={{
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1.0,
      }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{
        clipPath: {
          duration: revealDuration,
          delay: revealDelay,
          ease: APPLE_EASE,
        },
        scale: {
          duration: revealDuration + 0.1,
          delay: revealDelay,
          ease: APPLE_EASE,
        },
      }}
      className={`will-change-[clip-path,transform] ${className}`}
    />
  );
}
export default SmartImage;
