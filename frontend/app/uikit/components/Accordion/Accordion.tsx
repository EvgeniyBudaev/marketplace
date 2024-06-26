import clsx from "clsx";
import { memo, useEffect, useState, useRef } from "react";
import type { FC, PropsWithChildren } from "react";
import { CSSTransition } from "react-transition-group";
import { TRANSITION } from "#app/constants";
import { ETypographyVariant, Typography } from "#app/uikit";
import { Icon } from "../Icon";
import styles from "./Accordion.css";

type TProps = {
  className?: string;
  dataTestId?: string;
  title?: string;
  isActive?: boolean;
} & PropsWithChildren;

const AccordionComponent: FC<TProps> = ({
  className,
  dataTestId = "uikit__accordion",
  title = "",
  isActive = false,
  children = null,
}) => {
  const [isOpen, setIsOpen] = useState(isActive);
  const nodeRef = useRef<HTMLDivElement>(null);
  const contentHeight = nodeRef.current?.scrollHeight;

  const onToggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const setAtToStringAndPx = (value: number): string => {
    return value.toString() + "px";
  };

  useEffect(() => {
    if (nodeRef.current && contentHeight) {
      nodeRef.current.style.setProperty(
        "--content-height",
        setAtToStringAndPx(contentHeight)
      );
    }
  }, [contentHeight]);

  return (
    <div
      className={clsx("Accordion", className, {
        Accordion__active: isOpen,
      })}
      data-testid={dataTestId}
    >
      <div className="Accordion-Header" onClick={onToggleAccordion}>
        <div className="Accordion-HeaderTitle">
          <Typography variant={ETypographyVariant.TextB3Bold}>
            {title}
          </Typography>
        </div>
        <Icon className="Accordion-HeaderIcon" type="ArrowDown" />
      </div>

      <CSSTransition
        in={isOpen}
        nodeRef={nodeRef}
        timeout={TRANSITION}
        classNames="Accordion-ContentWrapper"
        unmountOnExit
      >
        <div ref={nodeRef}>
          <div className="Accordion-Content">{children}</div>
        </div>
      </CSSTransition>
    </div>
  );
};

export const Accordion = memo(AccordionComponent);

export function accordionLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
