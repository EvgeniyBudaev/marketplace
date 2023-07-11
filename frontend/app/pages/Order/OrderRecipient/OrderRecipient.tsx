import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import { ERoutes } from "~/enums";
import type { TRecipient } from "~/shared/api/recipient";
import { ETypographyVariant, Icon, Typography } from "~/uikit";
import styles from "./OrderRecipient.css";

type TProps = {
  recipient?: TRecipient;
};

export const OrderRecipient: FC<TProps> = ({ recipient }) => {
  const { t } = useTranslation();

  return (
    <div className="OrderRecipient">
      <div className="OrderRecipient-Inner">
        <h5 className="OrderRecipient-SubTitle">
          <Typography variant={ETypographyVariant.TextH5Bold}>
            {t("pages.order.recipient")}
          </Typography>
        </h5>
        <Link className="OrderRecipient-Link" to={ERoutes.Recipient}>
          <Typography variant={ETypographyVariant.TextB3Regular}>
            {t("common.actions.change")}
          </Typography>
        </Link>
      </div>
      <div className="OrderRecipient-Info">
        <Icon className="OrderRecipient-InfoIcon" type="User" />
        <div className="OrderRecipient-InfoText">
          <div className="OrderRecipient-InfoTitle">
            {recipient?.surname}
            <> </>
            {recipient?.name}
          </div>
          <div className="OrderRecipient-InfoSubTitle">
            email: {recipient?.email}
            <> ,</>
            моб.: {recipient?.phone}
          </div>
        </div>
      </div>
    </div>
  );
};

export function orderRecipientLinks() {
  return [{ rel: "stylesheet", href: styles }];
}