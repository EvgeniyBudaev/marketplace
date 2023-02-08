export const addBgColor = (count: number | null | undefined): string => {
  if (count === null || count === undefined) {
    return "bg-grey";
  }
  if (count <= 20) {
    return "bg-accent3";
  }
  if (count <= 40) {
    return "bg-accent8";
  }
  if (count <= 60) {
    return "bg-accent9";
  }
  if (count <= 80) {
    return "bg-accent4";
  }
  return "bg-accent1";
};

export const addTextColor = (count: number | null | undefined): string => {
  if (count === null || count === undefined) {
    return "text-grey-dark";
  }
  if (count <= 20) {
    return "text-accent3";
  }
  if (count <= 40) {
    return "text-accent8";
  }
  if (count <= 60) {
    return "text-accent9";
  }
  if (count <= 80) {
    return "text-accent4";
  }
  return "text-accent1";
};
