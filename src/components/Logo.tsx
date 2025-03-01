
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  textClassName?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

export function Logo({ 
  className, 
  textClassName, 
  showText = true, 
  size = "md" 
}: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="absolute inset-0 bg-sizzle-600 rounded-full animate-pulse opacity-50"></div>
        <div className={cn("flex items-center justify-center bg-sizzle-600 text-white font-bold rounded-full", sizeClasses[size])}>
          <span className="relative -top-0.5">s!</span>
        </div>
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", textSizeClasses[size], textClassName)}>
          sizzle<span className="text-sizzle-600">!</span>
        </span>
      )}
    </div>
  );
}
