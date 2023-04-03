import type { ETheme, TSelectVariantStyle } from "~/uikit";

export const VARIANTS: { [key in ETheme]: any } = {
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
        backgroundColor: "#148F2B",
        color: "#fff",
        transition: "all 0.15s",
      },
      ":hover": {
        backgroundColor: "#0A4715",
        color: "#fff",
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
      border: "1px solid #148F2B",
      borderRadius: "2px",
      cursor: "pointer",
    },
    singleValue: {
      color: "currentColor",
    },
    option: {
      backgroundColor: "#fff",
      borderRadius: "0",
      color: "currentColor",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#148F2B",
      },
      ":hover": {
        backgroundColor: "#0A4715",
        color: "#fff",
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
