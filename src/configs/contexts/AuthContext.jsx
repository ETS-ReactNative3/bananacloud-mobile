import axios from 'axios'
import React, { useState, createContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { TEST } from '@env'

const AuthContext = createContext({
    login: () => {},
    logout: () => {},
    isLoggedIn: null,
    setIsLoggedIn: () => {},
})

export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(() => {
        const hydrateToken = async () => {
            const token = await AsyncStorage.getItem('token')
            token && setIsLoggedIn(token)
        }

        hydrateToken()
    }, [])

    const login = async ({ username, password }) => {
        const query = await axios.post(TEST, {
            username,
            password,
        })

        if (query.headers['x-access-token']) {
            await AsyncStorage.setItem('token', query.headers['x-access-token'])
            await setIsLoggedIn(true)
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('token')
        await setIsLoggedIn(false)
    }

    const context = {
        isLoggedIn,
        setIsLoggedIn,
        login,
        logout,
    }
    return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
