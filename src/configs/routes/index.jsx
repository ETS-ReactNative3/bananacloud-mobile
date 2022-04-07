import React from 'react'
import { useColorScheme } from 'react-native'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ThemeProvider } from 'styled-components'

import { whichTheme } from '@utils/theme'

import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

import SelfcareStack from './SelfcareStack'
import Profile from '@screens/selfcare/Profile'
import Favorites from '@screens/selfcare/Favorites'
import Albums from '@screens/selfcare/Albums'

import { GoBack } from '@components/styled-components'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const currentTheme = useSelector(state => state.theme.currentTheme)

    const colorScheme = useColorScheme()

    const theme = whichTheme(currentTheme, colorScheme)

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
            </NavigationContainer>
        </ThemeProvider>
    )
}

export default StackNavigator
