import { forwardRef, memo } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface ISortingHeaderProps extends ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Component = forwardRef<HTMLDivElement, ISortingHeaderProps>(
  ({ children, className, onClick }, ref) => (
    <div className={className} ref={ref} onClick={onClick}>
      {children}
    </div>
  ),
);

Component.displayName = "SortingHeader";

export const SortingHeader = memo(Component);
