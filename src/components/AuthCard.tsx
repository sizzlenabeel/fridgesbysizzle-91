
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthCardProps = {
  children: ReactNode;
  title: string;
  description?: string;
  className?: string;
};

export function AuthCard({ children, title, description, className }: AuthCardProps) {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto p-6 rounded-2xl glass-card animate-fade-in",
      className
    )}>
      <div className="space-y-2 mb-6">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
