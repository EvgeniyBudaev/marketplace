import { TYPE_OPTIONS } from "~/pages/Admin/Attributes/AttributeEdit";

export const useGetTypeOptions = (type: string) => {
  const defaultTypeOptions = TYPE_OPTIONS.find((item) => item.value === type);

  return { defaultTypeOptions, typeOptions: TYPE_OPTIONS };
};
