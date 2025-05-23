import { cn } from "@/lib/utils"

interface SimpleStepsProps {
  steps: string[]
  currentStep: number
}

export function SimpleSteps({ steps, currentStep }: SimpleStepsProps) {
  return (
    <div className="w-full bg-white p-4 rounded-lg border border-blue-100 shadow-sm">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isCompleted = index < currentStep

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2",
                  isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-gray-100 text-gray-400 border border-gray-200",
                )}
              >
                {index + 1}
              </div>
              {isActive && <span className="text-xs text-blue-700 font-medium hidden md:block">{step}</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
