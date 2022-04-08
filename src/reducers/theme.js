import { LIGHT_THEME, DARK_THEME, SYSTEM_THEME } from '@actions/theme'

const initialState = {
    currentTheme: LIGHT_THEME,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LIGHT_THEME:
            return { ...state, currentTheme: action.payload.theme }
        case DARK_THEME:
            return { ...state, currentTheme: action.payload.theme }
        case SYSTEM_THEME:
            return { ...state, currentTheme: action.payload.theme }
        default:
            return state
    }
}
