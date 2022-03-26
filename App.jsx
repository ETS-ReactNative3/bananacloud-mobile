import React from 'react'
import { useColorScheme } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import StackNavigator from '@configs/routes'
import { AuthContextProvider } from '@configs/contexts/AuthContext'
import { darkTheme, lightTheme } from '@configs/themes/Theme'
import { store } from '@configs/store'

export default function App() {
    const isDarkMode = useColorScheme() === 'dark'

    return (
        <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <AuthContextProvider>
                    <StackNavigator />
                    <FlashMessage position="top" />
                </AuthContextProvider>
            </ThemeProvider>
        </Provider>
    )
}
