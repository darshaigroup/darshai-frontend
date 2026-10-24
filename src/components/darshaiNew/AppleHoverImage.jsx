import React from "react";
export function AppleHoverImage({
  children,
  className = "",
  disabled = false,
}) {
  if (disabled) return <div className={className}>{children}</div>;
  return <div className={`apple-product-card ${className}`}>{children}</div>;
}
export default AppleHoverImage;
