import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, ETypographyVariant, Modal, Typography } from "~/uikit";
import styles from "./ModalDelete.module.css";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const ModalDelete: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onCloseModal={onClose}>
      <Modal.Header>
        <Typography variant={ETypographyVariant.TextB2Bold}>
          {t("common.modal.deleteQuestion")}
        </Typography>
      </Modal.Header>
      <Modal.Footer>
        <div className="ModalDelete-Footer">
          <Button className="ModalDelete-Cancel" onClick={onClose}>
            {t("common.actions.cancel")}
          </Button>
          <Button onClick={onSubmit} type={"submit"}>
            {t("common.actions.delete")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export function modalDeleteLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
