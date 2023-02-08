export type TGetLink = (link: string | null | undefined) => string | null;

export const getLink: TGetLink = (link) => {
  if (!link) {
    return null;
  }

  const isOutherResource = /^https?:\/\//g.test(link);

  return isOutherResource ? link : `http://${link}`;
};
