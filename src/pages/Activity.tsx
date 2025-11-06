import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Activity, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ActivityPage = () => {
  const activities = [
    { id: 1, title: "Account recovery successful", time: "12 mins ago", status: "completed" },
    { id: 2, title: "Account recovery successful", time: "2 hours ago", status: "completed" },
    { id: 3, title: "Subscription activated", time: "10 days ago", status: "completed" },
    { id: 4, title: "Payments configured", time: "10 days ago", status: "completed" },
    { id: 5, title: "Payments configured", time: "10 days ago", status: "completed" },
    { id: 6, title: "Document uploaded: Business License", time: "15 days ago", status: "completed" },
    { id: 7, title: "Registration submitted for review", time: "15 days ago", status: "pending" },
    { id: 8, title: "Contract signed: Service Agreement", time: "20 days ago", status: "completed" },
    { id: 9, title: "Payment received: $5,000", time: "22 days ago", status: "completed" },
    { id: 10, title: "Application approved", time: "25 days ago", status: "approved" },
    { id: 11, title: "Document rejected: Tax Certificate", time: "30 days ago", status: "rejected" },
    { id: 12, title: "Document uploaded: Tax Certificate", time: "32 days ago", status: "completed" },
    { id: 13, title: "Registration draft saved", time: "35 days ago", status: "draft" },
    { id: 14, title: "Account created", time: "40 days ago", status: "completed" },
    { id: 15, title: "Email verified", time: "40 days ago", status: "completed" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Activity History</h1>
        <p className="text-muted-foreground">View all your application updates and activities</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Complete history of your account activities</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search activities..." className="pl-9" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div>
                  <h3 className="font-medium">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                </div>
                <StatusBadge status={activity.status as any} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityPage;
