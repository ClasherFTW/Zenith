import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#A1887F]/50",
  {
    variants: {
      variant: {
        // Primary button - Warm brown
        default: 'bg-[#8D6E63] text-white hover:bg-[#795548] active:bg-[#6D4C41]',
        
        // Secondary button - Muted taupe
        secondary: 'bg-[#BCAAA4] text-[#3E2723] hover:bg-[#A1887F] active:bg-[#8D6E63]',
        
        // Outline button - Subtle border
        outline: 'border border-[#D7CCC8] bg-transparent text-[#5D4037] hover:bg-[#EFEBE9] dark:border-[#5D4037] dark:text-[#D7CCC8] dark:hover:bg-[#2A211F]',
        
        // Ghost button - Minimal styling
        ghost: 'text-[#5D4037] hover:bg-[#EFEBE9] dark:text-[#D7CCC8] dark:hover:bg-[#2A211F]',
        
        // Link button - Text only
        link: 'text-[#8D6E63] hover:underline underline-offset-4 dark:text-[#A1887F]',
        
        // Destructive button - Red for dangerous actions
        destructive: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
