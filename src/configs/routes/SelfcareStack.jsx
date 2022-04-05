import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
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

const ProfileButton = ({ letter, navigation }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: 'black',
                margin: 10,
                width: 40,
                height: 40,
                borderRadius: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Profile')}>
            <Text style={{ color: 'white', fontSize: 20 }}>{letter}</Text>
        </TouchableOpacity>
    )
}

const SelfcareStack = () => {
    const { t } = useTranslation()
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
                    title: t('photos.title'),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="search-outline" color={color} size={size} />
                    ),
                    title: t('search.title'),
                }}
            />
            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <IonIcons name="library-outline" color={color} size={size} />
                    ),
                    title: t('library.title'),
                }}
            />
        </Tab.Navigator>
    )
}

export default SelfcareStack
