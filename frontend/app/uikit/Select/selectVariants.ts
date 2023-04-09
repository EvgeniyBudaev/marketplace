import type { ETheme, TSelectVariantStyle } from "~/uikit";

const COLOR_PRIMARY = "#b0976a";
const COLOR_PRIMARY_HOVER = "#997e4d";
const COLOR_WHITE = "#fff";

export const VARIANTS: { [key in ETheme]: TSelectVariantStyle } = {
  // Dark theme
  DARK: {
    control: {
      background:
        "linear-gradient(40deg, rgba(138, 143, 160, 0.16), rgba(31, 32, 41, 0.24) 40%),\n" +
        "      linear-gradient(210deg, rgba(138, 143, 160, 0.5), rgba(31, 32, 41, 0.24) 40%)",
      border: "1px solid transparent",
      borderRadius: "4px",
      cursor: "pointer",
    },
    singleValue: {
      color: "currentColor",
    },
    option: {
      backgroundColor: "#1f2029",
      borderRadius: "0",
      color: "currentColor",
      cursor: "pointer",
      ":active": {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_WHITE,
        transition: "all 0.15s",
      },
      ":hover": {
        backgroundColor: COLOR_PRIMARY_HOVER,
        color: COLOR_WHITE,
        transition: "all 0.15s",
      },
    },
    menu: {
      zIndex: 10,
    },
    menuList: {
      zIndex: "10",
    },
    menuPortal: {
      zIndex: 10,
    },
  },

  // Light theme
  LIGHT: {
    control: {
      background: "transparent",
      border: "1px solid #b0976a",
      borderRadius: "2px",
      cursor: "pointer",
    },
    singleValue: {
      color: "currentColor",
    },
    option: {
      backgroundColor: COLOR_WHITE,
      borderRadius: "0",
      color: "currentColor",
      cursor: "pointer",
      ":active": {
        backgroundColor: COLOR_PRIMARY,
        color: COLOR_WHITE,
      },
      ":hover": {
        backgroundColor: COLOR_PRIMARY_HOVER,
        color: COLOR_WHITE,
        transition: "all 0.15s",
      },
    },
    menu: {
      zIndex: 10,
    },
    menuList: {},
    menuPortal: {},
  },
};
