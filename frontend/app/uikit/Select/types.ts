export type TSelectOption = {
  value: string;
  label: string;
};

export type TSelectVariants = "primary" | "secondary";

export type TSelectVariantStyle = {
  control: {
    background?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    cursor?: string;
  };
  singleValue: {
    color?: string;
  };
  option: {
    backgroundColor?: string;
    borderRadius?: string;
    color?: string;
    cursor?: string;
    zIndex?: string;
    ":active"?: {
      backgroundColor?: string;
    };
    ":hover"?: {
      backgroundColor?: string;
      color?: string;
      transition?: string;
    };
  };
  menu: {
    zIndex?: number;
  };
  menuList: {};
  menuPortal: {};
};

export type isSelectMultiType = true | false;
