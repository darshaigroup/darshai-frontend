const Badge = ({ children, className = "" }) => {
  return (
    <span
      className={`text-xs px-2 py-1 rounded-full bg-green-100 text-green-600 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;