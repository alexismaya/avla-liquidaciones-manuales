import { Check } from 'lucide-react'

interface Step {
  label: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        return (
          <div key={index} className="flex items-center flex-1 last:flex-none">
            {/* Dot + label */}
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isCompleted ? 'bg-avla-blue border-avla-blue scale-100' : ''}
                ${isActive ? 'border-avla-blue bg-white shadow-md shadow-avla-blue/20' : ''}
                ${!isCompleted && !isActive ? 'border-border bg-white' : ''}
              `}>
                {isCompleted
                  ? <Check size={16} className="text-white" />
                  : <span className={`text-sm font-semibold
                      ${isActive ? 'text-avla-blue' : 'text-text-subtle'}
                    `}>{index + 1}</span>
                }
              </div>
              <span className={`text-xs mt-2 font-medium text-center max-w-[90px] leading-tight
                ${isActive ? 'text-avla-blue' : isCompleted ? 'text-text-muted' : 'text-text-subtle'}
              `}>{step.label}</span>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 mb-6 rounded-full transition-colors duration-300
                ${index < currentStep ? 'bg-avla-blue' : 'bg-border'}
              `} />
            )}
          </div>
        )
      })}
    </div>
  )
}
