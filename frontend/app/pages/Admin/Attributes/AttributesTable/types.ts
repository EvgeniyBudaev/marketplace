import type { TAttribute } from "~/shared/api/attributes";

export type TDeleteModalState = {
  isOpen: boolean;
  alias?: string;
};

export type TTableColumn = TAttribute;
