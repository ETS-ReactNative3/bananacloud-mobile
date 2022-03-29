import React from 'react'
import { Text, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IonIcons from 'react-native-vector-icons/Ionicons'
IonIcons.loadFont()

import Photos from '@screens/selfcare/Photos'
import Search from '@screens/selfcare/Search'
import Library from '@screens/selfcare/Library'

const Tab = createBottomTabNavigator()

const HeaderTitle = () => (
    <Text style={{ fontWeight: 'bold', fontSize: 21 }}>
        🍌 Banana<Text style={{ color: '#f39c12' }}>Cloud</Text>
    </Text>
)

const SelfcareStack = () => {
    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerTitle: props => <HeaderTitle {...props} />,
                headerRight: () => (
                    <Button
                        onPress={() => navigation.navigate('Profile')}
                        color="#000"
                        title="Profil"
                    />
                ),
            })}>
            <Tab.Screen
                name="Photos"
                component={Photos}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="images-outline" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="search-outline" color={color} size={size} />
                    ),
                    title: 'Rechercher',
                }}
            />
            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="library-outline" color={color} size={size} />
                    ),
                    title: 'Bibliothèque',
                }}
            />
        </Tab.Navigator>
    )
}

export default SelfcareStack
