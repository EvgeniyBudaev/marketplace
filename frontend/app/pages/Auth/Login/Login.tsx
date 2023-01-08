import type { FC } from "react";
import { Link } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { EFormFields } from "~/pages/Auth/Login/enums";
import { formSchema } from "~/pages/Auth/Login/schemas";
import type { TForm, TOptionsSubmitForm } from "~/pages/Auth/Login/types";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Login.module.css";

export const Login: FC = () => {
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  //console.log("fetcher.data: ", form.fetcher.data);
  const errors = form.methods.formState.errors;
  //console.log("errors: ", errors);

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
            <Typography variant={ETypographyVariant.TextH1Bold}>Вход</Typography>
          </h1>
          <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
            <div className="Login-FormFieldGroup">
              <Input label="Электронная почта" name={EFormFields.Email} type="text" />
              <Input label="Пароль" name={EFormFields.Password} type="text" />
            </div>
            <div className="Login-Control">
              <Button className="Login-Button" type="submit">
                Войти
              </Button>
            </div>
          </Form>
          <div className="Login-Signup">
            <Typography variant={ETypographyVariant.TextB3Regular}>Нет аккаунта?</Typography>
            <Link to={ERoutes.Signup}>
              <Typography variant={ETypographyVariant.TextB3Regular}>Зарегистрироваться</Typography>
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
