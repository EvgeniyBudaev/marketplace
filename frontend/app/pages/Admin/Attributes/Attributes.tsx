import { useCallback, useEffect, useState } from "react";
import type { FC } from "react";
import { useFetcher, useSearchParams, useSubmit } from "@remix-run/react";
import { createBrowserHistory } from "history";
import { attributeAddLinks } from "~/pages/Admin/Attributes/AttributeAdd";
import { attributeEditLinks } from "~/pages/Admin/Attributes/AttributeEdit";
import { AttributesTable } from "~/pages/Admin/Attributes/AttributesTable/AttributesTable";
import { TAttributes } from "~/shared/api/attributes";
import { TParams } from "~/types";
import { ETypographyVariant, LinkButton, Typography } from "~/uikit";
import styles from "./Attributes.module.css";

type TProps = {
  attributes: TAttributes;
};

export const Attributes: FC<TProps> = (props) => {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const history = typeof document !== "undefined" ? createBrowserHistory() : null;
  const [searchParams] = useSearchParams();
  const [filter, setFilter] = useState<TParams>({});
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const attributes = fetcher.data?.attributes ?? props.attributes;

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
      <AttributesTable attributes={attributes} fetcher={fetcher} onChangePage={handleChangePage} />
    </section>
  );
};

export function attributesLinks() {
  return [{ rel: "stylesheet", href: styles }, ...attributeAddLinks(), ...attributeEditLinks()];
}
