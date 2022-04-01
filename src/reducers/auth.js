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
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: {},
                err: action.payload,
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
            }
        case REGISTER_FAILURE:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: {},
                err: action.payload,
            }
        case LOGOUT:
            return {
                ...state,
                isAuth: false,
                token: null,
                user: {},
            }
        default:
            return state
    }
}
