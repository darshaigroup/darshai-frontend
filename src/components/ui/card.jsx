import { cn } from "@/lib/utils";

const Card = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-sm p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;