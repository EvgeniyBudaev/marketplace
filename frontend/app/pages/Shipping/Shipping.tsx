import type { FC } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty";
import { zodResolver } from "@hookform/resolvers/zod";
import { EFormFields } from "~/pages/Shipping/enums";
import { TForm } from "~/pages/Shipping/types";
import { formSchema } from "~/pages/Shipping/schemas";
import { EFormMethods, Form, Input, useInitForm } from "~/shared/form";
import { TParams } from "~/types";
import { Button, Icon } from "~/uikit";
import styles from "./Shipping.module.css";
import { ERoutes } from "~/enums";

export const Shipping: FC = () => {
  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });

  const address = "Moscow";

  const handleSubmit = (params: TParams) => {
    console.log("Form params: ", params);
  };

  return (
    <section className="Shipping">
      <div className="Shipping-Step">Шаг 1 из 3</div>
      <h2 className="Shipping-Title">Где Вы хотите получить заказ?</h2>
      <Form<TForm>
        className="Shipping-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Post}
      >
        <div className="Shipping-FormContent">
          <div className="Shipping-FormFieldGroup">
            <Input label="Адрес" name={EFormFields.Address} type="text" />
          </div>
          <div className={clsx("Shipping-FormFieldGroup", "Shipping-FormFieldCouple")}>
            <Input
              className="Shipping-FormFieldGroupItem"
              label="Квартира"
              name={EFormFields.Apartment}
              type="text"
            />
            <Input
              className="Shipping-FormFieldGroupItem"
              label="Этаж"
              name={EFormFields.Floor}
              type="text"
            />
          </div>
          <div className={clsx("Shipping-FormFieldGroup", "Shipping-FormFieldCouple")}>
            <Input
              className="Shipping-FormFieldGroupItem"
              label="Подъезд"
              name={EFormFields.Entrance}
              type="text"
            />
            <Input
              className="Shipping-FormFieldGroupItem"
              label="Домофон"
              name={EFormFields.Intercom}
              type="text"
            />
          </div>
          <div className="Shipping-FormFieldGroup">
            <Input
              className="Shipping-TextField"
              label="Комментарий для курьера"
              name={EFormFields.Comment}
              type="textarea"
            />
          </div>
        </div>
        <div className="Shipping-FormFooter">
          <div className="Shipping-Controls">
            <Link className="Shipping-ControlsLink" to={ERoutes.Cart}>
              <Icon type="ArrowBack" />
              <div className="Shipping-ControlsText">В корзину</div>
            </Link>
            <Button className="Shipping-Button" type="submit" isDisabled={isEmpty(address)}>
              Продолжить
            </Button>
          </div>
        </div>
      </Form>
    </section>
  );
};

export function shippingLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
