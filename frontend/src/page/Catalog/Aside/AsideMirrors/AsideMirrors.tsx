import { ChangeEvent, FC, useState } from "react";
import { Accordion, Button, Checkbox } from "src/uikit";
import { filterMirrors } from "./constants";
import { TCheckedMirrors } from "./types";
import classes from "./AsideMirrors.module.scss";

export const AsideMirrors: FC = () => {
  const [checkedMirrors, setCheckedMirrors] = useState<TCheckedMirrors>({
    inStock: ["В наличии"],
    category: [],
    form: [],
    frame_color: [],
  });

  const handleChangeCheckedBox = (
    event: ChangeEvent<HTMLInputElement>,
    nameGroup: keyof TCheckedMirrors
  ) => {
    const {
      target: { checked, value },
    } = event;
    if (checked) {
      setCheckedMirrors(prevState => ({
        ...prevState,
        [nameGroup]: [...prevState[nameGroup], value],
      }));
    } else {
      setCheckedMirrors(prevState => ({
        ...prevState,
        [nameGroup]: [...prevState[nameGroup].filter(x => x !== value)],
      }));
    }
  };

  return (
    <form className={classes.AsideFilterDesktop} onSubmit={() => {}}>
      {filterMirrors.map(item => (
        <Accordion
          key={item.filter.filterName}
          title={item.filter.filterName}
          isActive={true}
        >
          {item.entities.map((label, index) => (
            <Checkbox
              className={classes.CheckboxItem}
              id={index.toString() + label}
              label={label}
              checkedBox={checkedMirrors}
              key={index}
              nameGroup={item.filter.filterNameOnBackend}
              onClick={(event, nameGroup) =>
                handleChangeCheckedBox(
                  event,
                  nameGroup as keyof TCheckedMirrors
                )
              }
            />
          ))}
        </Accordion>
      ))}
      <Button
        className={classes.MirrorsAsideButton}
        type="submit"
        onClick={() => {}}
      >
        Применить
      </Button>
    </form>
  );
};
