import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IonIcons from 'react-native-vector-icons/Ionicons'
IonIcons.loadFont()

import Home from '@screens/selfcare/Home'
import Settings from '@screens/selfcare/Settings'

const Tab = createBottomTabNavigator()

const SelfcareStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="home-outline" color={color} size={size} />
                    ),
                    headerTitle: 'Banana Cloud',
                    tabBarLabel: 'Accueil',
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="settings-outline" color={color} size={size} />
                    ),
                    title: 'Réglages',
                }}
            />
        </Tab.Navigator>
    )
}

export default SelfcareStack
