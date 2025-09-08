import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import StatusBadge from "@/components/StatusBadge";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  CreditCard, 
  AlertCircle,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-business.jpg";

const Dashboard = () => {
  const registrationProgress = 75;
  
  const stats = [
    {
      title: "Total Applications",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-primary"
    },
    {
      title: "Approved",
      value: "18",
      change: "+8%",
      icon: CheckCircle,
      color: "text-success"
    },
    {
      title: "Pending Review",
      value: "4",
      change: "-2%",
      icon: AlertCircle,
      color: "text-warning"
    },
    {
      title: "Revenue",
      value: "$12,500",
      change: "+15%",
      icon: DollarSign,
      color: "text-accent"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Registration submitted",
      time: "2 hours ago",
      status: "pending" as const
    },
    {
      id: 2,
      action: "Document approved",
      time: "4 hours ago",
      status: "approved" as const
    },
    {
      id: 3,
      action: "Contract signed",
      time: "1 day ago",
      status: "completed" as const
    }
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-hover/90" />
          <div className="relative h-full flex items-center justify-between p-8">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                Welcome to Great Chat
              </h1>
              <p className="text-primary-foreground/90 text-lg">
                Streamline your business registration and approval process
              </p>
            </div>
            <Button variant="hero" size="lg" asChild>
              <Link to="/register">
                Start Registration
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
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
        {/* Registration Progress */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Registration Progress
            </CardTitle>
            <CardDescription>
              Complete your business registration to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{registrationProgress}%</span>
              </div>
              <Progress value={registrationProgress} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Business Information</span>
                <StatusBadge status="completed" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Document Upload</span>
                <StatusBadge status="approved" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Finance Approval</span>
                <StatusBadge status="pending" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Contract Signing</span>
                <StatusBadge status="draft" />
              </div>
            </div>
            
            <Button className="w-full" asChild>
              <Link to="/register">
                Continue Registration
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest application updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <StatusBadge status={activity.status} />
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link to="/documents">
                <Upload className="h-6 w-6 mb-2" />
                Upload Documents
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link to="/contracts">
                <FileText className="h-6 w-6 mb-2" />
                View Contracts
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link to="/payments">
                <CreditCard className="h-6 w-6 mb-2" />
                Manage Payments
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;