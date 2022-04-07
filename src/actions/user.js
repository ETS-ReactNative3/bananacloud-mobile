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

export const bePremium = () => async dispatch => {
    const data = await AsyncStorage.getItem('user')
    const user = JSON.parse(data)

    try {
        if (CardInput.valid == false || typeof CardInput.valid == 'undefined') {
            alert('Invalid Credit Card')
            return false
        }

        creditCardToken = await getCreditCardToken(CardInput)

        if (creditCardToken.error) {
            alert('creditCardToken error')
            return
        }

        const payment_data = await charges()
        if (payment_data.status == 'succeeded') {
            dispatch(bePremium())
            alert('Payment Successfully, The player has been added to your player list')
        } else {
            alert('Payment failed')
        }

        const { data } = await api.post('update-user', { id: user._id, isPremium: true })
        console.log('SUCCESS')
    } catch (err) {
        console.log(err)
    }

    /*dispatch({ type: PREMIUM_SUCCESS, payload: { success: true } })*/
}

export const beFree = () => async dispatch => {
    dispatch({ type: FREE_SUCCESS, payload: { success: false } })
}
