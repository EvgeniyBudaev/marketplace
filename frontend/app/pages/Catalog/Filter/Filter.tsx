import { useCallback, useState } from "react";
import type { ChangeEvent, FC } from "react";
import { useNavigate } from "@remix-run/react";
import { TRANSITION } from "~/constants";
import {TCatalogAttributeItem, TCatalogDetail} from "~/shared/api/catalogs";
import { TParams } from "~/types";
import { Accordion, Button, Checkbox, Overlay } from "~/uikit";
import { transformObjectToURLParams } from "~/utils";
import styles from "./Filter.module.css";

type TProps = {
  catalog: TCatalogDetail;
};

export const Filter: FC<TProps> = ({ catalog }) => {
  // console.log("Filter catalog: ", catalog);
  const mapToInitialState = (attributes: TCatalogAttributeItem[]): { [key: string]: string[] } =>
    attributes.reduce((acc, item) => ({ ...acc, [item.alias]: [] }), {});

  const attributes = catalog.selectAttribute;
  const initialState = mapToInitialState(attributes);
  console.log("initialState: ", initialState);
  const [checked, setChecked] = useState(initialState);
  const navigate = useNavigate();
  console.log("checked: ", checked);

  const onChangeCheckedBox = (event: ChangeEvent<HTMLInputElement>, nameGroup: string) => {
    const {
      target: { checked, value },
    } = event;
    if (checked) {
      setChecked((prevState) => ({
        ...prevState,
        [nameGroup]: [...prevState[nameGroup], value],
      }));
    } else {
      setChecked((prevState) => ({
        ...prevState,
        [nameGroup]: [...prevState[nameGroup].filter((x: string) => x !== value)],
      }));
    }
  };

  const onLoad = useCallback((params?: TParams) => {
    navigate(`/catalog/${catalog.alias}?${transformObjectToURLParams({ ...params })}`);
  }, []);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoad(checked);
  };

  return (
    <aside className="Filter">
      <Overlay timeout={TRANSITION} onClick={() => {}} isActive={false} />
      <form className="Filter-AsideFilterDesktop" onSubmit={handleSubmit}>
        {attributes.map((item) => (
          <Accordion key={item.alias} title={item.name} isActive={true}>
            {item.values.map((valueItem, index) => (
              <Checkbox
                className="Filter-CheckboxItem"
                id={index.toString() + valueItem.id}
                label={valueItem.value}
                checkedBox={checked}
                key={index}
                nameGroup={item.alias}
                onClick={(event, nameGroup) => onChangeCheckedBox(event, nameGroup)}
              />
            ))}
          </Accordion>
        ))}
        <Button type="submit">Применить</Button>
      </form>
    </aside>
  );
};

export function filterLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
