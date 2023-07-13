import { accordionLinks } from "~/uikit/Accordion";
import { avatarLinks } from "~/uikit/Avatar";
import { buttonLinks } from "~/uikit/Button/Button";
import { dateTimeLinks } from "~/uikit/DateTime";
import { dropzoneLinks } from "~/uikit/Dropzone";
import { fadeInLinks } from "~/uikit/FadeIn";
import { iconButtonLinks } from "~/uikit/Button/IconButton";
import { linkButtonLinks } from "~/uikit/Button/LinkButton";
import { checkboxLinks } from "~/uikit/Checkbox";
import { dropDownLinks } from "~/uikit/DropDown";
import { errorLinks } from "~/uikit/Error";
import { hamburgerLinks } from "~/uikit/Hamburger";
import { iconLinks } from "~/uikit/Icon";
import { inputLinks } from "~/uikit/Input";
import { modalLinks } from "~/uikit/Modal";
import { overlayLinks } from "~/uikit/Overlay";
import { paginationLinks } from "~/uikit/Pagination";
import { headlessPopoverLinks, popoverCustomLinks } from "~/uikit/Popover";
import { selectLinks } from "~/uikit/Select";
import { sliderSimpleLinks, sliderSyncingLinks } from "~/uikit/Slider";
import { spacerLinks } from "~/uikit/Spacer";
import { spinnerLinks } from "~/uikit/Spinner";
import { switcherLinks } from "~/uikit/Switcher";
import { tableLinks } from "~/uikit/Table";
import { tagLinks } from "~/uikit/Tag";
import { textareaLinks } from "~/uikit/Textarea";
import { tooltipLinks } from "~/uikit/Tooltip";
import { typographyLinks } from "~/uikit/Typography/constants";

export * from "./Accordion";
export * from "./Avatar";
export * from "./Button";
export * from "./Checkbox";
export * from "./Colors";
export * from "./DateTime";
export * from "./DropDown";
export * from "./Dropzone";
export * from "./Error";
export * from "./FadeIn";
export * from "./Hamburger";
export * from "./Icon";
export * from "./Input";
export * from "./Modal";
export * from "./Overlay";
export * from "./Pagination";
export * from "./Popover";
export * from "./Select";
export * from "./Sidebar";
export * from "./Slider";
export * from "./Spacer";
export * from "./Spinner";
export * from "./Switcher";
export * from "./Table";
export * from "./Tag";
export * from "./Textarea";
export * from "./Toast";
export * from "./Tooltip";
export * from "./Typography";

export const links = () => {
  return [
    ...accordionLinks(),
    ...avatarLinks(),
    ...buttonLinks(),
    ...dateTimeLinks(),
    ...dropzoneLinks(),
    ...errorLinks(),
    ...fadeInLinks(),
    ...iconButtonLinks(),
    ...linkButtonLinks(),
    ...checkboxLinks(),
    ...dropDownLinks(),
    ...hamburgerLinks(),
    ...headlessPopoverLinks(),
    ...iconLinks(),
    ...inputLinks(),
    ...modalLinks(),
    ...overlayLinks(),
    ...paginationLinks(),
    ...popoverCustomLinks(),
    ...selectLinks(),
    ...sliderSimpleLinks(),
    ...sliderSyncingLinks(),
    ...spacerLinks(),
    ...spinnerLinks(),
    ...switcherLinks(),
    ...tableLinks(),
    ...tagLinks(),
    ...textareaLinks(),
    ...tooltipLinks(),
    ...typographyLinks(),
  ];
};

export type IconType = import("./Icon/IconType").IconType;
export * from "./enums";
