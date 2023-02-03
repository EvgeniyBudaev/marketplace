import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useSearchParams, useSubmit } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { attributeAddLinks } from "~/pages/Admin/Attributes/AttributeAdd";
import { AttributesTable } from "~/pages/Admin/Attributes/AttributesTable/AttributesTable";
import { TAttributes } from "~/shared/api/attributes";
import { TParams } from "~/types";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Attributes.module.css";

type TProps = {
  attributes: TAttributes;
};

export const Attributes: FC<TProps> = ({ attributes }) => {
  const submit = useSubmit();
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<TParams>({});
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const getFormData = useCallback(() => {
    const formData = new FormData();

    // formData.append("sort", sorting);
    formData.append("page", page.toString());

    Object.entries(filter).forEach(([group, values]) => {
      values.forEach((value: string) => formData.append(group, value));
    });

    return formData;
  }, [page]);

  useEffect(() => {
    history?.push("?" + new URLSearchParams(getFormData() as any).toString());
    submit(getFormData());
  }, [page]);

  const handleChangePage = useCallback(
    ({ selected }: { selected: number }) => {
      setPage(selected + 1);
    },
    [setPage],
  );

  return (
    <section className="Attributes">
      <div className="Attributes-Header">
        <div>
          <h1 className="Attributes-Title">
            <Typography variant={ETypographyVariant.TextH1Bold}>Атрибуты</Typography>
          </h1>
        </div>
        <div>
          <LinkButton href="/admin/attributes/add">Добавить</LinkButton>
        </div>
      </div>
      <AttributesTable attributes={attributes} onChangePage={handleChangePage} />
    </section>
  );
};

export function attributesLinks() {
  return [{ rel: "stylesheet", href: styles }, ...attributeAddLinks()];
}
