import { render, screen } from '@testing-library/react';
import HomePage from './Home';  // Adjust the import if necessary
import { useTranslation } from 'react-i18next';

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('HomePage', () => {
    it('should render welcome message', () => {
        // Set up the mock translation function
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => {
                if (key === 'welcome') {
                    return 'Welcome';
                }
                return key;
            },
        });

        render(<HomePage />);

        // Check if the translated text is rendered in the component
        // @ts-ignore
        expect(screen.getByText('Welcome')).toBeTruthy();
    });
});
