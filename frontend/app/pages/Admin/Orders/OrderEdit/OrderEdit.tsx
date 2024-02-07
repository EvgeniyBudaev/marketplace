import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useAuthenticityToken } from "remix-utils/csrf/react";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "~/hooks";
import { EFormFields, formSchema } from "~/pages/Admin/Orders/OrderEdit";
import type { TForm, TOptionsSubmitForm } from "~/pages/Admin/Orders/OrderEdit";
import { mapOrderEditToDto } from "~/pages/Admin/Orders/OrderEdit/utils";
import {
  orderEditProductsTableLinks,
  OrderEditProductsTable,
} from "~/pages/Admin/Orders/OrderEditProductsTable";
import type { TOrderDetail } from "~/shared/api/orders";
import { getFetcherOptions } from "~/shared/fetcher";
import { EFormMethods, Form, Input, Select, Textarea, useInitForm } from "~/shared/form";
import type { TDomainErrors, TParams } from "~/types";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import styles from "./OrderEdit.css";
import { createPath } from "~/utils";
import { ERoutes } from "~/enums";
import { useEffect } from "react";

type TProps = {
  fieldErrors?: TDomainErrors<string>;
  formError?: string;
  id: string;
  order: TOrderDetail;
  success?: boolean;
};

export const OrderEdit: FC<TProps> = (props) => {
  const csrf = useAuthenticityToken();
  const { theme } = useTheme();
  const { t } = useTranslation();
  const fetcherRemix = useFetcher();
  const { isLoading } = getFetcherOptions(fetcherRemix);
  const order: TOrderDetail = fetcherRemix.data?.order ?? props.order;
  // console.log("order: ", order);
  const selectStatusOptions = [{ value: order.status.id.toString(), label: order.status.name }];
  const selectPaymentVariantOptions = [
    { value: order.paymentVariant.id.toString(), label: order.paymentVariant.name },
  ];

  const form = useInitForm<TForm>({
    resolver: zodResolver(formSchema),
  });
  const isDoneType = form.isDoneType;

  useEffect(() => {
    if (isDoneType && !props.success && !props.fieldErrors) {
      notify.error({
        title: "Ошибка выполнения",
      });
    }
    if (isDoneType && props.success && !props.fieldErrors) {
      notify.success({
        title: "Обновлено",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.success, isDoneType]);

  const handleSubmit = (params: TParams, { fetcher }: TOptionsSubmitForm) => {
    const formattedParams = mapOrderEditToDto({
      params: { ...params, csrf, id: props.id, items: order.items },
    });
    console.log("Form formattedParams: ", formattedParams);

    fetcher.submit(formattedParams, {
      method: EFormMethods.Patch,
      action: createPath({
        route: ERoutes.AdminOrderEdit,
        params: { id: props.id },
        withIndex: true,
      }),
    });
  };

  return (
    <section>
      <h1 className="OrderEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>
          {t("pages.admin.orderEdit.title")}
        </Typography>
      </h1>
      <Form<TForm>
        className="OrderEdit-Form"
        form={form}
        handleSubmit={handleSubmit}
        method={EFormMethods.Patch}
      >
        <div className="OrderEdit-Form-Group">
          <Select
            className="OrderEdit-Form-Field"
            defaultValue={selectStatusOptions[0]}
            name={EFormFields.Status}
            options={selectStatusOptions}
            theme={theme}
          />
          <Select
            className="OrderEdit-Form-Field"
            defaultValue={selectPaymentVariantOptions[0]}
            name={EFormFields.PaymentVariant}
            options={selectPaymentVariantOptions}
            theme={theme}
          />
        </div>
        <div className="OrderEdit-Form-Recipient">
          <div className="OrderEdit-Form-Recipient-Title">
            <Typography variant={ETypographyVariant.TextB2SemiBold}>
              {t("pages.admin.orderEdit.recipient.edit")}
            </Typography>
          </div>
          <Input
            defaultValue={order?.recipient?.name ?? ""}
            label={t("form.recipient.name") ?? "Name"}
            name={EFormFields.RecipientName}
            type="text"
          />
          <Input
            defaultValue={order?.recipient?.surname ?? ""}
            label={t("form.recipient.surname") ?? "Surname"}
            name={EFormFields.RecipientSurname}
            type="text"
          />
          <Input
            defaultValue={order?.recipient?.phone ?? ""}
            label={t("form.recipient.phone") ?? "Phone"}
            name={EFormFields.RecipientPhone}
            type="text"
          />
          <Input
            defaultValue={order?.recipient?.email ?? ""}
            label={t("form.recipient.email") ?? "Email"}
            name={EFormFields.RecipientEmail}
            type="text"
          />
        </div>

        <div className="OrderEdit-Form-ShippingAddress">
          <div className="OrderEdit-Form-ShippingAddress-Title">
            <Typography variant={ETypographyVariant.TextB2SemiBold}>
              {t("pages.admin.orderEdit.shipping.edit")}
            </Typography>
          </div>
          <Input
            defaultValue={order?.shippingAddress?.address ?? ""}
            label={t("form.shippingAddress.address") ?? "Address"}
            name={EFormFields.ShippingAddress}
            type="text"
          />
          <Input
            defaultValue={order?.shippingAddress?.flat ?? ""}
            label={t("form.shippingAddress.flat") ?? "Flat"}
            name={EFormFields.ShippingFlat}
            type="text"
          />
          <Input
            defaultValue={order?.shippingAddress?.floor ?? ""}
            label={t("form.shippingAddress.floor") ?? "Floor"}
            name={EFormFields.ShippingFloor}
            type="text"
          />
          <Textarea
            className="OrderEdit-Form-TextField"
            defaultValue={order?.shippingAddress?.comment ?? ""}
            label={t("form.shippingAddress.comment") ?? "Comment"}
            name={EFormFields.ShippingComment}
          />
        </div>

        <OrderEditProductsTable
          fieldsSortState={{
            columns: [],
            multiple: false,
            onChangeSorting: () => {},
          }}
          isLoading={isLoading}
          items={order?.items ?? []}
        />

        <div className="OrderEdit-Control">
          <Button className="OrderEdit-Button" type="submit">
            {t("common.actions.save")}
          </Button>
        </div>
      </Form>
    </section>
  );
};

export function orderEditLinks() {
  return [{ rel: "stylesheet", href: styles }, ...orderEditProductsTableLinks()];
}
