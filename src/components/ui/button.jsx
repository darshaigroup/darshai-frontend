import { cn } from "@/lib/utils";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;