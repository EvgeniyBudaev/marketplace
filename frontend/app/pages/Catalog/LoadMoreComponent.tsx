import type { FC } from "react";

type TProps = {
  onClick: () => void;
};

export const LoadMoreComponent: FC<TProps> = ({ onClick }) => (
  <button onClick={onClick}>Load more</button>
);
