import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import EN from './en/en'
import FR from './fr/fr'

const resources = {
    EN,
    FR,
}

i18n.use(initReactI18next).init({
    resources,
    compatibilityJSON: 'v3',
    fallbackLng: 'FR',
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
})

export default i18n
