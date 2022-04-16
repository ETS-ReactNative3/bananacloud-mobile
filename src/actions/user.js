import AsyncStorage from '@react-native-async-storage/async-storage'
import { showMessage } from 'react-native-flash-message'
import jwtDecode from 'jwt-decode'

import api from '@utils/api'
import { getCreditCardToken, charges } from '@utils/Stripe'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const LOGOUT = 'LOGOUT'
export const DARK_THEME = 'DARK_THEME'
export const LIGHT_THEME = 'LIGHT_THEME'

export const PREMIUM_SUCCESS = 'PREMIUM_SUCCESS'
export const PREMIUM_FAILURE = 'PREMIUM_FAILURE'
export const FREE_SUCCESS = 'FREE_SUCCESS'
export const FREE_FAILURE = 'FREE_FAILURE'

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

export const bePremium = (CardInput, userId) => async dispatch => {
    try {
        if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
            alert('Invalid Credit Card')
            return false
        }

        const creditCardToken = await getCreditCardToken(CardInput)

        if (creditCardToken.error) {
            alert('creditCardToken error')
            return
        }

        const payment_data = await charges(creditCardToken.id)

        if (payment_data.status == 'succeeded') {
            dispatch({ type: PREMIUM_SUCCESS, payload: { success: true } })
            await api.post('update-user', { id: userId, isPremium: true })
            alert('Payment Successfully')
        } else {
            alert('Payment failed')
        }
    } catch (err) {
        showMessage({
            message: `error : ${err}`,
            type: 'warning',
        })
    }
}

export const beFree = () => async dispatch => {
    dispatch({ type: FREE_SUCCESS, payload: { success: false } })
}
