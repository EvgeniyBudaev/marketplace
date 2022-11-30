import type { FC } from "react";
import clsx from "clsx";
import classes from "./RatingNumber.module.scss";

type TProps = {
  className?: string;
  rating?: string | number;
};

export const RatingNumber: FC<TProps> = ({ className, rating }) => {
  const number = Number(rating);
  return (
    <div
      className={clsx(classes.RatingNumber, className, {
        [classes.RatingNumber__green]: number >= 4.5,
        [classes.RatingNumber__light_green]: number >= 4.0 && number < 4.5,
        [classes.RatingNumber__yellow_green]: number >= 3.0 && number < 4.0,
        [classes.RatingNumber__yellow]: number >= 2.0 && number < 2.9,
        [classes.RatingNumber__red]: number >= 1.0 && number < 1.9,
        [classes.RatingNumber__default]: number >= 0 && number < 0.9,
      })}
    >
      {number.toFixed(1)}
    </div>
  );
};
