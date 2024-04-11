import type { TAttribute } from "#app/shared/api/attributes";

export type TDeleteModalState = {
  isOpen: boolean;
  alias?: string;
};

export type TTableColumn = TAttribute;
