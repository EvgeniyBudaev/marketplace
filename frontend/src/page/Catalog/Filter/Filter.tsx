import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { TRANSITION } from "src/constants";
import { TCatalog, TCatalogAttributeItem } from "src/entities/catalogs";
import { TParams } from "src/types";
import { Accordion, Button, Checkbox, Overlay } from "src/uikit";
import { transformObjectToURLParams } from "src/utils";
import classes from "./Filter.module.scss";

type TProps = {
  catalog: TCatalog;
};

export const Filter: FC<TProps> = ({ catalog }) => {
  console.log("Filter catalog: ", catalog);
  const mapToInitialState = (
    attributes: TCatalogAttributeItem[]
  ): { [key: string]: string[] } =>
    attributes.reduce((acc, item) => ({ ...acc, [item.alias]: [] }), {});

  const attributes = catalog.selectAttribute;
  const initialState = mapToInitialState(attributes);
  // console.log("initialState: ", initialState);
  const [checked, setChecked] = useState(initialState);
  const router = useRouter();
  console.log("checked: ", checked);

  const onChangeCheckedBox = (
    event: ChangeEvent<HTMLInputElement>,
    nameGroup: string
  ) => {
    const {
      target: { checked, value },
    } = event;
    if (checked) {
      setChecked(prevState => ({
        ...prevState,
        [nameGroup]: [...prevState[nameGroup], value],
      }));
    } else {
      setChecked(prevState => ({
        ...prevState,
        [nameGroup]: [
          ...prevState[nameGroup].filter((x: string) => x !== value),
        ],
      }));
    }
  };

  const onLoad = useCallback((params?: TParams) => {
    router.push(
      `/catalog/${catalog.alias}?${transformObjectToURLParams({ ...params })}`
    );
  }, []);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onLoad(checked);
  };

  return (
    <aside className={classes.Filter}>
      <Overlay timeout={TRANSITION} onClick={() => {}} isActive={false} />
      <form className={classes.AsideFilterDesktop} onSubmit={handleSubmit}>
        {attributes.map(item => (
          <Accordion key={item.name} title={item.name} isActive={true}>
            {item.values.map((label, index) => (
              <Checkbox
                className={classes.CheckboxItem}
                id={index.toString() + label}
                label={label}
                checkedBox={checked}
                key={index}
                nameGroup={item.alias}
                onClick={(event, nameGroup) =>
                  onChangeCheckedBox(event, nameGroup)
                }
              />
            ))}
          </Accordion>
        ))}
        <Button type="submit">Применить</Button>
      </form>
    </aside>
  );
};
