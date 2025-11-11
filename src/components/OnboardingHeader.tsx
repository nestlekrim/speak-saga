import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

interface OnboardingHeaderProps {
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  stepStatus?: "pending" | "approved" | "rejected" | "draft" | "completed";
  prevStep?: {
    label: string;
    path: string;
  };
  nextStep?: {
    label: string;
    path: string;
    disabled?: boolean;
  };
}

const OnboardingHeader = ({
  title,
  description,
  currentStep,
  totalSteps,
  stepStatus,
  prevStep,
  nextStep,
}: OnboardingHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Navigation and Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {prevStep && (
            <Button variant="outline" size="sm" asChild>
              <Link to={prevStep.path}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {prevStep.label}
              </Link>
            </Button>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </div>
          {stepStatus && <StatusBadge status={stepStatus} />}
          {nextStep && (
            <Button 
              variant="default" 
              size="sm" 
              asChild={!nextStep.disabled}
              disabled={nextStep.disabled}
            >
              {nextStep.disabled ? (
                <span>
                  {nextStep.label}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </span>
              ) : (
                <Link to={nextStep.path}>
                  {nextStep.label}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Title and Description */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default OnboardingHeader;
