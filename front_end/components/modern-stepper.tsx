"use client"

import { cn } from "@/lib/utils"
import { Check, type LucideIcon } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
  icon: LucideIcon
}

interface ModernStepperProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function ModernStepper({ steps, currentStep, onStepClick }: ModernStepperProps) {
  return (
    <div className="space-y-1">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

        return (
          <div
            key={step.id}
            className={cn(
              "relative flex items-start p-4 rounded-xl transition-all duration-300 cursor-pointer group",
              isCurrent
                ? "bg-blue-50 border-2 border-blue-200 shadow-md"
                : isCompleted
                  ? "bg-green-50 border border-green-200 hover:bg-green-100"
                  : "bg-white border border-gray-200 hover:bg-gray-50",
            )}
            onClick={() => onStepClick && onStepClick(index)}
          >
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-8 top-16 w-0.5 h-8 transition-colors duration-300",
                  isCompleted ? "bg-green-400" : isCurrent ? "bg-blue-400" : "bg-gray-300",
                )}
              />
            )}

            {/* Step Icon */}
            <div className="flex-shrink-0 mr-4">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                  isCompleted
                    ? "bg-green-500 text-white shadow-lg shadow-green-200"
                    : isCurrent
                      ? "bg-blue-500 text-white shadow-lg shadow-blue-200"
                      : "bg-gray-100 text-gray-400 group-hover:bg-gray-200",
                )}
              >
                {isCompleted ? <Check className="h-6 w-6 font-bold" /> : <step.icon className="h-6 w-6" />}
              </div>
            </div>

            {/* Step Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3
                  className={cn(
                    "text-sm font-semibold transition-colors duration-300",
                    isCurrent ? "text-blue-700" : isCompleted ? "text-green-700" : "text-gray-600",
                  )}
                >
                  {step.title}
                </h3>
                {isCurrent && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />}
              </div>
              <p
                className={cn(
                  "text-xs transition-colors duration-300",
                  isCurrent ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-500",
                )}
              >
                {step.description}
              </p>
            </div>

            {/* Step Number */}
            <div className="flex-shrink-0">
              <span
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded-full transition-all duration-300",
                  isCurrent
                    ? "bg-blue-100 text-blue-700"
                    : isCompleted
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500",
                )}
              >
                {step.id}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
