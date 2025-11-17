import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings
} from "lucide-react";

const Admin = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,245",
      change: "+12%",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Applications This Month",
      value: "89",
      change: "+23%",
      icon: FileText,
      color: "text-success"
    },
    {
      title: "Revenue This Month",
      value: "$34,500",
      change: "+18%",
      icon: DollarSign,
      color: "text-accent"
    },
    {
      title: "Active Subscriptions",
      value: "892",
      change: "+8%",
      icon: TrendingUp,
      color: "text-primary"
    }
  ];

  const recentApplications = [
    {
      id: "APP001",
      businessName: "TechCorp Solutions",
      owner: "John Smith",
      status: "pending" as const,
      submittedDate: "2024-01-16",
      priority: "high"
    },
    {
      id: "APP002",
      businessName: "Green Earth Trading",
      owner: "Maria Garcia",
      status: "approved" as const,
      submittedDate: "2024-01-15",
      priority: "medium"
    },
    {
      id: "APP003",
      businessName: "Digital Innovations",
      owner: "Ahmed Hassan",
      status: "rejected" as const,
      submittedDate: "2024-01-14",
      priority: "low"
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      message: "High volume of applications pending review",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      type: "info",
      message: "Monthly report generation completed",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      type: "error",
      message: "Payment gateway maintenance scheduled",
      timestamp: "1 day ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive";
      case "medium":
        return "text-warning";
      default:
        return "text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <CheckCircle className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage the Great Chat platform
          </p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.change.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Recent Applications
            </CardTitle>
            <CardDescription>
              Latest business registration submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{app.businessName}</h4>
                    <div className="text-sm text-muted-foreground">
                      {app.owner} • {app.submittedDate}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${getPriorityColor(app.priority)}`}>
                        {app.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={app.status} />
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Applications
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              System Alerts
            </CardTitle>
            <CardDescription>
              Important notifications and system status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Platform Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Application Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending Review</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">In Progress</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Completed Today</span>
                <span className="font-medium">8</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <StatusBadge status="active" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Database</span>
                <StatusBadge status="active" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Payment Gateway</span>
                <StatusBadge status="pending" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Users</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">New Registrations</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Support Tickets</span>
                <span className="font-medium">7</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used administrative functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              Bulk Review
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              Generate Reports
            </Button>
            <Link to="/admin/payments" className="contents">
              <Button variant="outline" className="h-20 flex-col">
                <DollarSign className="h-6 w-6 mb-2" />
                Manual Payments
              </Button>
            </Link>
            <Button variant="outline" className="h-20 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              System Config
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;