const Avatar = ({ src, alt = "avatar", className = "" }) => {
  return (
    <img
      src={src || "/logo.png"}
      alt={alt}
      className={`w-10 h-10 rounded-full object-cover ${className}`}
    />
  );
};

export default Avatar;