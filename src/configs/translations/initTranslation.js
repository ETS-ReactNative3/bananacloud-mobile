import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en/en'
import fr from './fr/fr'

const resources = {
    en,
    fr,
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
})

export default i18n
