import { render, screen } from '@testing-library/react';
import HomePage from './Home';  // Adjust the import if necessary
import { useTranslation } from 'react-i18next';
import UserPage from './Users'

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('UserPage', () => {
    it('should render welcome message', () => {
        // Set up the mock translation function
        (useTranslation as jest.Mock).mockReturnValue({
            t: (key: string) => {
                if (key === 'users') {
                    return 'Users';
                }
                return key;
            },
        });

        render(<UserPage />);

        expect(screen.getByText('Columns')).toBeTruthy();
    });
});
