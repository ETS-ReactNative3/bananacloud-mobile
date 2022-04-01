import React, { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from 'react-native-flash-message'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import admob, { MaxAdContentRating } from '@react-native-firebase/admob'

import Routes from '@configs/routes'
import { darkTheme, lightTheme } from '@configs/themes'
import { persistor, store } from '@configs/store'

import './src/configs/translations/initTranslation'

admob()
    .setRequestConfiguration({
        // Update all future requests suitable for parental guidance
        maxAdContentRating: MaxAdContentRating.PG,

        // Indicates that you want your content treated as child-directed for purposes of COPPA.
        tagForChildDirectedTreatment: true,

        // Indicates that you want the ad request to be handled in a
        // manner suitable for users under the age of consent.
        tagForUnderAgeOfConsent: true,
    })
    .then(() => {
        console.log('Configuration done !')
    })

export default function App() {
    const isDarkMode = useColorScheme() === 'dark'

    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                    <Routes />
                    <FlashMessage position="top" />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    )
}
