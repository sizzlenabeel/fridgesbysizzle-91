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
  return <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className={cn("flex items-center justify-center bg-sizzle-600 text-white font-bold rounded-full", sizeClasses[size])}>
          <img alt="sizzle!" src="/lovable-uploads/9e8403ca-e775-4de0-967f-fa889df75238.png" className="w-full h-full rounded-full object-fill" />
        </div>
      </div>
      {showText && <span className={cn("font-bold tracking-tight", textSizeClasses[size], textClassName)}>
          sizzle<span className="text-slate-950">!</span>
        </span>}
    </div>;
}