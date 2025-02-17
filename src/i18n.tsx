import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

// Initialize i18next
i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en', // Fallback to English if a translation is not found
        debug: true, // Enable debugging
        interpolation: {
            escapeValue: false, // React already does escaping
        },
        resources: {
            en: {
                translation: {
                    welcome: 'Welcome',
                    dashboard: 'Dashboard',
                    users: 'Users',
                    description: 'This is a sample application with i18next!',
                    greeting: 'Hello',
                    button: 'Change Language',
                    headers: {
                        name: 'Name',
                        role: 'Department',
                        localnr: 'Localnr',
                        landline: 'Landline no.',
                        mobile: 'Mobiles',
                    },
                    create_user: 'Create User',
                },
            },
            da: {
                translation: {
                    welcome: 'Velkommen',
                    dashboard: 'Dashboard',
                    users: 'Brugere',
                    description: 'Dette er en eksempelapplikation med i18next!',
                    greeting: 'Hej',
                    button: 'Skift Sprog',
                    headers: {
                        name: 'Navn',
                        role: 'Afdeling',
                        localnr: 'Lokalt nr.',
                        landline: 'Fastnettelefon',
                        mobile: 'Mobiltelefon',
                    },
                    create_user: 'Opret Bruger',
                },
            },
        },
    })

export default i18next
