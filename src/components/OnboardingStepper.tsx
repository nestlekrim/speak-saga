import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CheckCircle, Circle, Lock } from "lucide-react";

interface OnboardingStep {
  id: number;
  title: string;
  path: string;
  status: "completed" | "active" | "locked" | "pending";
}

interface OnboardingStepperProps {
  currentStep: number;
  steps: OnboardingStep[];
}

const OnboardingStepper = ({ currentStep, steps }: OnboardingStepperProps) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isActive = step.id === currentStep;
          const isCompleted = step.status === "completed";
          const isLocked = step.status === "locked";

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle and Label */}
              <div className="flex flex-col items-center">
                <Link
                  to={isLocked ? "#" : step.path}
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isCompleted && "bg-success border-success text-white",
                    isActive && "border-primary bg-primary text-primary-foreground",
                    !isCompleted && !isActive && !isLocked && "border-border bg-background",
                    isLocked && "border-muted bg-muted text-muted-foreground cursor-not-allowed"
                  )}
                  onClick={(e) => isLocked && e.preventDefault()}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : isLocked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </Link>
                <span
                  className={cn(
                    "text-xs font-medium mt-2 text-center max-w-[100px]",
                    isActive && "text-primary",
                    isCompleted && "text-success",
                    isLocked && "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-all",
                    isCompleted ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnboardingStepper;
