'use client'

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200 text-[#5D4037] dark:text-[#D7CCC8]"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & {
      variant?: 'default' | 'muted' | 'accent'
    }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'text-[#5D4037] dark:text-[#D7CCC8]',
    muted: 'text-[#8D6E63] dark:text-[#A1887F]',
    accent: 'text-[#795548] dark:text-[#BCAAA4] font-semibold',
  };

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        labelVariants(),
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
})

export { Label }
