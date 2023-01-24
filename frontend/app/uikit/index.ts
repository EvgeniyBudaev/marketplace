export * from "./Accordion";
export * from "./Alert";
export * from "./Avatar";
export * from "./Button";
export * from "./Checkbox";
export * from "./DropDown";
export * from "./FadeIn";
export * from "./Hamburger";
export * from "./Icon";
export * from "./Input";
export * from "./Overlay";
export * from "./Pagination";
export * from "./Select";
export * from "./Sidebar";
export * from "./Spacer";
export * from "./Switcher";
export * from "./Table";
export * from "./Tooltip";
export * from "./Typography";

import { accordionLinks } from "~/uikit/Accordion";
import { alertLinks } from "~/uikit/Alert";
import { avatarLinks } from "~/uikit/Avatar";
import { buttonLinks } from "~/uikit/Button/Button";
import { fadeInLinks } from "~/uikit/FadeIn";
import { iconButtonLinks } from "~/uikit/Button/IconButton";
import { linkButtonLinks } from "~/uikit/Button/LinkButton";
import { checkboxLinks } from "~/uikit/Checkbox";
import { dropDownLinks } from "~/uikit/DropDown";
import { hamburgerLinks } from "~/uikit/Hamburger";
import { iconLinks } from "~/uikit/Icon";
import { inputLinks } from "~/uikit/Input";
import { overlayLinks } from "~/uikit/Overlay";
import { paginationLinks } from "~/uikit/Pagination";
import { selectLinks } from "~/uikit/Select";
import { spacerLinks } from "~/uikit/Spacer";
import { switcherLinks } from "~/uikit/Switcher";
import { tableLinks } from "~/uikit/Table";
import { tooltipLinks } from "~/uikit/Tooltip";
import { typographyLinks } from "~/uikit/Typography/constants";

export const links = () => {
  return [
    ...accordionLinks(),
    ...alertLinks(),
    ...avatarLinks(),
    ...buttonLinks(),
    ...fadeInLinks(),
    ...iconButtonLinks(),
    ...linkButtonLinks(),
    ...checkboxLinks(),
    ...dropDownLinks(),
    ...hamburgerLinks(),
    ...iconLinks(),
    ...inputLinks(),
    ...overlayLinks(),
    ...paginationLinks(),
    ...selectLinks(),
    ...spacerLinks(),
    ...switcherLinks(),
    ...tableLinks(),
    ...tooltipLinks(),
    ...typographyLinks(),
  ];
};

export type IconType = import("./Icon/IconType").IconType;
