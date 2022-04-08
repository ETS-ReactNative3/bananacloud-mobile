export const LIGHT_THEME = 'LIGHT_THEME'
export const DARK_THEME = 'DARK_THEME'
export const SYSTEM_THEME = 'SYSTEM_THEME'

export const chooseTheme = theme => dispatch => {
    if (theme === LIGHT_THEME) {
        dispatch({ type: LIGHT_THEME, payload: { theme } })
    } else if (theme === DARK_THEME) {
        dispatch({ type: DARK_THEME, payload: { theme } })
    } else if (theme === SYSTEM_THEME) {
        dispatch({ type: SYSTEM_THEME, payload: { theme } })
    }
}
