import { TPlacement } from "~/uikit/Tooltip/types";

type TGetTooltipOffsetParams = {
  placement?: TPlacement;
  referenceElement?: HTMLDivElement | null;
};

export const getTooltipOffset = ({ placement, referenceElement }: TGetTooltipOffsetParams) => {
  if (placement === "bottom" || placement === "top") {
    return [0, referenceElement ? referenceElement.offsetHeight : 0];
  } else {
    return [0, referenceElement ? referenceElement.offsetWidth : 0];
  }
};
