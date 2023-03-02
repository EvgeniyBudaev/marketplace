import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";

interface ISortingHeaderProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  onClick(): void;
}

export const SortingHeader = forwardRef<HTMLDivElement, ISortingHeaderProps>((props, ref) => (
  <div className={props.className} ref={ref} onClick={props.onClick}>
    {props.children}
  </div>
));
