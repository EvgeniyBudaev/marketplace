import * as React from 'react';

import { SpinnerIcon } from '~/icons';

export const TableLoader: React.FC = () => {
  return (
    <div className="t-0 l-0 bg-grey/50 absolute flex h-full w-full items-center justify-center">
      <SpinnerIcon className="h-10 w-10 animate-spin" />
    </div>
  );
};
