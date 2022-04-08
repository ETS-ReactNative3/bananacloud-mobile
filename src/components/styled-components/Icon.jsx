import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Color from '@components/styled-components/Color'
import Photos from '@screens/selfcare/Photos'
import IonIcons from 'react-native-vector-icons/Ionicons'

const Icon = props => {
    IonIcons.loadFont()

    const Tab = createBottomTabNavigator()
    return (
        // <Tab.Screen
        //     name="Photos"
        //     component={Photos}
        //     options={{
        //         tabBarIcon: ({ color, size }) => (
        //             <IonIcons name="images-outline" color={Color.Color.DEFAULT} size={size} />
        //         ),
        //     }}
        // />

        <Tab.Screen
            name={props.name}
            component={props.component}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <IonIcons name={props.nameIcon} color={Color.Color.DEFAULT} size={size} />
                ),
            }}
        />
    )
}

export default Icon
