import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils.js";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-dark hover:text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-dark hover:text-white",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-dark hover:text-white",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        blue: "bg-blue-900 text-primary-foreground hover:bg-blue-500 hover:text-white",
        background: "bg-gradient-to-br from-red-600 to-red-900 text-white", // New variant for background color
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 py-1",
        lg: "h-12 px-6 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Add hover effect specifically for background variant
    const hoverStyles =
      variant === "background" ? "hover:bg-red-700 hover:to-red-800" : "";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          hoverStyles
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
