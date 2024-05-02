import { useEffect, useState } from "react";
import type { FC, MouseEvent } from "react";
import { useNavigate } from "@remix-run/react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { SearchGlobalListItem } from "#app/components/search/SearchGlobal/SearchGlobalListItem";
import type {
  TFocusDirection,
  TFocusedOption,
} from "#app/components/search/SearchGlobal/types";
import { useKey } from "#app/hooks";
import type {
  TProductByCatalog,
  TProductsByCatalog,
} from "#app/shared/api/products";
import styles from "./SearchGlobalList.css";

type TProps = {
  productList: TProductsByCatalog | null;
  onBlur: () => void;
};

export const SearchGlobalList: FC<TProps> = ({ productList, onBlur }) => {
  const [focusedOption, setFocusedOption] = useState<TFocusedOption>({
    focusedOption: null,
  });
  const [list, setList] = useState<TProductByCatalog[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const arrowUpPressed = useKey("ArrowUp");
  const arrowDownPressed = useKey("ArrowDown");
  const enterPressed = useKey("Enter");

  useEffect(() => {
    if (!isNil(productList) && !isEmpty(productList.content)) {
      const items = [
        //...groupProductsByCatalog(productList).slice(0, 2),
        ...productList.content.slice(0, 5),
      ];
      setList(items);
    } else {
      setList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList]);

  useEffect(() => {
    setFocusedOption({ focusedOption: list[selectedIndex] });
  }, [list, selectedIndex]);

  const focusOption = (direction: TFocusDirection) => {
    if (!list.length) return;
    let nextFocus = selectedIndex;

    if (direction === "up") {
      nextFocus = selectedIndex > 0 ? selectedIndex - 1 : list.length - 1;
      setSelectedIndex(nextFocus);
    } else if (direction === "down") {
      nextFocus = selectedIndex !== list.length - 1 ? selectedIndex + 1 : 0;
      setSelectedIndex(nextFocus);
    }
  };

  const handleKeyDown = (event: KeyboardEvent | null) => {
    if (event) {
      switch (event.key) {
        case "ArrowUp":
          focusOption("up");
          break;
        case "ArrowDown":
          focusOption("down");
          break;
        case "Enter":
          event.preventDefault();
          if (
            focusedOption.focusedOption &&
            focusedOption.focusedOption["catalogAlias"] !== undefined
          ) {
            navigate(`product/${focusedOption.focusedOption.alias}`);
            onBlur();
          }
          break;
      }
    }
  };

  useEffect(() => {
    if (arrowUpPressed.keyup) {
      handleKeyDown(arrowUpPressed.event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowUpPressed]);

  useEffect(() => {
    if (arrowDownPressed.keydown) {
      handleKeyDown(arrowDownPressed.event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arrowDownPressed]);

  useEffect(() => {
    if (enterPressed.enter) {
      handleKeyDown(enterPressed.event);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPressed]);

  const handleMouseOver = (event: MouseEvent<HTMLLIElement>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <ul className="SearchProductList">
        {!isEmpty(list) &&
          list.map((item, index) => (
            <SearchGlobalListItem
              index={index}
              item={item}
              key={item.id}
              aria-pressed={index === selectedIndex}
              isActive={index === selectedIndex}
              onMouseOver={handleMouseOver}
            />
          ))}
      </ul>
    </>
  );
};

export function searchGlobalListLinks() {
  return [{ rel: "stylesheet", href: styles }];
}
