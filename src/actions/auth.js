import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'

import api from '@utils/api'
import { getIsAuth } from '@utils/getIsAuth'
import { getToken } from '@utils/getToken'
import { getUser } from '@utils/getUser'

export const HYDRATE_USER = 'HYDRATE_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGOUT = 'LOGOUT'

export const hydrateUser = () => async dispatch => {
    const isAuth = await getIsAuth()
    const token = await getToken()
    const user = await getUser()

    dispatch({ type: HYDRATE_USER, payload: { isAuth, token, user } })
}

export const login =
    ({ email, password }) =>
    async dispatch => {
        try {
            const { data } = await api.post('auth/login', { email, password })
            const token = data.token
            const user = jwtDecode(token)

            await AsyncStorage.setItem('token', JSON.stringify(token))
            await AsyncStorage.setItem('user', JSON.stringify(user))

            dispatch({ type: LOGIN_SUCCESS, payload: { token, user } })
        } catch (err) {
            dispatch({ type: LOGIN_FAILURE, payload: err.message })
            console.log(err)
        }
    }

export const register =
    ({ email, password, confirmPassword }) =>
    async dispatch => {
        try {
            if (password !== confirmPassword) {
                dispatch({ type: REGISTER_FAILURE, payload: 'Mot de passe non identique' })
            }

            const { data } = await api.post('auth/register', { email, password })
            console.log(data)
            const token = data.token
            const user = jwtDecode(token)

            await AsyncStorage.setItem('token', JSON.stringify(token))
            await AsyncStorage.setItem('user', JSON.stringify(user))

            dispatch({ type: REGISTER_SUCCESS, payload: { token, user } })
        } catch (err) {
            dispatch({ type: REGISTER_FAILURE, payload: err.message })
            console.log('error : ', err)
        }
    }

export const logout = () => async dispatch => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')

    dispatch({ type: LOGOUT })
}
