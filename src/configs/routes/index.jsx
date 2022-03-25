import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import AuthContext from '../contexts/AuthContext'

import SelfcareStack from './SelfcareStack'

import Login from '@screens/guest/Login'
import Register from '@screens/guest/Register'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
    const { isLoggedIn } = useContext(AuthContext)

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
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
