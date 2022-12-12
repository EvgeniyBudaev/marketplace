import { useEffect } from "react";
import type { FieldValues } from "react-hook-form";
import type { TUseInitFormReturn } from "./useInitForm";

export const useScrollToFirstErrorField = <T extends FieldValues>(
  formData: TUseInitFormReturn<T>,
): void => {
  useEffect(() => {
    const { errors } = formData.methods.formState;

    const elements = Object.keys(errors)
      .map((name) => ({
        element: document.getElementsByName(name)[0],
        //focus: errors[name]?.ref?.focus,
      }))
      .filter((el) => !!el.element)
      .sort((a, b) => b.element.scrollHeight - a.element.scrollHeight);

    //elements[0]?.focus();
    elements[0]?.element.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [formData.methods.formState.errors]);
};
