import { accordionLinks } from "~/uikit/components/Accordion";
import { avatarLinks } from "~/uikit/components/Avatar";
import { breadcrumbsLinks } from "~/uikit/components/Breadcrumbs";
import { buttonLinks } from "~/uikit/components/Button/Button";
import { dateTimeLinks } from "~/uikit/components/DateTime";
import { dropzoneLinks } from "~/uikit/components/Dropzone";
import { fadeInLinks } from "~/uikit/components/FadeIn";
import { iconButtonLinks } from "~/uikit/components/Button/IconButton";
import { linkButtonLinks } from "~/uikit/components/Button/LinkButton";
import { checkboxLinks } from "~/uikit/components/Checkbox";
import { dropDownLinks } from "~/uikit/components/DropDown";
import { errorLinks } from "~/uikit/components/Error";
import { hamburgerLinks } from "~/uikit/components/Hamburger";
import { iconLinks } from "~/uikit/components/Icon";
import { inputLinks } from "~/uikit/components/Input";
import { modalLinks } from "~/uikit/components/Modal";
import { overlayLinks } from "~/uikit/components/Overlay";
import { paginationLinks } from "~/uikit/components/Pagination";
import { headlessPopoverLinks, popoverCustomLinks } from "~/uikit/components/Popover";
import { selectLinks } from "~/uikit/components/Select";
import { sliderSimpleLinks, sliderSyncingLinks } from "~/uikit/components/Slider";
import { spacerLinks } from "~/uikit/components/Spacer";
import { spinnerLinks } from "~/uikit/components/Spinner";
import { switcherLinks } from "~/uikit/components/Switcher";
import { tableLinks } from "~/uikit/components/Table";
import { tagLinks } from "~/uikit/components/Tag";
import { textareaLinks } from "~/uikit/components/Textarea";
import { tooltipLinks } from "~/uikit/components/Tooltip";
import { typographyLinks } from "~/uikit/components/Typography/constants";

export * from "./Accordion";
export * from "./Avatar";
export * from "./Breadcrumbs";
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
    ...breadcrumbsLinks(),
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
