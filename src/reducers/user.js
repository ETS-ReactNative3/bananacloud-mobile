import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    PREMIUM_SUCCESS,
    PREMIUM_FAILURE,
    FREE_SUCCESS,
    FREE_FAILURE,
} from '@actions/user'

const initialState = {
    isAuth: false,
    token: null,
    user: {},
    isPremium: false,
    error: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
                isPremium: action.payload.user.isPremium,
                error: '',
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: {},
                error: action.payload.error,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
                isPremium: action.payload.user.isPremium,
                error: '',
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: {},
                error: action.payload.error,
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: {},
                error: '',
            }
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
