import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
} from '@actions/auth'

const initialState = {
    isAuth: false,
    token: null,
    user: {},
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
        default:
            return state
    }
}
