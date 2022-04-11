import React, { useEffect } from 'react'
import { useColorScheme, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from 'styled-components'
import { useTranslation } from 'react-i18next'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { whichTheme } from '@utils/theme'

import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

import SelfcareStack from './SelfcareStack'
import Profile from '@screens/selfcare/Profile'
import Favorites from '@screens/selfcare/Favorites'
import Albums from '@screens/selfcare/Albums'
import Payment from '@screens/selfcare/Payment'
import Details from '@screens/selfcare/Details'

import { GoBack } from '@components/styled-components'

import i18n from '../translations/initTranslation'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const { t } = useTranslation()
    const isAuth = useSelector(state => state.user.isAuth)
    const currentLang = useSelector(state => state.langage.currentLang)
    const currentTheme = useSelector(state => state.theme.currentTheme)
    const colorScheme = useColorScheme()

    const theme = whichTheme(currentTheme, colorScheme)

    useEffect(() => {
        i18n.changeLanguage(currentLang)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer theme={theme}>
                <Stack.Navigator>
                    {isAuth ? (
                        <Stack.Group>
                            <Stack.Screen
                                name="Selfcare"
                                component={SelfcareStack}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name={'Profile'}
                                component={Profile}
                                options={({ navigation }) => ({
                                    headerStyle: {
                                        backgroundColor: theme.dark ? '#232428' : '#f5f6fa',
                                    },
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                    title: t('profile.title'),
                                })}
                            />
                            <Stack.Screen
                                name="Favorites"
                                component={Favorites}
                                options={({ navigation }) => ({
                                    headerStyle: {
                                        backgroundColor: theme.dark ? '#232428' : '#f5f6fa',
                                    },
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                    title: t('favorites.title'),
                                })}
                            />
                            <Stack.Screen
                                name="Albums"
                                component={Albums}
                                options={({ navigation }) => ({
                                    headerStyle: {
                                        backgroundColor: theme.dark ? '#232428' : 'white',
                                    },
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                    title: t('albums.title'),
                                })}
                            />
                            <Stack.Screen
                                name="Payment"
                                component={Payment}
                                options={({ navigation }) => ({
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                    title: t('payment.title'),
                                })}
                            />
                            <Stack.Screen
                                name="Details"
                                component={Details}
                                options={({ navigation }) => ({
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                    headerRight: () => (
                                        <TouchableOpacity onPress={() => console.log(photo)}>
                                            {true ? (
                                                <IonIcons name="heart" size={21} />
                                            ) : (
                                                <IonIcons name="heart-outline" size={21} />
                                            )}
                                        </TouchableOpacity>
                                    ),
                                    headerTransparent: true,
                                    title: '',
                                })}
                            />
                        </Stack.Group>
                    ) : (
                        <Stack.Group screenOptions={{ headerShown: false }}>
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options={{ headerShown: false }}
                            />
                        </Stack.Group>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default StackNavigator
