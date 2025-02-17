// LanguageSwitcher.test.tsx
import { render, fireEvent, screen } from '@testing-library/react';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

// Mock the `useTranslation` hook from `react-i18next`
jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

describe('LanguageSwitcher', () => {
    let changeLanguageMock: jest.Mock;

    beforeEach(() => {
        changeLanguageMock = jest.fn();
        // Mock the return value of `useTranslation`
        (useTranslation as jest.Mock).mockReturnValue({
            i18n: {
                language: 'en', // Initial language set to 'en'
                changeLanguage: changeLanguageMock,
            },
        });
    });

    test('renders the language switcher icon button', () => {
        render(<LanguageSwitcher />);

        // Check if the LanguageSwitcher button is rendered by its aria-label
        const languageButton = screen.getByLabelText('language-switcher');
        expect(languageButton).toBeTruthy();
    });

    test('changes language when the button is clicked', () => {
        render(<LanguageSwitcher />);

        // Get the LanguageSwitcher button by its aria-label
        const languageButton = screen.getByLabelText('language-switcher');
        fireEvent.click(languageButton);

        // Ensure changeLanguage was called with the correct new language
        expect(changeLanguageMock).toHaveBeenCalledWith('da');
    });
});
