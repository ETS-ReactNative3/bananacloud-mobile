import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from 'react-native-flash-message'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'

import StackNavigator from '@configs/routes'
import { darkTheme, lightTheme } from '@configs/themes/Theme'
import { store } from '@configs/store'

export default function App() {
    const isDarkMode = useColorScheme() === 'dark'

    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider store={store}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                <StackNavigator />
                <FlashMessage position="top" />
            </ThemeProvider>
        </Provider>
    )
}
