"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface FormStepperProps {
  steps: string[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function FormStepper({ steps, currentStep, onStepClick }: FormStepperProps) {
  return (
    <div className="w-full">
      {/* Desktop stepper */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep
            const isUpcoming = index > currentStep

            return (
              <div key={index} className="flex flex-col items-center relative z-10">
                {/* Step circle */}
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center border-3 cursor-pointer transition-all duration-300 shadow-lg",
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white shadow-blue-200"
                      : isCurrent
                        ? "bg-white border-blue-600 text-blue-600 shadow-blue-200 ring-4 ring-blue-100"
                        : "bg-white border-gray-300 text-gray-400 hover:border-blue-300 hover:text-blue-500",
                  )}
                  onClick={() => onStepClick && onStepClick(index)}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6 font-bold" />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>

                {/* Step label */}
                <div className="mt-3 text-center max-w-[120px]">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isCurrent ? "text-blue-600" : isCompleted ? "text-blue-700" : "text-gray-500",
                    )}
                  >
                    {step}
                  </span>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-6 left-12 w-[calc(100vw/8-3rem)] h-1 -z-10">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isCompleted ? "bg-blue-600" : "bg-gray-200",
                      )}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile stepper */}
      <div className="md:hidden bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                "bg-blue-600 text-white shadow-md",
              )}
            >
              {currentStep < steps.length - 1 && currentStep >= 0 ? (
                <span>{currentStep + 1}</span>
              ) : (
                <Check className="h-4 w-4" />
              )}
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">
                Étape {currentStep + 1} sur {steps.length}
              </div>
              <div className="text-blue-600 font-semibold text-base">{steps[currentStep]}</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500 ease-out rounded-full"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-3">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index <= currentStep ? "bg-blue-600" : "bg-gray-300",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
