import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { EPaymentMethod } from "#app/pages/Order/enums";
import { modalPaymentMethodLinks } from "#app/pages/Order/ModalPaymentMethod";
import { Button, ETypographyVariant, Icon, Typography } from "#app/uikit";
import styles from "./OrderPayment.css";

type TProps = {
  onOpenModalPaymentMethod?: () => void;
  onSubmit?: () => void;
  paymentMethod: EPaymentMethod;
};

export const OrderPayment: FC<TProps> = ({
  onOpenModalPaymentMethod,
  onSubmit,
  paymentMethod,
}) => {
  const { t } = useTranslation();
  const CARD_TEXT = t("pages.order.payWithCard");
  const CASH_TEXT = t("pages.order.payWithCash");

  return (
    <div className="OrderPayment">
      <div className="OrderPayment-Inner">
        <div className="OrderPayment-Info">
          {paymentMethod === EPaymentMethod.CARD ? (
            <>
              <Icon className="OrderPayment-Icon" type="Card" />
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {CARD_TEXT}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <Icon className="OrderPayment-Icon" type="Cash" />
              <div>
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {CASH_TEXT}
                </Typography>
              </div>
            </>
          )}
        </div>
        <div className="OrderPayment-Change" onClick={onOpenModalPaymentMethod}>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.actions.change")}
          </Typography>
        </div>
      </div>
      <Button className="OrderPayment-Button" onClick={onSubmit}>
        <Typography variant={ETypographyVariant.TextB3Regular}>
          {t("pages.order.checkout")}
        </Typography>
      </Button>
    </div>
  );
};

export function orderPaymentLinks() {
  return [{ rel: "stylesheet", href: styles }, ...modalPaymentMethodLinks()];
}
