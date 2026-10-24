import React from "react";
import useTouchHover from "../../../hooks/darshaiNew/useTouchHover";

export default function TouchHover({
  children,
  className = "",
  activeClassName = "",
  as: Component = "div",
  ...props
}) {
  const {
    ref,
    isTouchActive,
    touchProps,
  } = useTouchHover();

  return (
    <Component
      ref={ref}
      {...touchProps}
      {...props}
      className={`
        ${className}
        ${isTouchActive ? activeClassName : ""}
      `.trim()}
      data-touch-active={isTouchActive ? "true" : "false"}
    >
      {children}
    </Component>
  );
}