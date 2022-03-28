import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SelfcareStack from './SelfcareStack'

import { hydrateUser } from '@actions/auth'

import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const dispatch = useDispatch()
    dispatch(hydrateUser())

    const isAuth = useSelector(state => state.auth.isAuth)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuth ? (
                    <Stack.Group screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Selfcare" component={SelfcareStack} />
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
