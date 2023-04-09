import { useCallback, useEffect } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { FieldValues, Path, Resolver, ResolverOptions } from "react-hook-form";
import { Link } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrors } from "~/components";
import { ERoutes } from "~/enums";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import type { TUseInitFormReturn } from "~/shared/form";
import { EFormFields } from "~/pages/Auth/Login/enums";
import { formSchema } from "~/pages/Auth/Login/schemas";
import type { TForm, TOptionsSubmitForm } from "~/pages/Auth/Login/types";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Login.module.css";

const useTranslatedResolver = <TFieldValues extends FieldValues, TContext = any>(
  resolver: Resolver<TFieldValues, TContext>,
) => {
  const { t } = useTranslation();

  return useCallback(
    async (values: TFieldValues, context: TContext, options: ResolverOptions<TFieldValues>) => {
      const data = await resolver(values, context, options);

      return {
        values: data.values,
        errors: Object.fromEntries(
          Object.entries(data.errors).map(([field, error]) => {
            return [
              field,
              error && {
                ...error,
                message: error.message && t(error.message.toString()),
              },
            ];
          }),
        ),
      };
    },
    [resolver, t],
  );
};

const useTranslatedForm = <T extends FieldValues>(
  form: TUseInitFormReturn<T>,
): TUseInitFormReturn<T> => {
  const { t } = useTranslation();

  useEffect(() => {
    form.methods.trigger(
      Object.entries(form.methods.getValues())
        .filter(([_field, value]) => value)
        .map(([field]) => field) as Path<T>[],
    );
  }, [form.methods, t]);

  return form;
};

export const Login: FC = () => {
  const { t } = useTranslation();
  const resolver = useTranslatedResolver(zodResolver(formSchema));

  const form = useTranslatedForm(
    useInitForm<TForm>({
      resolver,
    }),
  );

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
    fetcher.submit(params, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.Login,
        withIndex: true,
      }),
    });
  };

  return (
    <section className="Login">
      <div className="Login-Center">
        <div className="Login-CenterContent">
          <h1 className="Login-CenterContentTitle">
            <Typography variant={ETypographyVariant.TextH1Bold}>{t("login.title")}</Typography>
          </h1>
          <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
            <div className="Login-FormFieldGroup">
              <Input
                label={t("form.email.title") ?? "Email"}
                name={EFormFields.Email}
                type="text"
              />
              <Input
                label={t("form.password.title") ?? "Password"}
                name={EFormFields.Password}
                type="text"
              />
              <FormErrors fetcher={form.fetcher} />
            </div>
            <div className="Login-Control">
              <Button className="Login-Button" type="submit">
                {t("login.enter")}
              </Button>
            </div>
          </Form>
          <div className="Login-Signup">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("login.noAccount")}
            </Typography>
            <Link to={ERoutes.Signup}>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("login.register")}
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export function loginLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
