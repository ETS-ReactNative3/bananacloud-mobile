import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SelfcareStack from './SelfcareStack'

import { hydrateUser } from '@actions/auth'

import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

import Profile from '@screens/selfcare/Profile'
import Favorites from '@screens/selfcare/Favorites'
import Albums from '@screens/selfcare/Albums'

import { GoBack } from '@components/styled-components'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const dispatch = useDispatch()
    dispatch(hydrateUser())

    const isAuth = useSelector(state => state.auth.isAuth)

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
                            name="Profile"
                            component={Profile}
                            options={({ navigation }) => ({
                                headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
                            })}
                        />
                        <Stack.Screen
                            name="Favorites"
                            component={Favorites}
                            options={({ navigation }) => ({
                                headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
                            })}
                        />
                        <Stack.Screen
                            name="Albums"
                            component={Albums}
                            options={({ navigation }) => ({
                                headerLeft: () => <GoBack onPress={() => navigation.goBack()} />,
                            })}
                        />
                    </Stack.Group>
                ) : (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="Login"
                            component={Login}
                            options={{ headerShown: false, animationTypeForReplace: 'push' }}
                        />
                        <Stack.Screen name="Register" component={Register} />
                    </Stack.Group>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator
