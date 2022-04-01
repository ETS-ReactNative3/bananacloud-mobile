import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en/en'
import fr from './fr/fr'

// const ressources = {
//     en: {
//         translation: {
//             login: {
//                 title: 'Sign in',
//             },
//         },
//     },
//     fr: {
//         translation: {
//             login: {
//                 title: 'Se connecter',
//             },
//         },
//     },
// }

const resources = {
    en,
    fr,
}

i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
})

export default i18n
