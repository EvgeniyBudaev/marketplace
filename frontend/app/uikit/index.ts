export * from "./Accordion";
export * from "./Avatar";
export * from "./Button";
export * from "./Checkbox";
export * from "./Colors";
export * from "./DropDown";
export * from "./FadeIn";
export * from "./Hamburger";
export * from "./Icon";
export * from "./Input";
export * from "./Modal";
export * from "./Overlay";
export * from "./Pagination";
export * from "./Select";
export * from "./Sidebar";
export * from "./Spacer";
export * from "./Switcher";
export * from "./Table";
export * from "./Tag";
export * from "./Toast";
export * from "./Tooltip";
export * from "./Typography";

import { accordionLinks } from "~/uikit/Accordion";
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
import { modalLinks } from "~/uikit/Modal";
import { overlayLinks } from "~/uikit/Overlay";
import { paginationLinks } from "~/uikit/Pagination";
import { selectLinks } from "~/uikit/Select";
import { spacerLinks } from "~/uikit/Spacer";
import { switcherLinks } from "~/uikit/Switcher";
import { tableLinks } from "~/uikit/Table";
import { tagLinks } from "~/uikit/Tag";
import { tooltipLinks } from "~/uikit/Tooltip";
import { typographyLinks } from "~/uikit/Typography/constants";

export const links = () => {
  return [
    ...accordionLinks(),
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
    ...modalLinks(),
    ...overlayLinks(),
    ...paginationLinks(),
    ...selectLinks(),
    ...spacerLinks(),
    ...switcherLinks(),
    ...tableLinks(),
    ...tagLinks(),
    ...tooltipLinks(),
    ...typographyLinks(),
  ];
};

export type IconType = import("./Icon/IconType").IconType;
