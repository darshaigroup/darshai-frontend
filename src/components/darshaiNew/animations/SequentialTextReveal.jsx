import React from "react";
import { motion, useTransform, useReducedMotion } from "motion/react";
import { MOTION } from "../../../tokens/darshaiNew/motion";
import { useResponsiveMotion } from "../../../hooks/darshaiNew/useResponsiveMotion";
function ScrollDrivenLine({
  content,
  index,
  total,
  progress,
  distance,
  className = "",
  as = "div",
}) {
  // Distribute lines across scroll range
  const segmentSize = 1 / total;
  const start = index * segmentSize * 0.85;
  const end = Math.min(1, start + segmentSize);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [distance, 0]);
  const Component = motion[as] || motion.div;
  return (
    <Component
      style={{ opacity, y }}
      className={`will-change-transform ${className}`}
    >
      {content}
    </Component>
  );
}
export function SequentialTextReveal({
  lines,
  stagger = MOTION.duration.staggerGap, // 60ms
  progress,
  className = "",
  lineClassName = "",
  distance = MOTION.distance.textSlideY, // 24px
  duration = MOTION.durationSeconds.textReveal, // 0.5s
  as = "div",
}) {
  const { shouldReduceMotion } = useResponsiveMotion();
  const prefersReduced = useReducedMotion();
  const reduce = shouldReduceMotion || Boolean(prefersReduced);
  if (reduce) {
    const Tag = as;
    return (
      <div className={className}>
        {lines.map((line, idx) => (
          <Tag className={lineClassName} key={idx}>
            {line}
          </Tag>
        ))}
      </div>
    );
  }
  // Scroll-driven mode with MotionValue
  const isMotionValue =
    typeof progress === "object" && progress !== null && "get" in progress;
  if (isMotionValue) {
    return (
      <div className={className}>
        {lines.map((line, idx) => (
          <ScrollDrivenLine
            content={line}
            index={idx}
            total={lines.length}
            progress={progress}
            distance={distance}
            className={lineClassName}
            as={as}
            key={idx}
          />
        ))}
      </div>
    );
  }
  // Number progress mode
  if (typeof progress === "number") {
    const Tag = motion[as] || motion.div;
    return (
      <div className={className}>
        {lines.map((line, idx) => {
          const segment = 1 / lines.length;
          const start = idx * segment * 0.85;
          const end = Math.min(1, start + segment);
          const lineProgress = Math.max(
            0,
            Math.min(1, (progress - start) / (end - start || 1)),
          );
          const opacity = lineProgress;
          const y = (1 - lineProgress) * distance;
          return (
            <Tag
              style={{ opacity, transform: `translateY(${y}px)` }}
              className={`will-change-transform ${lineClassName}`}
              key={idx}
            >
              {line}
            </Tag>
          );
        })}
      </div>
    );
  }
  // Viewport-triggered stagger mode
  const staggerSeconds = stagger > 1 ? stagger / 1000 : stagger;
  const Tag = motion[as] || motion.div;
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerSeconds,
          },
        },
      }}
      className={className}
    >
      {lines.map((line, idx) => (
        <Tag
          variants={{
            hidden: { opacity: 0, y: distance },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration,
                ease: MOTION.easing.entrance,
              },
            },
          }}
          className={`will-change-transform ${lineClassName}`}
          key={idx}
        >
          {line}
        </Tag>
      ))}
    </motion.div>
  );
}
export default SequentialTextReveal;
