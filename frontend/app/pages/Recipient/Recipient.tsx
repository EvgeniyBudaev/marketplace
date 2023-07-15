import {useEffect} from "react";
import type {FC} from "react";
import {useTranslation} from "react-i18next";
import {Link, useFetcher} from "@remix-run/react";
import {useAuthenticityToken} from "remix-utils";
import {zodResolver} from "@hookform/resolvers/zod";
import {ERoutes} from "~/enums";
import {useTranslatedResolver} from "~/hooks";
import type {TOptionsSubmitForm} from "~/pages";
import {EFormFields} from "~/pages/Recipient/enums";
import {formSchema} from "~/pages/Recipient/schemas";
import type {TForm} from "~/pages/Recipient/types";
import type {TRecipient} from "~/shared/api/recipient";
import {EFormMethods, Form, Input, useInitForm} from "~/shared/form";
import {PhoneInputMask} from "~/shared/form/PhoneInputMask";
import type {TDomainErrors, TParams} from "~/types";
import {Button, ETypographyVariant, Icon, notify, Typography} from "~/uikit";
import {createPath, normalizePhoneNumber} from "~/utils";
import styles from "./Recipient.css";

type TProps = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  recipient?: TRecipient;
  success: boolean;
  uuid: string;
};

export const Recipient: FC<TProps> = (props) => {
  const {uuid} = props;
  const csrf = useAuthenticityToken();
  const {t} = useTranslation();
  const resolver = useTranslatedResolver(zodResolver(formSchema));

  const form = useInitForm<TForm>({
    resolver,
  });

  const isDoneType = form.isDoneType;
  const fetcherRemix = useFetcher();
  const recipient: TRecipient = fetcherRemix.data?.recipient ?? props.recipient;

  const handleSubmit = (params: TParams, {fetcher}: TOptionsSubmitForm) => {
    const formattedParams = {...params, phone: normalizePhoneNumber(params.phone), csrf, uuid};
    fetcher.submit(
      {...formattedParams},
      {
        method: EFormMethods.Patch,
        action: createPath({
          route: ERoutes.Recipient,
          withIndex: true,
        }),
      },
    );
  };

  useEffect(() => {
    if (isDoneType && !props.success && !props.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    if (isDoneType && props.success && !props.fieldErrors) {
      notify.success({
        title: "Сохранено",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.success, isDoneType]);

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
              defaultValue={recipient?.name ?? ""}
              isRequired={true}
              label={t("form.firstName.title") ?? "First name"}
              name={EFormFields.Name}
              type="text"
            />
            <Input
              defaultValue={recipient?.surname ?? ""}
              isRequired={true}
              label={t("form.lastName.title") ?? "Last name"}
              name={EFormFields.Surname}
              type="text"
            />
            <PhoneInputMask
              defaultValue={recipient?.phone ?? ""}
              isRequired={true}
              label={t("form.mobilePhone.title") ?? "Mobile phone"}
              name={EFormFields.Phone}
            />
            <Input
              defaultValue={recipient?.email ?? ""}
              isRequired={true}
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
