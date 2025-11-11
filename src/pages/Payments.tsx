import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/StatusBadge";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Calendar,
  Receipt,
  AlertCircle,
  ExternalLink
} from "lucide-react";
import OnboardingStepper from "@/components/OnboardingStepper";
import OnboardingHeader from "@/components/OnboardingHeader";

interface PaymentRecord {
  id: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  dueDate: string;
  paidDate?: string;
  description: string;
  subscriptionPlan: string;
}

const Payments = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<PaymentRecord[]>([
    {
      id: "PAY001",
      invoiceNumber: "INV-2024-001",
      amount: 99.99,
      currency: "USD",
      status: "completed",
      dueDate: "2024-01-15",
      paidDate: "2024-01-14",
      description: "Annual Subscription - Great Chat Platform",
      subscriptionPlan: "Annual Subscription"
    },
    {
      id: "PAY002",
      invoiceNumber: "INV-2024-002",
      amount: 29.99,
      currency: "USD",
      status: "pending",
      dueDate: "2024-02-15",
      description: "Monthly Subscription - Great Chat Platform",
      subscriptionPlan: "Monthly Plan"
    },
    {
      id: "PAY003",
      invoiceNumber: "INV-2024-003",
      amount: 49.99,
      currency: "USD",
      status: "failed",
      dueDate: "2024-01-10",
      description: "Setup Fee - Platform Integration",
      subscriptionPlan: "One-time Setup"
    }
  ]);

  const [currentSubscription] = useState({
    plan: "Annual Subscription",
    status: "active",
    nextBilling: "2025-01-14",
    amount: 99.99,
    features: [
      "Full platform access",
      "Unlimited applications",
      "Priority support",
      "Advanced analytics",
      "Multi-platform integration"
    ]
  });

  const handlePayNow = (paymentId: string) => {
    // Simulate payment gateway redirect
    toast({
      title: "Redirecting to Payment Gateway",
      description: "You will be redirected to complete your payment.",
    });
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      setPayments(prev => prev.map(payment => 
        payment.id === paymentId 
          ? { 
              ...payment, 
              status: "completed" as const, 
              paidDate: new Date().toISOString().split('T')[0] 
            }
          : payment
      ));
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const totalPaid = payments
    .filter(p => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter(p => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);

  const onboardingSteps = [
    { id: 1, title: "Registration", path: "/registration", status: "completed" as const },
    { id: 2, title: "Documents", path: "/documents", status: "completed" as const },
    { id: 3, title: "Contracts", path: "/contracts", status: "completed" as const },
    { id: 4, title: "Payments", path: "/payments", status: "active" as const },
  ];

  const hasCompletedPayment = payments.some(p => p.status === "completed");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Onboarding Progress */}
      <OnboardingStepper currentStep={4} steps={onboardingSteps} />
      
      {/* Header with Navigation */}
      <OnboardingHeader
        title="Payment Management"
        description="Manage your subscription and payment history"
        currentStep={4}
        totalSteps={4}
        stepStatus={hasCompletedPayment ? "completed" : "pending"}
        prevStep={{
          label: "Back to Contracts",
          path: "/contracts"
        }}
      />

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold">{formatCurrency(totalPaid, "USD")}</div>
            <div className="text-sm text-muted-foreground">Total Paid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold">{formatCurrency(pendingAmount, "USD")}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Receipt className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{payments.length}</div>
            <div className="text-sm text-muted-foreground">Total Invoices</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold">{currentSubscription.nextBilling}</div>
            <div className="text-sm text-muted-foreground">Next Billing</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Current Subscription
            </CardTitle>
            <CardDescription>
              Your active subscription details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{currentSubscription.plan}</span>
              <Badge variant="secondary" className="bg-success-light text-success">
                {currentSubscription.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-medium">
                  {formatCurrency(currentSubscription.amount, "USD")}/year
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Next Billing:</span>
                <span className="font-medium">{currentSubscription.nextBilling}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Included Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                {currentSubscription.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-3 w-3 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Update Payment Method
              </Button>
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Gateway Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-primary" />
              Payment Portal
            </CardTitle>
            <CardDescription>
              Access external payment gateway for detailed management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Secure payment processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Update payment methods</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Download receipts</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Manage subscriptions</span>
              </div>
            </div>

            <Button className="w-full" onClick={() => {
              toast({
                title: "Redirecting to Payment Portal",
                description: "Opening secure payment gateway...",
              });
            }}>
              <ExternalLink className="h-4 w-4 mr-2" />
              Access Payment Portal
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              You will be redirected to our secure payment partner's website
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            View all your payment transactions and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(payment.status)}
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <div className="text-sm text-muted-foreground space-x-4">
                        <span>Invoice: {payment.invoiceNumber}</span>
                        <span>Due: {payment.dueDate}</span>
                        {payment.paidDate && (
                          <span>Paid: {payment.paidDate}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <div className="font-medium">
                        {formatCurrency(payment.amount, payment.currency)}
                      </div>
                      <StatusBadge status={payment.status} />
                    </div>
                    
                    <div className="flex gap-2">
                      {payment.status === "pending" && (
                        <Button 
                          size="sm"
                          onClick={() => handlePayNow(payment.id)}
                        >
                          Pay Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card className="bg-accent-light/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Receipt className="h-6 w-6 text-accent mt-1" />
            <div>
              <h3 className="font-medium mb-1">Payment Notifications</h3>
              <p className="text-sm text-muted-foreground">
                You will receive email confirmations for all successful payments and 
                reminders for upcoming due dates. Make sure your email address is up to date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;