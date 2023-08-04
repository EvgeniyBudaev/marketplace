import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrors } from "~/components";
import { ERoutes } from "~/enums";
import { useTranslatedForm, useTranslatedResolver } from "~/hooks";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { EFormFields } from "~/pages/Auth/Signup/enums";
import { formSchema } from "~/pages/Auth/Signup/schemas";
import type { TForm, TOptionsSubmitForm } from "~/pages/Auth/Signup/types";
import { PhoneInputMask } from "~/shared/form/PhoneInputMask";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, Typography } from "~/uikit";
import { createPath, normalizePhoneNumber } from "~/utils";
import styles from "./Signup.css";

export const Signup: FC = () => {
  const { t } = useTranslation();
  const resolver = useTranslatedResolver(zodResolver(formSchema));

  const form = useTranslatedForm(
    useInitForm<TForm>({
      resolver,
    }),
  );

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    const formattedParams = { ...params, phone: normalizePhoneNumber(params.phone) };
    fetcher.submit(formattedParams, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.Signup,
        withIndex: true,
      }),
    });
  };

  return (
    <section className="Signup">
      <div className="Signup-Inner">
        <div className="Signup-Content">
          <h1 className="Signup-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>
              {t("pages.signup.title")}
            </Typography>
          </h1>
          <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
            <div className="Signup-FormFieldGroup">
              <Input
                label={t("form.firstName.title") ?? "First name"}
                name={EFormFields.FirstName}
                type="text"
              />
              <Input
                label={t("form.lastName.title") ?? "Last name"}
                name={EFormFields.LastName}
                type="text"
              />
              <Input
                label={t("form.middleName.title") ?? "Middle name"}
                name={EFormFields.MiddleName}
                type="text"
              />
              <PhoneInputMask
                label={t("form.mobilePhone.title") ?? "Mobile phone"}
                name={EFormFields.Phone}
              />
              <Input
                label={t("form.email.title") ?? "Email"}
                name={EFormFields.Email}
                type="text"
              />
              <Input
                label={t("form.address.title") ?? "Address"}
                name={EFormFields.ShippingAddress}
                type="text"
              />
              <Input
                label={t("form.password.title") ?? "Password"}
                name={EFormFields.Password}
                type="text"
              />
              <Input
                label={t("form.passwordConfirm.title") ?? "Password confirmation"}
                name={EFormFields.RePassword}
                type="text"
              />
              <FormErrors fetcher={form.fetcher} />
            </div>
            <div className="Signup-Control">
              <Button className="Signup-Button" type="submit">
                <Typography variant={ETypographyVariant.TextB3Regular}>
                  {t("pages.signup.register")}
                </Typography>
              </Button>
            </div>
          </Form>
          <div className="Signup-Registration">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("pages.signup.haveAccount")}
            </Typography>
            <Link
              to={createPath({
                route: ERoutes.Login,
              })}
            >
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.signup.enter")}
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export function signupLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
