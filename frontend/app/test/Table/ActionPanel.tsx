import * as React from "react";
import clsx from "clsx";

import { Button } from "~/components";

export type TTableAction = {
  label: string | JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  postfixIcon?: JSX.Element;
  id: string;
};

export interface IActionPanelProps {
  actions: Array<TTableAction>;
  className?: string;
  dataTestId?: string;
}

export function ActionPanel({
  actions,
  className,
  dataTestId,
}: IActionPanelProps): React.ReactElement | null {
  return !actions.length ? null : (
    <div
      className={clsx("bg-grey border-grey-light flex rounded-t-lg border-b p-4", className)}
      data-testid={dataTestId}
    >
      <div className="text-grey-900 flex gap-px bg-gray-900">
        <div className="bg-grey flex items-center px-4">
          {actions.map(({ id, label, disabled, onClick, postfixIcon }, index) => (
            <React.Fragment key={id}>
              <Button disabled={disabled} onClick={onClick} postfixIcon={postfixIcon} theme="empty">
                {label}
              </Button>
              {index < actions.length - 1 && <div className="bg-grey-dark mx-8 h-full w-px" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
