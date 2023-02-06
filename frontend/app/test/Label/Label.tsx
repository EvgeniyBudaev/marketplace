import * as React from 'react';
import clsx from 'clsx';
import type { TLabelType } from './types';

export type TLabelProps = JSX.IntrinsicElements['label'] & {
  as?: 'div' | 'label' | 'span';
  children?: React.ReactNode;
  className?: string;
  label?: TLabelType;
  dataTestId?: string;
};

const LabelComponent: React.FC<TLabelProps> = ({
  as = 'label',
  className,
  dataTestId,
  children,
  ...props
}) => {
  return React.createElement(
    as,
    {
      className: clsx('form-label', className, {
        'text-grey-dark text-xs font-medium': !className,
      }),
      'data-testid': dataTestId,
      ...props,
    },
    children,
  );
};

export const Label = React.memo(LabelComponent);
