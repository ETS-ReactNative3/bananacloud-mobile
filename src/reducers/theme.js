import { DARK_THEME, LIGHT_THEME } from '../actions/theme'

const initialState = {
    theme: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DARK_THEME:
            return { ...state, theme: true }
        case LIGHT_THEME:
            return { ...state, theme: false }
        default:
            return state
    }
}
