import { forwardRef, useCallback, useEffect } from "react";
import type { ForwardedRef } from "react";
import { useFetcher, useNavigate } from "@remix-run/react";
import clsx from "clsx";
//import { ROUTES } from "~/constants";
//import { scrollSelector } from "ducks/selectors";
import { ERoutes } from "~/enums";
//import { useMounted } from "hooks/useMounted";
//import { useSelector } from "hooks";

import type { TParams } from "~/types";
import { CatalogList, catalogListLinks } from "./CatalogList";
import { catalogListItemLinks } from "./CatalogListItem";
import styles from "./CatalogDropDown.css";

type TProps = {
  className?: string;
  ref: ForwardedRef<HTMLDivElement>;
  isOpen: boolean;
  onClose: () => void;
};

export const CatalogDropDown = forwardRef(
  ({ className, isOpen, onClose }: TProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const isLoading = fetcher.state !== "idle";

    //const { hasMounted } = useMounted();
    //const scroll = useSelector(scrollSelector);
    //const { isScroll } = hasMounted && scroll;
    const isScroll = false;

    useEffect(() => {
      onLoadCatalogs();
    }, []);

    const onLoadCatalogs = useCallback(
      (params?: TParams) => {
        fetcher.load(ERoutes.ResourcesCatalogs);
      },
      [fetcher],
    );

    return (
      <div
        className={clsx("CatalogDropDown", className, {
          CatalogDropDown__isScroll: isScroll,
        })}
        ref={ref}
      >
        <div className="CatalogDropDown-Container">
          {/*{!isLoading && <CatalogList catalogs={catalogs} onClose={onClose} />}*/}
        </div>
      </div>
    );
  },
);

CatalogDropDown.displayName = "CatalogDropDown";

export function catalogDropDownLinks() {
  return [{ rel: "stylesheet", href: styles }, ...catalogListLinks(), ...catalogListItemLinks()];
}
