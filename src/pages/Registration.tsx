import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Save, Send, ArrowLeft, ArrowRight } from "lucide-react";

interface RegistrationData {
  businessName: string;
  businessAddress: string;
  ownerName: string;
  email: string;
  contactNumber: string;
  billingLiaison: string;
  billingEmail: string;
  industry: string[];
  subscriptionPlan: string;
  platforms: string[];
}

const Registration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationData>({
    businessName: "",
    businessAddress: "",
    ownerName: "",
    email: "",
    contactNumber: "",
    billingLiaison: "",
    billingEmail: "",
    industry: [],
    subscriptionPlan: "",
    platforms: []
  });
  
  const { toast } = useToast();
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const industryOptions = [
    "Cosmetics & Skincare",
    "Beauty & Personal Care",
    "Health & Supplements",
    "Gadgets & Electronics",
    "Home & Living",
    "Equipment",
    "Clothing/Apparel",
    "Shoes, Bags, Accessories",
    "Automobile",
    "Arts & Crafts",
    "Food",
    "Others"
  ];

  const platformOptions = [
    "Shopee",
    "TikTok",
    "Lazada"
  ];

  const handleInputChange = (field: keyof RegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleIndustryChange = (industry: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        industry: [...prev.industry, industry]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        industry: prev.industry.filter(i => i !== industry)
      }));
    }
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        platforms: [...prev.platforms, platform]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        platforms: prev.platforms.filter(p => p !== platform)
      }));
    }
  };

  const saveDraft = () => {
    localStorage.setItem('registrationDraft', JSON.stringify(formData));
    toast({
      title: "Draft Saved",
      description: "Your registration progress has been saved.",
    });
  };

  const loadDraft = () => {
    const draft = localStorage.getItem('registrationDraft');
    if (draft) {
      setFormData(JSON.parse(draft));
      toast({
        title: "Draft Loaded",
        description: "Your previous registration progress has been loaded.",
      });
    }
  };

  const submitRegistration = () => {
    toast({
      title: "Registration Submitted",
      description: "Your business registration has been submitted for review.",
    });
    localStorage.removeItem('registrationDraft');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="ownerName">Owner's Full Name *</Label>
          <Input
            id="ownerName"
            value={formData.ownerName}
            onChange={(e) => handleInputChange('ownerName', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number *</Label>
          <Input
            id="contactNumber"
            value={formData.contactNumber}
            onChange={(e) => handleInputChange('contactNumber', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="businessAddress">Business Address *</Label>
        <Textarea
          id="businessAddress"
          value={formData.businessAddress}
          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="billingLiaison">Billing Liaison *</Label>
          <Input
            id="billingLiaison"
            value={formData.billingLiaison}
            onChange={(e) => handleInputChange('billingLiaison', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="billingEmail">Billing Email Address *</Label>
          <Input
            id="billingEmail"
            type="email"
            value={formData.billingEmail}
            onChange={(e) => handleInputChange('billingEmail', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Industry / Product Category *</Label>
        <p className="text-sm text-muted-foreground mb-4">Select all that apply</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {industryOptions.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <Checkbox
                id={industry}
                checked={formData.industry.includes(industry)}
                onCheckedChange={(checked) => handleIndustryChange(industry, checked as boolean)}
              />
              <Label htmlFor={industry} className="text-sm">{industry}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <Label className="text-base font-medium">Selected E-commerce Platforms *</Label>
        <p className="text-sm text-muted-foreground mb-4">Choose your selling platforms</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {platformOptions.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={formData.platforms.includes(platform)}
                onCheckedChange={(checked) => handlePlatformChange(platform, checked as boolean)}
              />
              <Label htmlFor={platform} className="text-sm">{platform}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-medium">Subscription Plan *</Label>
        <p className="text-sm text-muted-foreground mb-4">Choose your plan</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={`cursor-pointer transition-all ${formData.subscriptionPlan === 'trial' ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-4" onClick={() => handleInputChange('subscriptionPlan', 'trial')}>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox checked={formData.subscriptionPlan === 'trial'} />
                <h3 className="font-medium">Trial Package</h3>
              </div>
              <p className="text-sm text-muted-foreground">3-months trial (Limited features)</p>
            </CardContent>
          </Card>
          
          <Card className={`cursor-pointer transition-all ${formData.subscriptionPlan === 'annual' ? 'ring-2 ring-primary' : ''}`}>
            <CardContent className="p-4" onClick={() => handleInputChange('subscriptionPlan', 'annual')}>
              <div className="flex items-center space-x-2 mb-2">
                <Checkbox checked={formData.subscriptionPlan === 'annual'} />
                <h3 className="font-medium">Annual Subscription</h3>
              </div>
              <p className="text-sm text-muted-foreground">Full access to all features</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Registration Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Business Name:</span>
            <span className="font-medium">{formData.businessName || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span>Owner:</span>
            <span className="font-medium">{formData.ownerName || "Not provided"}</span>
          </div>
          <div className="flex justify-between">
            <span>Industries:</span>
            <span className="font-medium">{formData.industry.length || 0} selected</span>
          </div>
          <div className="flex justify-between">
            <span>Platforms:</span>
            <span className="font-medium">{formData.platforms.length || 0} selected</span>
          </div>
          <div className="flex justify-between">
            <span>Subscription:</span>
            <span className="font-medium">{formData.subscriptionPlan || "Not selected"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Business Registration</h1>
        <p className="text-muted-foreground">
          Complete your business registration to access Great Chat services
        </p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Business Info</span>
            <span>Categories</span>
            <span>Review & Submit</span>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Business Information"}
            {currentStep === 2 && "Business Categories & Platforms"}
            {currentStep === 3 && "Review & Submit"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Enter your business details and contact information"}
            {currentStep === 2 && "Select your industry categories and e-commerce platforms"}
            {currentStep === 3 && "Review your information and submit your registration"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={saveDraft}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="ghost" onClick={loadDraft}>
            Load Draft
          </Button>
        </div>
        
        <div className="flex space-x-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={submitRegistration}>
              <Send className="h-4 w-4 mr-2" />
              Submit Registration
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;