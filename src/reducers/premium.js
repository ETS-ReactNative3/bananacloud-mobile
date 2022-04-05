import { PREMIUM_SUCCESS, PREMIUM_FAILURE, FREE_SUCCESS, FREE_FAILURE } from '@actions/premium'

const initialState = {
    isPremium: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PREMIUM_SUCCESS:
            return {
                ...state,
                isPremium: action.payload.success,
            }
        case PREMIUM_FAILURE:
            return {
                ...state,
                isPremium: false,
            }
        case FREE_SUCCESS:
            return {
                ...state,
                isPremium: action.payload.success,
            }
        case FREE_FAILURE:
            return {
                ...state,
                isPremium: false,
            }
        default:
            return state
    }
}
