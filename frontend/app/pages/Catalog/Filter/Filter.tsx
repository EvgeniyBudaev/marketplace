import { useState } from "react";
import type { ChangeEvent, FC } from "react";
import { TRANSITION } from "~/constants";
import { TCatalogAttributeItem, TCatalogDetail } from "~/shared/api/catalogs";
import { TParams } from "~/types";
import { Accordion, Button, Checkbox, Overlay } from "~/uikit";
import styles from "./Filter.module.css";

type TProps = {
  catalog: TCatalogDetail;
  onLoad: (params: TParams) => void;
};

export const Filter: FC<TProps> = ({ catalog, onLoad }) => {
  const mapToInitialState = (attributes: TCatalogAttributeItem[]): { [key: string]: string[] } =>
    attributes.reduce((acc, item) => ({ ...acc, [item.alias]: [] }), {});

  const attributes = catalog.selectAttribute.filter((attribute) => attribute.values.length > 0);
  const initialState = mapToInitialState(attributes);
  const [checked, setChecked] = useState(initialState);

  const onChangeCheckedBox = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    nameGroup: string,
  ) => {
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
                id={valueItem.id.toString()}
                label={valueItem.value}
                checkedBox={checked}
                key={index}
                nameGroup={item.alias}
                onClick={(event, id, nameGroup) => onChangeCheckedBox(event, id, nameGroup)}
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
