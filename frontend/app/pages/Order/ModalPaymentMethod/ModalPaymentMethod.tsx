import clsx from "clsx";
import { useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { EPaymentMethod } from "~/pages/Order/enums";
import { RadioCard, radioCardLinks } from "~/pages/Order/ModalPaymentMethod/RadioCard";
import { Button, Icon, Modal, Typography } from "~/uikit";
import styles from "./ModalPaymentMethod.css";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (value: EPaymentMethod) => void;
};

export const ModalPaymentMethod: FC<TProps> = ({ isOpen, onClose, onSubmit }) => {
  const { t } = useTranslation();
  const CARD_TEXT = t("pages.order.payWithCard");
  const CASH_TEXT = t("pages.order.payWithCash");
  const [preliminaryPaymentMethod, setPreliminaryPaymentMethod] = useState(EPaymentMethod.CARD);

  const handleChoicePaymentMethod = (value: EPaymentMethod) => {
    setPreliminaryPaymentMethod(value);
  };

  const handleSubmit = () => {
    onSubmit(preliminaryPaymentMethod);
    onClose();
  };

  return (
    <Modal className="ModalPaymentMethod" isOpen={isOpen} onCloseModal={onClose}>
      <Modal.Header className="ModalPaymentMethod-HeaderMobile">
        <h2>Способы оплаты</h2>
        <div className="ModalPaymentMethod-Defence">
          <Icon className="ModalPaymentMethod-DefenceIcon" type="Defence" />
          <Typography>{t("pages.order.fullReturn")}</Typography>
        </div>
      </Modal.Header>
      <Modal.Content>
        <div className={clsx("ModalPaymentMethod-Inner ModalPaymentMethod-InnerMobile")}>
          <RadioCard
            className="ModalPaymentMethod-RadioCardMobile"
            name={EPaymentMethod.CARD}
            value={CARD_TEXT}
            isActive={preliminaryPaymentMethod === EPaymentMethod.CARD}
            onChoice={handleChoicePaymentMethod}
          />
          <RadioCard
            className="ModalPaymentMethod-RadioCardMobile"
            name={EPaymentMethod.CASH}
            value={CASH_TEXT}
            isActive={preliminaryPaymentMethod === EPaymentMethod.CASH}
            onChoice={handleChoicePaymentMethod}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <Button onClick={handleSubmit} type="submit">
          <Typography>{t("common.actions.choose")}</Typography>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export function modalPaymentMethodLinks() {
  return [{ rel: "stylesheet", href: styles }, ...radioCardLinks()];
}
