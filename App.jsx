import React from 'react'
import { useColorScheme, SafeAreaView } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { ThemeProvider } from 'styled-components'

import StackNavigator from '@configs/routes'
import { AuthContextProvider } from '@configs/contexts/AuthContext'
import { darkTheme, lightTheme } from '@configs/themes/Theme'

export default function App() {
    const isDarkMode = useColorScheme() === 'dark'

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <AuthContextProvider>
                <StackNavigator />
                <FlashMessage position="top" />
            </AuthContextProvider>
        </ThemeProvider>
    )
}
