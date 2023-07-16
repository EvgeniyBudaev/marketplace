import clsx from "clsx";
import { useState, useEffect } from "react";
import type { ReactNode, FC } from "react";
import { default as ReactModal } from "react-responsive-modal";
import { Icon } from "~/uikit";
import styles from "./Modal.css";

type IModalSize = "medium";

type TModalProps = {
  className?: string;
  children?: ReactNode;
  dataTestId?: string;
  size?: IModalSize;
  isOpen: boolean;
  onCloseModal: () => void;
};

export const Modal = ({
  className,
  children,
  dataTestId = "uikit__modal",
  size = "medium",
  isOpen,
  onCloseModal,
}: TModalProps): JSX.Element => {
  const defaultClassNames = {
    modal: clsx("ModalDefault", className, {
      ModalDefault__medium: size === "medium",
    }),
    closeButton: clsx("ModalDefaultCloseButton"),
  };
  const [styles, setStyles] = useState({});

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (isOpen && scrollbarWidth) {
      const _styles = {
        modal: { marginRight: `${scrollbarWidth + 16}px` },
      };
      setStyles(_styles);
      document.body.classList.add("Modal__open");
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      setStyles({});
      document.body.style.removeProperty("padding-right");
      document.body.classList.remove("Modal__open");
    };
  }, [isOpen]);

  return (
    <ReactModal
      classNames={defaultClassNames}
      center
      closeIcon={<Icon type="Close" />}
      data-testid={dataTestId}
      onClose={onCloseModal}
      open={isOpen}
      styles={styles}
    >
      <div className="Modal">{children}</div>
    </ReactModal>
  );
};

type TModalHeaderProps = {
  align?: "start" | "center" | "end";
  children?: ReactNode;
  className?: string;
};

const ModalHeader: FC<TModalHeaderProps> = ({ align, children, className }) => {
  return (
    <div
      className={clsx("ModalHeader", className, {
        ModalHeader__start: align === "start",
        ModalHeader__center: align === "center",
        ModalHeader__end: align === "end",
      })}
    >
      {children}
    </div>
  );
};

Modal.Header = ModalHeader;

type TModalContentProps = {
  children?: ReactNode;
  className?: string;
};

const ModalContent: FC<TModalContentProps> = ({ children, className }) => {
  return <div className={clsx("ModalContent", className)}>{children}</div>;
};

Modal.Content = ModalContent;

type TModalFooterProps = {
  className?: string;
  children?: ReactNode;
};

const ModalFooter: FC<TModalFooterProps> = ({ children, className }) => {
  return <div className={clsx("ModalFooter", className)}>{children}</div>;
};

Modal.Footer = ModalFooter;

export function modalLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
