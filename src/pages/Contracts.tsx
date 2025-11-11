import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Download, 
  PenTool, 
  CheckCircle, 
  Clock,
  Eye,
  Send
} from "lucide-react";
import OnboardingStepper from "@/components/OnboardingStepper";
import OnboardingHeader from "@/components/OnboardingHeader";

interface Contract {
  id: string;
  title: string;
  type: string;
  status: "pending" | "approved" | "signed" | "completed";
  generatedDate: string;
  signedDate?: string;
  businessName: string;
}

const Contracts = () => {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "CTR001",
      title: "Business Partnership Agreement",
      type: "Partnership Agreement",
      status: "pending",
      generatedDate: "2024-01-16",
      businessName: "TechCorp Solutions"
    },
    {
      id: "CTR002",
      title: "Service Level Agreement",
      type: "SLA",
      status: "signed",
      generatedDate: "2024-01-14",
      signedDate: "2024-01-15",
      businessName: "Green Earth Trading"
    },
    {
      id: "CTR003",
      title: "Platform Usage Agreement",
      type: "Usage Agreement",
      status: "completed",
      generatedDate: "2024-01-12",
      signedDate: "2024-01-13",
      businessName: "Digital Innovations"
    }
  ]);

  const handleGenerateContract = () => {
    const newContract: Contract = {
      id: `CTR${String(contracts.length + 1).padStart(3, '0')}`,
      title: "Business Partnership Agreement",
      type: "Partnership Agreement",
      status: "pending",
      generatedDate: new Date().toISOString().split('T')[0],
      businessName: "New Business"
    };
    
    setContracts(prev => [newContract, ...prev]);
    
    toast({
      title: "Contract Generated",
      description: "A new contract has been automatically generated and is ready for review.",
    });
  };

  const handleSignContract = (contractId: string) => {
    setContracts(prev => prev.map(contract => 
      contract.id === contractId 
        ? { 
            ...contract, 
            status: "signed" as const, 
            signedDate: new Date().toISOString().split('T')[0] 
          }
        : contract
    ));
    
    toast({
      title: "Contract Signed",
      description: "The contract has been digitally signed successfully.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "signed":
        return <PenTool className="h-4 w-4 text-primary" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  // Sample contract content for demo
  const contractContent = `
BUSINESS PARTNERSHIP AGREEMENT

This Business Partnership Agreement ("Agreement") is entered into on [DATE] between Great Chat Platform ("Platform") and [BUSINESS_NAME] ("Partner").

TERMS AND CONDITIONS:

1. PARTNERSHIP SCOPE
   The Partner agrees to utilize Great Chat's business registration and approval services for e-commerce platform integration.

2. SERVICES PROVIDED
   - Business registration processing
   - Document verification and approval
   - E-commerce platform integration support
   - Ongoing account management

3. OBLIGATIONS
   Partner Obligations:
   - Provide accurate business information
   - Submit required documentation
   - Maintain compliance with platform policies
   - Pay applicable fees as agreed

   Platform Obligations:
   - Process applications in timely manner
   - Provide support and guidance
   - Maintain data security and privacy
   - Facilitate e-commerce platform connections

4. PAYMENT TERMS
   Payment shall be made according to the selected subscription plan:
   - Trial Package: 3-month trial period
   - Annual Subscription: Full feature access

5. TERMINATION
   Either party may terminate this agreement with 30 days written notice.

6. GOVERNING LAW
   This agreement shall be governed by applicable local laws and regulations.

By signing below, both parties agree to the terms and conditions outlined in this agreement.

_________________________          _________________________
Great Chat Platform                 Partner Signature
Date: _______________              Date: _______________
  `;

  const onboardingSteps = [
    { id: 1, title: "Registration", path: "/registration", status: "completed" as const },
    { id: 2, title: "Documents", path: "/documents", status: "completed" as const },
    { id: 3, title: "Contracts", path: "/contracts", status: "active" as const },
    { id: 4, title: "Payments", path: "/payments", status: "locked" as const },
  ];

  const hasSignedContract = contracts.some(c => c.status === "signed" || c.status === "completed");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Onboarding Progress */}
      <OnboardingStepper currentStep={3} steps={onboardingSteps} />
      
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <OnboardingHeader
          title="Contract Management"
          description="Generate, review, and digitally sign business contracts"
          currentStep={3}
          totalSteps={4}
          stepStatus={hasSignedContract ? "approved" : "pending"}
          prevStep={{
            label: "Back to Documents",
            path: "/documents"
          }}
          nextStep={{
            label: "Next: Payments",
            path: "/payments",
            disabled: !hasSignedContract
          }}
        />
        <Button onClick={handleGenerateContract}>
          <FileText className="h-4 w-4 mr-2" />
          Generate New Contract
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {contracts.filter(c => c.status === "pending").length}
            </div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <PenTool className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {contracts.filter(c => c.status === "signed").length}
            </div>
            <div className="text-sm text-muted-foreground">Signed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {contracts.filter(c => c.status === "completed").length}
            </div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{contracts.length}</div>
            <div className="text-sm text-muted-foreground">Total Contracts</div>
          </CardContent>
        </Card>
      </div>

      {/* Contract List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {contracts.map((contract) => (
          <Card key={contract.id} className="transition-all hover:shadow-medium">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(contract.status)}
                    {contract.title}
                  </CardTitle>
                  <CardDescription>
                    {contract.type} • {contract.businessName}
                  </CardDescription>
                </div>
                <StatusBadge status={contract.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-1">
                <div>Generated: {contract.generatedDate}</div>
                {contract.signedDate && (
                  <div>Signed: {contract.signedDate}</div>
                )}
                <div>Contract ID: {contract.id}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                {contract.status === "pending" && (
                  <Button 
                    size="sm"
                    onClick={() => handleSignContract(contract.id)}
                  >
                    <PenTool className="h-4 w-4 mr-2" />
                    Sign Contract
                  </Button>
                )}
                {contract.status === "signed" && (
                  <Button variant="success" size="sm" disabled>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Signed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contract Preview/Signing Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Contract Preview</CardTitle>
          <CardDescription>
            Review the contract terms before signing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6 bg-muted/20 max-h-96 overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm font-mono">
              {contractContent}
            </pre>
          </div>
          
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <div className="text-sm text-muted-foreground">
              Digital signature will be applied when you sign the contract
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button>
                <PenTool className="h-4 w-4 mr-2" />
                Sign Digitally
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature Info */}
      <Card className="bg-primary-light/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <CheckCircle className="h-6 w-6 text-success mt-1" />
            <div>
              <h3 className="font-medium mb-1">Digital Signature Security</h3>
              <p className="text-sm text-muted-foreground">
                All contracts are digitally signed with encryption and timestamping to ensure 
                legal compliance and security. Your digital signature has the same legal 
                standing as a handwritten signature.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contracts;