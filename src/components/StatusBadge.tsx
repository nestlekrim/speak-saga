import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "pending" | "approved" | "rejected" | "draft" | "completed" | "active" | "inactive" | "signed" | "failed";
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
      case "active":
      case "signed":
        return "bg-success-light text-success border-success/20";
      case "pending":
        return "bg-warning-light text-warning border-warning/20";
      case "rejected":
      case "inactive":
      case "failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "draft":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        getStatusStyles(status),
        className
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;