import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Eye,
  Trash2
} from "lucide-react";
import OnboardingStepper from "@/components/OnboardingStepper";
import OnboardingHeader from "@/components/OnboardingHeader";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  status: "pending" | "approved" | "rejected";
  uploadDate: string;
  size?: string;
  required: boolean;
}

const Documents = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "1",
      name: "Valid ID of Signatory",
      type: "PDF, JPEG, PNG",
      status: "approved",
      uploadDate: "2024-01-15",
      size: "2.3 MB",
      required: true
    },
    {
      id: "2",
      name: "DTI Certificate",
      type: "PDF",
      status: "pending",
      uploadDate: "2024-01-16",
      size: "1.8 MB",
      required: true
    },
    {
      id: "3",
      name: "BIR Form 2303",
      type: "PDF",
      status: "rejected",
      uploadDate: "2024-01-14",
      size: "1.2 MB",
      required: true
    },
    {
      id: "4",
      name: "Business Permit",
      type: "PDF",
      status: "pending",
      uploadDate: "",
      required: true
    }
  ]);

  const requiredDocuments = [
    {
      name: "Valid ID of Signatory",
      formats: "PDF, JPEG, PNG",
      description: "Government-issued ID of the person authorized to sign documents"
    },
    {
      name: "DTI Certificate",
      formats: "PDF",
      description: "Department of Trade and Industry registration certificate"
    },
    {
      name: "BIR Form 2303",
      formats: "PDF",
      description: "Bureau of Internal Revenue certificate of registration"
    },
    {
      name: "Business Permit",
      formats: "PDF",
      description: "Local government unit business permit"
    }
  ];

  const handleFileUpload = (documentName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDocument: DocumentItem = {
        id: Date.now().toString(),
        name: documentName,
        type: file.type,
        status: "pending",
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        required: true
      };

      setDocuments(prev => {
        const existingIndex = prev.findIndex(doc => doc.name === documentName);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = newDocument;
          return updated;
        }
        return [...prev, newDocument];
      });

      toast({
        title: "Document Uploaded",
        description: `${documentName} has been uploaded successfully.`,
      });
    }
  };

  const handleDelete = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "Document Deleted",
      description: "The document has been removed.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Upload className="h-4 w-4 text-warning" />;
    }
  };

  const getUploadedDocument = (documentName: string) => {
    return documents.find(doc => doc.name === documentName);
  };

  const onboardingSteps = [
    { id: 1, title: "Registration", path: "/registration", status: "completed" as const },
    { id: 2, title: "Documents", path: "/documents", status: "active" as const },
    { id: 3, title: "Contracts", path: "/contracts", status: "locked" as const },
    { id: 4, title: "Payments", path: "/payments", status: "locked" as const },
  ];

  const allDocsUploaded = requiredDocuments.length === documents.filter(d => d.uploadDate).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Onboarding Progress */}
      <OnboardingStepper currentStep={2} steps={onboardingSteps} />
      
      {/* Header with Navigation */}
      <OnboardingHeader
        title="Document Management"
        description="Upload and manage your required business documents"
        currentStep={2}
        totalSteps={4}
        stepStatus={allDocsUploaded ? "approved" : "pending"}
        prevStep={{
          label: "Back to Registration",
          path: "/registration"
        }}
        nextStep={{
          label: "Next: Contracts",
          path: "/contracts",
          disabled: !allDocsUploaded
        }}
      />

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-success">
              {documents.filter(d => d.status === "approved").length}
            </div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-warning">
              {documents.filter(d => d.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {documents.filter(d => d.status === "rejected").length}
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">
              {requiredDocuments.length - documents.filter(d => d.uploadDate).length}
            </div>
            <div className="text-sm text-muted-foreground">Missing</div>
          </CardContent>
        </Card>
      </div>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-primary" />
            Required Documents
          </CardTitle>
          <CardDescription>
            Upload all required documents to proceed with your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {requiredDocuments.map((docReq, index) => {
              const uploadedDoc = getUploadedDocument(docReq.name);
              
              return (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{docReq.name}</h3>
                        <span className="text-sm text-destructive">*</span>
                        {uploadedDoc && getStatusIcon(uploadedDoc.status)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {docReq.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Accepted formats: {docReq.formats}
                      </p>
                    </div>
                    {uploadedDoc && (
                      <StatusBadge status={uploadedDoc.status} />
                    )}
                  </div>

                  {uploadedDoc ? (
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium">
                              {docReq.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {uploadedDoc.size} • Uploaded {uploadedDoc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(uploadedDoc.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop your file here or click to upload
                      </p>
                      <Label htmlFor={`upload-${index}`} className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                      <Input
                        id={`upload-${index}`}
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload(docReq.name, e)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Submit for Review */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium mb-1">Ready to Submit?</h3>
              <p className="text-sm text-muted-foreground">
                All required documents must be uploaded before submission
              </p>
            </div>
            <Button 
              disabled={requiredDocuments.length !== documents.filter(d => d.uploadDate).length}
              onClick={() => toast({
                title: "Documents Submitted",
                description: "Your documents have been submitted for finance approval.",
              })}
            >
              Submit for Finance Approval
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Documents;