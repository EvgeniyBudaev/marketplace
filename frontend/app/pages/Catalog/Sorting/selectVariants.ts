import { TSelectVariants, TSelectVariantStyle } from "~/pages/Catalog/Sorting/types";

export const VARIANTS: { [key in TSelectVariants]: TSelectVariantStyle } = {
  // My primary variant is for the dark-mode.
  primary: {
    control: {
      background:
        "linear-gradient(40deg, rgba(138, 143, 160, 0.16), rgba(31, 32, 41, 0.24) 40%),\n" +
        "      linear-gradient(210deg, rgba(138, 143, 160, 0.5), rgba(31, 32, 41, 0.24) 40%)",
      border: "1px solid transparent",
      borderRadius: "4px",
      cursor: "pointer",
    },
    singleValue: {
      color: "#fff",
    },
    option: {
      backgroundColor: "#1f2029",
      borderRadius: "0",
      color: "#fff",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#1f2029",
      },
      ":hover": {
        backgroundColor: "#dfd3c3",
        color: "#333333",
        transition: "all 0.15s",
      },
    },
  },

  // My secondary variant is for a light theme.
  secondary: {
    control: {
      background: "#dfd3c3",
      border: "1px solid #B0976A",
      borderRadius: "0",
      cursor: "pointer",
    },
    singleValue: {
      color: "#333333",
    },
    option: {
      backgroundColor: "#dfd3c3",
      borderRadius: "0",
      color: "#333333",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#dfd3c3",
      },
      ":hover": {
        backgroundColor: "#e4e4e4",
        color: "#333333",
        transition: "all 0.15s",
      },
    },
  },
};
