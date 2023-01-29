import type { FieldErrors, FieldValues } from "react-hook-form";

const ELEMENT_OFFSET_TOP = 10;

export const scrollToFirstErrorField = <T extends FieldValues>(errors: FieldErrors<T>): void => {
  const elements = Object.keys(errors)
    .map((name) => document.querySelector(`[data-name="${name}"]`) as HTMLElement)
    .filter((element) => element)
    .sort((a, b) => {
      const { top: aTop, left: aLeft } = a.getBoundingClientRect();
      const { top: bTop, left: bLeft } = b.getBoundingClientRect();
      const topElement = aTop - bTop;

      return topElement === 0 ? aLeft - bLeft : topElement;
    });

  if (elements.length) {
    const { top } = elements[0].getBoundingClientRect();

    document.body.scrollBy({ left: 0, top: top - ELEMENT_OFFSET_TOP, behavior: "smooth" });

    setTimeout(() => {
      (elements[0].querySelector("input, textarea") as HTMLElement)?.focus();
    }, 300);
  }
};
