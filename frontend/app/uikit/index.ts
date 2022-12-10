export * from "./Accordion";
export * from "./Alert";
export * from "./Avatar";
export * from "./Button";
export * from "./Checkbox";
export * from "./DropDown";
export * from "./Hamburger";
export * from "./Icon";
export * from "./Overlay";
export * from "./Sidebar";
export * from "./Spacer";

import { links as accordionLinks } from "~/uikit/Accordion";
import { links as alertLinks } from "~/uikit/Alert";
import { links as avatarLinks } from "~/uikit/Avatar";
import { links as buttonLinks } from "~/uikit/Button/Button";
import { links as checkboxLinks } from "~/uikit/Checkbox";
import { iconButtonLinks as iconButtonLinks } from "~/uikit/Button/IconButton";
import { links as dropDownLinks } from "~/uikit/DropDown";
import { links as hamburgerLinks } from "~/uikit/Hamburger";
import { links as iconLinks } from "~/uikit/Icon";
import { linkButtonLinks as linkButtonLinks } from "~/uikit/Button/LinkButton";
import { links as overlayLinks } from "~/uikit/Overlay";
import { links as spacerLinks } from "~/uikit/Spacer";

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
    ...spacerLinks(),
  ];
};

export type IconType = import("./Icon/IconType").IconType;
