import { HYDRATE_USER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '@actions/auth'

const initialState = {
    isAuth: false,
    token: null,
    user: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case HYDRATE_USER:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                token: action.payload.token,
                user: action.payload.user,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: { test: 'okok' },
            }
        case LOGIN_FAILURE:
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
