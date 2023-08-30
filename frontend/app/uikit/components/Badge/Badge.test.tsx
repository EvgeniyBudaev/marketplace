import { describe, it, expect } from 'vitest';
import { Badge } from './Badge';
import { render } from '@testing-library/react';

const mockText = 'Sample Content';

describe('Badge component', function () {
    it('renders the Badge component without crashing', () => {
        const children = <span>{mockText}</span>;

        const { getByTestId } = render(<Badge content="15">{children}</Badge>);

        const container = getByTestId('ui-kit-component__badge');
        const childElement = container.querySelector('span');
        expect(childElement).toBeInTheDocument();
        expect(childElement).toHaveTextContent('Sample Content');
    });

    it('displays the provided content in the badge', () => {
        const content = '15';
        const { getByTestId } = render(
            <Badge content={content}>
                <span>{mockText}</span>
            </Badge>,
        );

        const badgeContent = getByTestId('ui-kit-component__badge__content');
        console.log('[badgeContent] ', badgeContent);
        expect(badgeContent).toHaveTextContent(content);
    });
});
