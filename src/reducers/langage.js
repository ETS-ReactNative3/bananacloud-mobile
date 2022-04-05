import { CHANGE_LANGAGE, ERROR } from '@actions/langage'

const initialState = {
    currentLang: 'fr',
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGAGE:
            return {
                ...state,
                currentLang: action.payload.currentLang,
            }
        case ERROR:
            return {
                ...state,
            }
        default:
            return state
    }
}
