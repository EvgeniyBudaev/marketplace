import { useState, useEffect } from "react";
import type { FC, FocusEvent } from "react";
import { zodResolver } from '@hookform/resolvers/zod';
import {EFormMethods, Form, useInitForm} from "~/shared/form";
import {formSchema} from "~/pages/Auth/Login/schemas";
import {TForm} from "~/pages/Auth/Login/types";
import {Input} from "~/shared/form";
import {TParams} from "~/types";
import {Button} from "~/uikit";
import styles from "./Login.module.css";

export const Login: FC = () => {
    const [isFocused, setIsFocused] = useState({
        email: false,
        password: false,
    });
    const form = useInitForm<TForm>({
        resolver: zodResolver(formSchema),
    });

    const onFocus = (event: FocusEvent<HTMLInputElement>) => {
        setIsFocused({ ...isFocused, [event.target.name]: true });
    };

    const onBlur = (event: FocusEvent<HTMLInputElement>) => {
        // if (form.methods.watch(event.target.name)) {
        //     setIsFocused({ ...isFocused, [event.target.name]: true });
        // } else {
        //     setIsFocused({ ...isFocused, [event.target.name]: false });
        // }
    };

    const handleSubmit = (params: TParams) => {
        //onSubmit(params);
        console.log("Form params: ", params);
    };

    const onChange = (e: any) => {
        console.log(e.target.value);
    }

  return (
    <section className="Login">
      <div className="Login-Center">
        <div className="Login-CenterContent">
          <h1 className="Login-CenterContentTitle">Вход</h1>
            <Form<TForm> form={form} handleSubmit={handleSubmit} method={EFormMethods.Get}>
                <div className="Login-FormFieldGroup">
                    <Input
                        label="Электронная почта"
                        name="email"
                        type="text"
                        isFocused={isFocused.email}
                        onBlur={onBlur}
                        onFocus={onFocus}
                    />
                    {/*<input name="email" onChange={onChange} />*/}
                </div>
                <div className="Login_Control">
                    <Button
                        className="Login_Button"
                        type="submit"
                    >
                        Войти
                    </Button>
                </div>
            </Form>
        </div>
      </div>
    </section>
  );
};

export function loginLinks() {
    return [{ rel: "stylesheet", href: styles }];
}

