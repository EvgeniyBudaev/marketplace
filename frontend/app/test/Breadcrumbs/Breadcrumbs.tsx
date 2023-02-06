import * as React from 'react';
import { NavLink, useMatches } from '@remix-run/react';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import type { TExtendedBreadcrumb, TBreadcrumbParams } from './types';
import { BreadcrumbHandleSchema } from './schemas';

export type TBreadcrumbsProps = {
  params?: TBreadcrumbParams;
  dataTestId?: string;
};

export const Breadcrumbs: React.FC<TBreadcrumbsProps> = ({ params = {}, dataTestId }) => {
  const { t } = useTranslation();
  const matches = useMatches();
  const breadcrumbs = matches
    .map(({ handle, pathname }) => {
      const result = BreadcrumbHandleSchema.safeParse(handle);

      if (!result.success || !result.data.breadcrumb) {
        return null;
      }

      const breadcrumbTitle = result.data.breadcrumb.title;

      const title =
        typeof breadcrumbTitle === 'function' ? breadcrumbTitle(t, params) : breadcrumbTitle;

      return {
        ...result.data.breadcrumb,
        title,
        to: pathname,
      };
    })
    .filter(Boolean) as TExtendedBreadcrumb[];

  return (
    <ul className="text-grey-dark flex space-x-1 text-xs" data-testid={dataTestId}>
      {breadcrumbs.map((breadcrumb, index) => (
        <li key={breadcrumb.to} className="flex space-x-1">
          <>
            <NavLink
              to={breadcrumb.to}
              prefetch={breadcrumb.prefetch}
              className={({ isActive }) =>
                clsx('font-semibold', isActive && 'text-primary pointer-events-none')
              }
              end
            >
              {breadcrumb.title}
            </NavLink>
            {index < breadcrumbs.length - 1 && <span>{'/'}</span>}
          </>
        </li>
      ))}
    </ul>
  );
};
