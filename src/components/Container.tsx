import { cn } from "@/lib/utils";
import { ComponentProps } from "react"

interface ContainerProps extends ComponentProps<"div"> {
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('container mx-auto px-5', className)}>
      {children}
    </div>
  )
}

export default Container;