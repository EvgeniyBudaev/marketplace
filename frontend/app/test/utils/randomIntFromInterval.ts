export type TRandomIntFromInterval = (min: number, max: number) => number;

export const randomIntFromInterval: TRandomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
