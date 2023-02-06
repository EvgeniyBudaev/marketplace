import * as React from 'react';

import type { TOptionsProps } from '../Options';
import { Options } from '../Options';

export type TFooterProps<T extends object> = {
  options?: Omit<TOptionsProps<T>, 'columns'>;
  columns: TOptionsProps<T>['columns'];
};

const FooterComponent = <T extends object>({
  options,
  columns,
}: TFooterProps<T>): React.ReactElement => {
  return (
    <div className="bg-grey flex items-center justify-center p-6">
      <div className="text-grey-900 flex gap-px bg-gray-900">
        {options && <Options {...options} columns={columns} />}
      </div>
    </div>
  );
};

export const Footer = React.memo(FooterComponent) as typeof FooterComponent;
