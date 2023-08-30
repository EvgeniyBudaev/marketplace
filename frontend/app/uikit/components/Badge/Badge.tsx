import * as React from 'react';
import { Typography } from '~/uikit';
import type { TBadgeProps } from './types';

const DATA_TEST_ID = 'ui-kit-component__badge';

export const Badge: React.FC<TBadgeProps> = ({ children, content }) => {
    return (
        <div data-testid={DATA_TEST_ID}>
            {children}

            <div>
                <Typography
                    color="inherit"
                    dataTestId={`${DATA_TEST_ID}__content`}
                >
                    {content}
                </Typography>
            </div>
        </div>
    );
};
