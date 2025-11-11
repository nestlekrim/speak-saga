import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatusBadge from "@/components/StatusBadge";
import { CalendarIcon } from "lucide-react";

const Activation = () => {
  // Mock activation data - replace with real data from your database
  const activationData = {
    status: "active" as "pending" | "active" | "inactive",
    startDate: "2024-01-15",
    endDate: "2025-01-15",
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Activation Details</h1>
        <p className="text-muted-foreground mt-2">View your account activation information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account Activation</CardTitle>
          <CardDescription>Your current activation status and timeline</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Status</span>
            <StatusBadge status={activationData.status} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Activation Start</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(activationData.startDate)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Activation End</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(activationData.endDate)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Activation;
