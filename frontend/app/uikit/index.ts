export * from "./Accordion";
export * from "./Alert";
export * from "./Avatar";
export * from "./Button";
export * from "./Checkbox";
export * from "./DropDown";
export * from "./Hamburger";
export * from "./Icon";
export * from "./Overlay";
export * from "./Select";
export * from "./Sidebar";
export * from "./Spacer";

import { accordionLinks } from "~/uikit/Accordion";
import { alertLinks } from "~/uikit/Alert";
import { avatarLinks } from "~/uikit/Avatar";
import { buttonLinks } from "~/uikit/Button/Button";
import { checkboxLinks } from "~/uikit/Checkbox";
import { iconButtonLinks } from "~/uikit/Button/IconButton";
import { dropDownLinks } from "~/uikit/DropDown";
import { hamburgerLinks } from "~/uikit/Hamburger";
import { iconLinks } from "~/uikit/Icon";
import { linkButtonLinks } from "~/uikit/Button/LinkButton";
import { overlayLinks } from "~/uikit/Overlay";
import { selectLinks } from "~/uikit/Select";
import { spacerLinks } from "~/uikit/Spacer";

export const links = () => {
  return [
    ...accordionLinks(),
    ...alertLinks(),
    ...avatarLinks(),
    ...buttonLinks(),
    ...checkboxLinks(),
    ...dropDownLinks(),
    ...hamburgerLinks(),
    ...iconButtonLinks(),
    ...iconLinks(),
    ...linkButtonLinks(),
    ...overlayLinks(),
    ...selectLinks(),
    ...spacerLinks(),
  ];
};

export type IconType = import("./Icon/IconType").IconType;
