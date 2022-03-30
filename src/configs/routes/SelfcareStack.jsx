import React from 'react'
import { View, Text, Button } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import IonIcons from 'react-native-vector-icons/Ionicons'
IonIcons.loadFont()

import Photos from '@screens/selfcare/Photos'
import Search from '@screens/selfcare/Search'
import Library from '@screens/selfcare/Library'
import { useSelector } from 'react-redux'

const Tab = createBottomTabNavigator()

const HeaderTitle = () => (
    <Text style={{ fontWeight: 'bold', fontSize: 21 }}>
        🍌 Banana<Text style={{ color: '#f39c12' }}>Cloud</Text>
    </Text>
)

const ProfileButton = ({ letter, navigation }) => {
    return (
        <View
            style={{
                position: 'relative',
                backgroundColor: 'black',
                marginEnd: 5,
                borderRadius: 99,
                width: 35,
                height: 35,
                paddingHorizontal: 3,
            }}>
            <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
                <Button
                    onPress={() => navigation.navigate('Profile')}
                    color="#fff"
                    title={letter}
                />
            </View>
        </View>
    )
}

const SelfcareStack = () => {
    const { email } = useSelector(state => state.auth.user)

    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerTitle: props => <HeaderTitle {...props} />,
                headerRight: () => <ProfileButton letter={email[0]} navigation={navigation} />,
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
