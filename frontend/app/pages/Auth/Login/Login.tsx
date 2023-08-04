import { useCallback, useState } from "react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Transition } from "history";

import { FormErrors } from "~/components";
import { ERoutes } from "~/enums";
import { useBlocker, useTranslatedForm, useTranslatedResolver } from "~/hooks";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { EFormFields } from "~/pages/Auth/Login/enums";
import { formSchema } from "~/pages/Auth/Login/schemas";
import type { TForm, TOptionsSubmitForm } from "~/pages/Auth/Login/types";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, Modal, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./Login.css";

export const Login: FC = () => {
  const { t } = useTranslation();
  const resolver = useTranslatedResolver(zodResolver(formSchema));
  const [isOpen, setIsOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(true);

  const form = useTranslatedForm(
    useInitForm<TForm>({
      resolver,
    }),
  );

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    fetcher.submit(params, {
      method: EFormMethods.Post,
      action: createPath({
        route: ERoutes.Login,
        withIndex: true,
      }),
    });
  };

  const blocker = useCallback((tx: Transition) => {
    setIsOpen(true);
  }, []);

  const transition = useBlocker(blocker, hasChanges);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUnblockTransition = useCallback(() => {
    setHasChanges(false);
    closeModal();
    transition?.retry();
  }, [transition]);

  return (
    <section className="Login">
      <div className="Login-Center">
        <div className="Login-CenterContent">
          <h1 className="Login-CenterContentTitle">
            <Typography variant={ETypographyVariant.TextH1Bold}>
              {t("pages.login.title")}
            </Typography>
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
                {t("pages.login.enter")}
              </Button>
            </div>
          </Form>
          <div className="Login-Signup">
            <Typography variant={ETypographyVariant.TextB3Regular}>
              {t("pages.login.noAccount")}
            </Typography>
            <Link
              to={createPath({
                route: ERoutes.Signup,
              })}
            >
              <Typography variant={ETypographyVariant.TextB3Regular}>
                {t("pages.login.register")}
              </Typography>
            </Link>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onCloseModal={() => setIsOpen(false)}>
        <Modal.Header>
          <Typography variant={ETypographyVariant.TextB2Bold}>Окно подтверждения</Typography>
        </Modal.Header>
        <Modal.Footer>
          <div className="ModalDelete-Footer">
            <Button className="ModalDelete-Cancel" onClick={() => setIsOpen(false)}>
              Отменить
            </Button>
            <Button onClick={handleUnblockTransition} type={"submit"}>
              Подтвердить
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export function loginLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
