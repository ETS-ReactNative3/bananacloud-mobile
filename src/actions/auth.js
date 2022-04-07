import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import jwtDecode from 'jwt-decode'

import api from '@utils/api'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGOUT = 'LOGOUT'

export const login =
    ({ email, password }) =>
    async dispatch => {
        try {
            const { data } = await api.post('auth/login', { email, password })
            const token = data.token
            const { user } = jwtDecode(token)

            await AsyncStorage.setItem('token', JSON.stringify(token))
            await AsyncStorage.setItem('user', JSON.stringify(user))
            

            showMessage({
                message: `Bienvenu, ${user.email}`,
                type: 'success',
            })

            dispatch({ type: LOGIN_SUCCESS, payload: { token, user } })
        } catch (err) {
            dispatch({ type: LOGIN_FAILURE, payload: { error: err.message } })
        }
    }

export const register =
    ({ email, password, confirmPassword }) =>
    async dispatch => {
        try {
            if (password !== confirmPassword) {
                return dispatch({
                    type: REGISTER_FAILURE,
                    payload: { error: 'Mot de passe non identique' },
                })
            }

            const { data } = await api.post('auth/register', { email, password })
            const token = data.token
            const { user } = jwtDecode(token)

            await AsyncStorage.setItem('token', JSON.stringify(token))
            await AsyncStorage.setItem('user', JSON.stringify(user))

            showMessage({
                message: `Bienvenu, ${user.email}`,
                type: 'success',
            })

            dispatch({ type: REGISTER_SUCCESS, payload: { token, user } })
        } catch (err) {
            dispatch({ type: REGISTER_FAILURE, payload: { error: err.message } })
        }
    }

export const logout = () => async dispatch => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('user')

    showMessage({
        message: 'Vous avez été correctement déconnecté',
        type: 'success',
    })

    dispatch({ type: LOGOUT })
}
