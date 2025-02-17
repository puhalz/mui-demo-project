import { IconButton } from '@mui/material'
import { Language } from '@mui/icons-material' // You can use this or any other flag-related icon
import { useTranslation } from 'react-i18next'

const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation()

    const handleLanguageChange = () => {
        // Toggle between languages (English and French in this example)
        const newLang = i18n.language === 'en' ? 'da' : 'en'
        i18n.changeLanguage(newLang)
    }

    return (
        <IconButton onClick={handleLanguageChange} color="inherit" aria-label="language-switcher" >
            <Language /> {/* Display a flag icon or a text icon */}
        </IconButton>
    )
}

export default LanguageSwitcher
