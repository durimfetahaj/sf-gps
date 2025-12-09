import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: { value: number; positive: boolean };
  className?: string;
  variant?: "default" | "alert";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  className,
  variant = "default",
}: StatCardProps) {
  const isAlert = variant === "alert";

  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-colors duration-200",
        isAlert
          ? "border-red-500 bg-red-50 text-red-700"
          : "border-border bg-card text-card-foreground",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          {/* Title */}
          <p
            className={cn(
              "text-sm font-medium",
              isAlert ? "text-red-600" : "text-muted-foreground"
            )}
          >
            {title}
          </p>

          {/* Main Value */}
          <p
            className={cn(
              "mt-1 text-2xl font-bold",
              isAlert ? "text-red-800" : "text-card-foreground"
            )}
          >
            {value}
          </p>

          {/* Optional Subtitle */}
          {subtitle && (
            <p
              className={cn(
                "mt-1 text-xs",
                isAlert ? "text-red-600" : "text-muted-foreground"
              )}
            >
              {subtitle}
            </p>
          )}

          {/* Trend */}
          {trend && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                trend.positive ? "text-primary" : "text-destructive"
              )}
            >
              {trend.positive ? "+" : ""}
              {trend.value}% from last month
            </p>
          )}
        </div>

        {/* Optional Icon */}
        {Icon && (
          <div
            className={cn(
              "rounded-lg p-2.5",
              isAlert ? "bg-red-500/20" : "bg-secondary"
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                isAlert ? "text-red-600" : "text-primary"
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
