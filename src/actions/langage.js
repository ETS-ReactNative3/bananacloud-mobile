import i18n from '@configs/translations/initTranslation'

export const CHANGE_LANGAGE = 'CHANGE_LANGAGE'
export const ERROR = 'ERROR'

export const changeLangage = lang => async dispatch => {
    let newLang = ''

    switch (lang) {
        case 'FR':
            newLang = 'FR'
            break
        case 'EN':
            newLang = 'EN'
            break
        default:
            return dispatch({
                type: ERROR,
                payload: { error: i18n.t('reduxMsg.cantChangLang') },
            })
    }

    await i18n.changeLanguage(newLang)

    return dispatch({ type: CHANGE_LANGAGE, payload: { currentLang: newLang } })
}
