import type { FC } from "react";
import { Link } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { EFormFields } from "~/pages/Auth/Signup/enums";
import { formSchema } from "~/pages/Auth/Signup/schemas";
import type { TForm, TOptionsSubmitForm } from "~/pages/Auth/Signup/types";
import type { TParams } from "~/types";
import { Button } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Signup.module.css";

export const Signup: FC = () => {
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const errors = form.methods.formState.errors;
  console.log("errors: ", errors);

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    console.log("Form params: ", params);
    fetcher.submit(params, {
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
          <h1 className="Signup-Title">Регистрация</h1>
          <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Post}>
            <div className="Signup-FormFieldGroup">
              <Input label="Имя" name={EFormFields.FirstName} type="text" />
              <Input label="Фамилия" name={EFormFields.LastName} type="text" />
              <Input label="Отчество" name={EFormFields.MiddleName} type="text" />
              <Input label="Мобильный телефон" name={EFormFields.Phone} type="text" />
              <Input label="Электронная почта" name={EFormFields.Email} type="text" />
              <Input label="Адрес" name={EFormFields.ShippingAddress} type="text" />
              <Input label="Пароль" name={EFormFields.Password} type="text" />
              <Input label="Подтверждение пароля" name={EFormFields.RePassword} type="text" />
            </div>
            <div className="Signup-Control">
              <Button className="Signup-Button" type="submit">
                Зарегистрироваться
              </Button>
            </div>
          </Form>
          <div className="Signup-Registration">
            <span>Есть аккаунт?</span>
            <Link to={ERoutes.Login}>Войти</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export function signupLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
