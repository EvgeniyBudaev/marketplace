import {accordionLinks} from "app/uikit/components/Accordion";
import {avatarLinks} from "app/uikit/components/Avatar";
import {buttonLinks} from "~/uikit/components/Button/Button";
import {dateTimeLinks} from "app/uikit/components/DateTime";
import {dropzoneLinks} from "app/uikit/components/Dropzone";
import {fadeInLinks} from "app/uikit/components/FadeIn";
import {iconButtonLinks} from "~/uikit/components/Button/IconButton";
import {linkButtonLinks} from "~/uikit/components/Button/LinkButton";
import {checkboxLinks} from "app/uikit/components/Checkbox";
import {dropDownLinks} from "app/uikit/components/DropDown";
import {errorLinks} from "app/uikit/components/Error";
import {hamburgerLinks} from "app/uikit/components/Hamburger";
import {iconLinks} from "app/uikit/components/Icon";
import {inputLinks} from "app/uikit/components/Input";
import {modalLinks} from "app/uikit/components/Modal";
import {overlayLinks} from "app/uikit/components/Overlay";
import {paginationLinks} from "app/uikit/components/Pagination";
import {headlessPopoverLinks, popoverCustomLinks} from "app/uikit/components/Popover";
import {selectLinks} from "app/uikit/components/Select";
import {sliderSimpleLinks, sliderSyncingLinks} from "app/uikit/components/Slider";
import {spacerLinks} from "app/uikit/components/Spacer";
import {spinnerLinks} from "app/uikit/components/Spinner";
import {switcherLinks} from "app/uikit/components/Switcher";
import {tableLinks} from "app/uikit/components/Table";
import {tagLinks} from "app/uikit/components/Tag";
import {textareaLinks} from "app/uikit/components/Textarea";
import {tooltipLinks} from "app/uikit/components/Tooltip";
import {typographyLinks} from "~/uikit/components/Typography/constants";

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
