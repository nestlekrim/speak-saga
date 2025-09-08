import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  User,
  Building,
  Calendar,
  MessageSquare
} from "lucide-react";

interface Application {
  id: string;
  businessName: string;
  ownerName: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  documents: number;
  remarks?: string;
}

const Approval = () => {
  const { toast } = useToast();
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [remarks, setRemarks] = useState("");
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP001",
      businessName: "TechCorp Solutions",
      ownerName: "John Smith",
      submissionDate: "2024-01-15",
      status: "pending",
      documents: 4
    },
    {
      id: "APP002",
      businessName: "Green Earth Trading",
      ownerName: "Maria Garcia",
      submissionDate: "2024-01-14",
      status: "approved",
      documents: 4,
      remarks: "All documents verified successfully."
    },
    {
      id: "APP003",
      businessName: "Digital Innovations",
      ownerName: "Ahmed Hassan",
      submissionDate: "2024-01-13",
      status: "rejected",
      documents: 3,
      remarks: "Missing business permit. Please resubmit with complete documentation."
    },
    {
      id: "APP004",
      businessName: "Creative Designs Ltd",
      ownerName: "Sarah Johnson",
      submissionDate: "2024-01-16",
      status: "pending",
      documents: 4
    }
  ]);

  const handleApprove = (applicationId: string) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: "approved" as const, remarks }
        : app
    ));
    
    toast({
      title: "Application Approved",
      description: "The application has been approved and the user will be notified.",
    });
    
    setSelectedApplication(null);
    setRemarks("");
  };

  const handleReject = (applicationId: string) => {
    if (!remarks.trim()) {
      toast({
        title: "Remarks Required",
        description: "Please provide mandatory remarks for rejection.",
        variant: "destructive"
      });
      return;
    }

    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, status: "rejected" as const, remarks }
        : app
    ));
    
    toast({
      title: "Application Rejected",
      description: "The application has been rejected and the user will be notified.",
    });
    
    setSelectedApplication(null);
    setRemarks("");
  };

  const pendingApplications = applications.filter(app => app.status === "pending");
  const approvedApplications = applications.filter(app => app.status === "approved");
  const rejectedApplications = applications.filter(app => app.status === "rejected");

  const renderApplicationCard = (application: Application) => (
    <Card key={application.id} className="transition-all hover:shadow-medium">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">{application.businessName}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {application.ownerName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {application.submissionDate}
              </div>
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {application.documents} documents
              </div>
            </div>
          </div>
          <StatusBadge status={application.status} />
        </div>

        {application.remarks && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Remarks</span>
            </div>
            <p className="text-sm text-muted-foreground">{application.remarks}</p>
          </div>
        )}

        {application.status === "pending" && (
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              onClick={() => setSelectedApplication(application.id)}
            >
              Review Application
            </Button>
            <Button variant="outline" size="sm">
              View Documents
            </Button>
          </div>
        )}

        {application.status !== "pending" && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              View Details
            </Button>
            <Button variant="ghost" size="sm">
              View Documents
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Application Approval</h1>
        <p className="text-muted-foreground">
          Review and approve business registration applications
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{pendingApplications.length}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{approvedApplications.length}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <div className="text-2xl font-bold">{rejectedApplications.length}</div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Building className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{applications.length}</div>
            <div className="text-sm text-muted-foreground">Total Applications</div>
          </CardContent>
        </Card>
      </div>

      {/* Review Modal/Panel */}
      {selectedApplication && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Review Application</CardTitle>
            <CardDescription>
              Application ID: {selectedApplication}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Enter your remarks here..."
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                * Mandatory for rejections
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="success"
                onClick={() => handleApprove(selectedApplication)}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
              <Button 
                variant="destructive"
                onClick={() => handleReject(selectedApplication)}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedApplication(null);
                  setRemarks("");
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Applications */}
      {pendingApplications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-warning" />
            Pending Applications ({pendingApplications.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pendingApplications.map(renderApplicationCard)}
          </div>
        </div>
      )}

      {/* Recent Approved Applications */}
      {approvedApplications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Recent Approved Applications
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {approvedApplications.slice(0, 4).map(renderApplicationCard)}
          </div>
        </div>
      )}

      {/* Recent Rejected Applications */}
      {rejectedApplications.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <XCircle className="h-5 w-5 text-destructive" />
            Recent Rejected Applications
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {rejectedApplications.slice(0, 4).map(renderApplicationCard)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Approval;