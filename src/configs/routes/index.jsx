import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'

import SelfcareStack from './SelfcareStack'

import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

import Profile from '@screens/selfcare/Profile'
import Favorites from '@screens/selfcare/Favorites'
import Albums from '@screens/selfcare/Albums'
import Paiement from '@screens/selfcare/Paiement'

import { GoBack } from '@components/styled-components'

import i18n from '../translations/initTranslation'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const { t } = useTranslation()
    const isAuth = useSelector(state => state.auth.isAuth)
    const currentLang = useSelector(state => state.langage.currentLang)

    useEffect(() => {
        i18n.changeLanguage(currentLang)
    }, [])

    return (
        <NavigationContainer>
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
                                headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
                                title: t('profile.title'),
                            })}
                        />
                        <Stack.Screen
                            name="Favorites"
                            component={Favorites}
                            options={({ navigation }) => ({
                                headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
                                title: t('favorites.title'),
                            })}
                        />
                        <Stack.Screen
                            name="Albums"
                            component={Albums}
                            options={({ navigation }) => ({
                                headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
                                title: t('albums.title'),
                            })}
                        />
                        <Stack.Screen
                            name="Paiement"
                            component={Paiement}
                            options={{ headerShown: false }}
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
    )
}

export default StackNavigator
