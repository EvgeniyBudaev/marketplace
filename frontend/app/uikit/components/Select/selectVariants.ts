import type { ETheme, TSelectVariantStyle } from "#app/uikit";

const COLOR_PRIMARY = "#b0976a";
const COLOR_PRIMARY_HOVER = "#997e4d";
const COLOR_WHITE = "#fff";
const COLOR_GRAY = "#e4e4e4";
const CURRENT_COLOR = "currentColor";
const BORDER_RADIUS = "4px";
const CURSOR = "pointer";
const TRANSITION = "all 0s";
const TRANSPARENT = "transparent";
const Z_INDEX = 200;

export const VARIANTS: { [key in ETheme]: TSelectVariantStyle } = {
  // Dark theme
  DARK: {
    control: {
      background:
        "linear-gradient(40deg, rgba(138, 143, 160, 0.16), rgba(31, 32, 41, 0.24) 40%),\n" +
        "      linear-gradient(210deg, rgba(138, 143, 160, 0.5), rgba(31, 32, 41, 0.24) 40%)",
      border: `1px solid ${TRANSPARENT}`,
      borderRadius: BORDER_RADIUS,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
      ":hover": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
    },
    singleValue: {
      color: CURRENT_COLOR,
    },
    option: {
      backgroundColor: "#1f2029",
      borderRadius: "0",
      color: CURRENT_COLOR,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_WHITE,
      },
      ":hover": {
        backgroundColor: COLOR_PRIMARY_HOVER,
        color: COLOR_WHITE,
      },
    },
    menu: {
      zIndex: Z_INDEX,
    },
    menuList: {
      zIndex: Z_INDEX,
    },
    menuPortal: {
      zIndex: Z_INDEX,
    },
  },

  // Light theme
  LIGHT: {
    control: {
      background: TRANSPARENT,
      border: `1px solid ${COLOR_GRAY}`,
      borderRadius: BORDER_RADIUS,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
      ":hover": {
        border: `1px solid ${COLOR_PRIMARY}`,
      },
    },
    singleValue: {
      color: CURRENT_COLOR,
    },
    option: {
      backgroundColor: COLOR_WHITE,
      borderRadius: "0",
      color: CURRENT_COLOR,
      cursor: CURSOR,
      transition: TRANSITION,
      ":active": {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_WHITE,
      },
      ":hover": {
        backgroundColor: COLOR_PRIMARY_HOVER,
        color: COLOR_WHITE,
      },
    },
    menu: {
      zIndex: Z_INDEX,
    },
    menuList: {},
    menuPortal: {},
  },
};
