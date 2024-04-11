import type { TPlacement } from "#app/uikit/components/Tooltip/types";

type TGetTooltipOffsetParams = {
  placement?: TPlacement;
  referenceElement?: HTMLDivElement | null;
};

export const getTooltipOffset = ({
  placement,
  referenceElement,
}: TGetTooltipOffsetParams) => {
  if (placement === "bottom" || placement === "top") {
    return [0, 0];
  } else {
    return [0, 0];
  }
};
