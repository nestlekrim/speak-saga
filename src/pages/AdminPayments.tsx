import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, Plus, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ManualPayment {
  id: string;
  businessName: string;
  amount: number;
  date: Date;
  addedBy: string;
  addedAt: Date;
}

const AdminPayments = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [amount, setAmount] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [payments, setPayments] = useState<ManualPayment[]>([]);

  // Mock business list - in real app, fetch from database
  const businesses = [
    { id: "BUS001", name: "TechCorp Solutions" },
    { id: "BUS002", name: "Green Earth Trading" },
    { id: "BUS003", name: "Digital Innovations" },
    { id: "BUS004", name: "Sunrise Enterprises" },
    { id: "BUS005", name: "Blue Ocean Services" },
  ];

  const handleAddPayment = () => {
    if (!amount || !date || !selectedBusiness) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before adding a payment.",
        variant: "destructive",
      });
      return;
    }

    const business = businesses.find(b => b.id === selectedBusiness);
    if (!business) return;

    const newPayment: ManualPayment = {
      id: `PAY${Date.now()}`,
      businessName: business.name,
      amount: parseFloat(amount),
      date: date,
      addedBy: "Admin User",
      addedAt: new Date(),
    };

    setPayments([newPayment, ...payments]);
    
    // Reset form
    setAmount("");
    setDate(undefined);
    setSelectedBusiness("");

    toast({
      title: "Payment Added",
      description: `Payment of $${amount} for ${business.name} has been recorded.`,
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manual Payment Management</h1>
          <p className="text-muted-foreground">
            Record post-dated cheque payments for businesses
          </p>
        </div>
      </div>

      {/* Add Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Payment
          </CardTitle>
          <CardDescription>
            Record a manual payment received via post-dated cheque
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Business Selection */}
            <div className="space-y-2">
              <Label htmlFor="business">Business</Label>
              <Select value={selectedBusiness} onValueChange={setSelectedBusiness}>
                <SelectTrigger id="business">
                  <SelectValue placeholder="Select business" />
                </SelectTrigger>
                <SelectContent>
                  {businesses.map((business) => (
                    <SelectItem key={business.id} value={business.id}>
                      {business.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-9"
                  step="0.01"
                  min="0"
                />
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <Label>Payment Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Button onClick={handleAddPayment} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Payment
          </Button>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Payments
                </p>
                <p className="text-2xl font-bold">{payments.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Amount
                </p>
                <p className="text-2xl font-bold">{formatCurrency(totalPayments)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Businesses
                </p>
                <p className="text-2xl font-bold">
                  {new Set(payments.map(p => p.businessName)).size}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            All manually recorded payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No payments recorded yet</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Added By</TableHead>
                    <TableHead>Added On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.businessName}</TableCell>
                      <TableCell className="font-semibold text-success">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell>{format(payment.date, "PPP")}</TableCell>
                      <TableCell>{payment.addedBy}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {format(payment.addedAt, "PPP p")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPayments;
