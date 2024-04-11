import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import styles from "./FadeIn.css";

type TProps = {
  children?: ReactNode;
  dataTestId?: string;
};

export const FadeIn: FC<TProps> = ({
  children,
  dataTestId = "uikit__fade-in",
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setIsMounted(true);
    }, 10);
    return () => clearTimeout(id);
  }, []);

  return (
    <span data-testid={dataTestId} date-fade={String(isMounted)}>
      {children}
    </span>
  );
};

export function fadeInLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
