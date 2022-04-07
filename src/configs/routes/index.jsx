import React from 'react'
import { useSelector } from 'react-redux'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { darkTheme, lightTheme } from '@components/styled-components/Color'

import SelfcareStack from './SelfcareStack'
import {
    Provider as PaperProvider,
    DarkTheme as PaperDarkTheme,
    DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper'
import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

import Profile from '@screens/selfcare/Profile'
import Favorites from '@screens/selfcare/Favorites'
import Albums from '@screens/selfcare/Albums'
import { GoBack } from '@components/styled-components'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const themeDark = useSelector(state => state.theme)

    return (
        <NavigationContainer theme={themeDark.theme ? DarkTheme : DefaultTheme}>
            <PaperProvider theme={themeDark.theme ? PaperDarkTheme : PaperDefaultTheme}>
                <Stack.Navigator>
                    {isAuth ? (
                        <Stack.Group>
                            <Stack.Screen
                                name="Selfcare"
                                component={SelfcareStack}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="Profile"
                                component={Profile}
                                options={({ navigation }) => ({
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                })}
                            />
                            <Stack.Screen
                                name="Favorites"
                                component={Favorites}
                                options={({ navigation }) => ({
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
                                })}
                            />
                            <Stack.Screen
                                name="Albums"
                                component={Albums}
                                options={({ navigation }) => ({
                                    headerLeft: () => (
                                        <GoBack onPress={() => navigation.goBack()} />
                                    ),
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
            </PaperProvider>
        </NavigationContainer>
    )
}

export default StackNavigator
