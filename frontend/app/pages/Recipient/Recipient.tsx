import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "@remix-run/react";
import {useAuthenticityToken} from "remix-utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {ERoutes} from "~/enums";
import {useUser} from "~/hooks";
import {EFormMethods, Form, Input, useInitForm} from "~/shared/form";
import type {TParams} from "~/types";
import {EFormFields} from "~/pages/Recipient/enums";
import {formSchema} from "~/pages/Recipient/schemas";
import type {TForm} from "~/pages/Recipient/types";
import {Button, ETypographyVariant, Icon, Typography} from "~/uikit";
import styles from "./Recipient.css";

export const Recipient: FC = () => {
  const csrf = useAuthenticityToken();
  const {t} = useTranslation();
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;
  const {user} = useUser();
  console.log("Recipient user: ", user);

  const handleSubmit = (params: TParams) => {
    console.log("Form params: ", params);
  };

  return (
    <section className="Recipient">
      <div className="Recipient-Step">
        <Typography variant={ETypographyVariant.TextB4Regular}>
          {t("pages.recipient.step")}
        </Typography>
      </div>
      <h1 className="Recipient-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.recipient.title")}
        </Typography>
      </h1>
      <div className="Recipient-Inner">
        <Form<TForm>
          className="Recipient-Form"
          form={form}
          handleSubmit={handleSubmit}
          method={EFormMethods.Post}
        >
          <div className="Recipient-FormContent">
            <Input
              defaultValue={user?.firstName ?? ""}
              label={t("form.firstName.title") ?? "First name"}
              name={EFormFields.FirstName}
              type="text"
            />
            <Input
              defaultValue={user?.lastName ?? ""}
              label={t("form.lastName.title") ?? "Last name"}
              name={EFormFields.LastName}
              type="text"
            />
            <Input
              defaultValue={user?.phone ?? ""}
              label={t("form.mobilePhone.title") ?? "Mobile phone"}
              name={EFormFields.Phone}
              type="text"
            />
            <Input
              defaultValue={user?.email ?? ""}
              label={t("form.email.title") ?? "Email"}
              name={EFormFields.Email}
              type="text"
            />
          </div>
          <div className="Recipient-FormFooter">
            <div className="Recipient-Controls">
              <Link className="Recipient-ControlsLink" to={ERoutes.Shipping}>
                <Icon type="ArrowBack"/>
                <div className="Recipient-ControlsText">
                  <Typography variant={ETypographyVariant.TextB3Regular}>
                    {t("common.actions.back")}
                  </Typography>
                </div>
              </Link>
              <Button type="submit">
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("common.actions.continue")}
                </Typography>
              </Button>
            </div>
          </div>
        </Form>
        <div className="Recipient-Info">
          <Icon className="Recipient-InfoIcon" type="Attention"/>
          <div className="Recipient-InfoText">
            <div className="Recipient-InfoTitle">
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.recipient.specify")}
              </Typography>
              <br/>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.recipient.realData")}
              </Typography>
            </div>
            <div>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.recipient.passport")}
              </Typography>
              <br/>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.recipient.order")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function recipientLinks() {
  return [{rel: "stylesheet", href: styles}];
}
