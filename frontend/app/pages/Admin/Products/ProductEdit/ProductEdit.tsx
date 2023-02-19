import { useEffect, useState } from "react";
import type { FC, ChangeEvent } from "react";
import { useFetcher } from "@remix-run/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERoutes, ETheme } from "~/enums";
import { useSettings } from "~/hooks";
import type { TProductDetail } from "~/shared/api/products";
import { Checkbox, EFormMethods, Form, Input, Select, useInitForm } from "~/shared/form";
import type { TParams } from "~/types";
import { Button, ETypographyVariant, notify, Typography } from "~/uikit";
import { createPath } from "~/utils";
import styles from "./ProductEdit.module.css";

type TProps = {
  product: TProductDetail;
};

export const ProductEdit: FC<TProps> = ({ product }) => {
  return (
    <section>
      <h1 className="ProductEdit-Title">
        <Typography variant={ETypographyVariant.TextH1Bold}>Редактирование продукта</Typography>
      </h1>
    </section>
  );
};

export function productEditLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
