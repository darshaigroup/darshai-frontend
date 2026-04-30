import { cn } from "@/lib/utils";

const Input = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500",
        className
      )}
      {...props}
    />
  );
};

export default Input;