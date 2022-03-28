import AsyncStorage from '@react-native-async-storage/async-storage'
// import jwtDecode from 'jwt-decode'
// Temp
import axios from 'axios'
import { TEST } from '@env'

import { getIsAuth } from '@utils/getIsAuth'
import { getToken } from '@utils/getToken'
import { getUser } from '@utils/getUser'

// import api from '@utils/api'

export const HYDRATE_USER = 'HYDRATE_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'

export const hydrateUser = () => async dispatch => {
    const isAuth = await getIsAuth()
    const token = await getToken()
    const user = await getUser()

    dispatch({ type: HYDRATE_USER, payload: { isAuth, token, user } })
}

export const login =
    ({ username, password }) =>
    async dispatch => {
        try {
            const { headers } = await axios.post(TEST, { username, password })
            const token = headers['x-access-token']
            // const user = jwtDecode(data.token)

            await AsyncStorage.setItem('token', token)
            // await AsyncStorage.setItem('user', user)

            dispatch({ type: LOGIN_SUCCESS, payload: { token } })
        } catch (err) {
            dispatch({ type: LOGIN_FAILURE, payload: err.message })
            console.log(err)
        }
    }

export const logout = () => async dispatch => {
    await AsyncStorage.removeItem('token')

    dispatch({ type: LOGOUT })
}
