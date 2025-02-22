import { IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Flag from 'react-world-flags'  // Import the flag component


const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation()

    const handleLanguageChange = () => {
        // Toggle between languages (English and French in this example)
        const newLang = i18n.language === 'en' ? 'da' : 'en'
        i18n.changeLanguage(newLang)
    }

    return (
        <IconButton onClick={handleLanguageChange} color="inherit" aria-label="language-switcher">
            {/* Use the react-world-flags component with dynamic flag code */}
            <Flag code={i18n.language === 'en' ? 'US' : 'DK'} style={{ width: 30, height: 20 }} />
        </IconButton>
    )
}

export default LanguageSwitcher
