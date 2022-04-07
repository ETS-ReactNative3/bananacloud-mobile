import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import Routes from '@configs/routes'
import { persistor, store } from '@configs/store'

import './src/configs/translations/initTranslation'

export default function App() {
    useEffect(() => {
        SplashScreen.hide()
    }, [])

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Routes />
                <FlashMessage position="top" />
            </PersistGate>
        </Provider>
    )
}
