import type { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { EFormMethods, Form, useInitForm } from "~/shared/form";
import { formSchema } from "~/pages/Auth/Login/schemas";
import { TForm } from "~/pages/Auth/Login/types";
import { Input } from "~/shared/form";
import { TParams } from "~/types";
import { Button } from "~/uikit";
import styles from "./Login.module.css";
import {Link} from "@remix-run/react";
import {ROUTES} from "~/constants";

export const Login: FC = () => {
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (params: TParams) => {
    console.log("Form params: ", params);
  };

  return (
    <section className="Login">
      <div className="Login-Center">
        <div className="Login-CenterContent">
          <h1 className="Login-CenterContentTitle">Вход</h1>
          <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Get}>
            <div className="Login-FormFieldGroup">
              <Input label="Электронная почта" name="email" type="text" />
              <Input label="Пароль" name="password" type="text" />
            </div>
            <div className="Login-Control">
              <Button className="Login-Button" type="submit">
                Войти
              </Button>
            </div>
          </Form>
          <div className="Login-Signup">
            <span>Нет аккаунта?</span>
            <Link to={ROUTES.SIGNUP}>
              Зарегистрироваться
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
