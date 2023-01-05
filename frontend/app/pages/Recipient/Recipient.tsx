import type { FC } from "react";
import { Link, useNavigate } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes } from "~/enums";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { EFormFields } from "~/pages/Recipient/enums";
import { formSchema } from "~/pages/Recipient/schemas";
import type { TForm } from "~/pages/Recipient/types";
import { Button, ETypographyVariant, Icon, Typography } from "~/uikit";
import styles from "./Recipient.module.css";

export const Recipient: FC = () => {
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();

  const handleSubmit = (params: TParams) => {
    console.log("Form params: ", params);
    navigate(ERoutes.Order);
  };

  return (
    <section className="Recipient">
      <div className="Recipient-Step">
        <Typography variant={ETypographyVariant.TextB4Regular}>Шаг 2 из 3</Typography>
      </div>
      <h1 className="Recipient-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Получатель</Typography>
      </h1>
      <div className="Recipient-Inner">
        <Form<TForm>
          className="Recipient-Form"
          form={form}
          handleSubmit={handleSubmit}
          method={EFormMethods.Post}
        >
          <div className="Recipient-FormContent">
            <Input label="Имя" name={EFormFields.FirstName} type="text" />
            <Input label="Фамилия" name={EFormFields.LastName} type="text" />
            <Input label="Мобильный телефон" name={EFormFields.Phone} type="text" />
            <Input label="Электронная почта" name={EFormFields.Email} type="text" />
          </div>
          <div className="Recipient-FormFooter">
            <div className="Recipient-Controls">
              <Link className="Recipient-ControlsLink" to={ERoutes.Shipping}>
                <Icon type="ArrowBack" />
                <div className="Recipient-ControlsText">
                  <Typography variant={ETypographyVariant.TextB3Regular}>Назад</Typography>
                </div>
              </Link>
              <Button type="submit">
                <Typography variant={ETypographyVariant.TextB3Regular}>Продолжить</Typography>
              </Button>
            </div>
          </div>
        </Form>
        <div className="Recipient-Info">
          <Icon className="Recipient-InfoIcon" type="Attention" />
          <div className="Recipient-InfoText">
            <div className="Recipient-InfoTitle">
              <Typography variant={ETypographyVariant.TextB3Regular}>Указывайте</Typography>
              <br />
              <Typography variant={ETypographyVariant.TextB3Regular}>реальные данные</Typography>
            </div>
            <div>
              <Typography variant={ETypographyVariant.TextB3Regular}>
                У вас могут попросить паспорт,
              </Typography>
              <br />
              <Typography variant={ETypographyVariant.TextB3Regular}>
                прежде чем вручить оплаченный заказ
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export function recipientLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
