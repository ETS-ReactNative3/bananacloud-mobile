import React from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useTranslation } from 'react-i18next'
import IonIcons from 'react-native-vector-icons/Ionicons'
IonIcons.loadFont()

import Photos from '@screens/selfcare/Photos'
import Search from '@screens/selfcare/Search'
import Library from '@screens/selfcare/Library'
import { StyledText } from '@components/styled-components'

const Tab = createBottomTabNavigator()

const HeaderTitle = () => (
    <StyledText bold title color="#f39c12">
        🍌 Banana
        <StyledText bold title>
            Cloud
        </StyledText>
    </StyledText>
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
            onPress={() => navigation.navigate('Profile')}
        >
            <Text style={{ color: 'white', fontSize: 20 }}>{letter}</Text>
        </TouchableOpacity>
    )
}

const SelfcareStack = () => {
    const { t } = useTranslation()
    const { email } = useSelector(state => state.user.user)

    return (
        <Tab.Navigator
            screenOptions={({ navigation }) => ({
                headerTitle: props => <HeaderTitle {...props} />,
                headerRight: () => <ProfileButton letter={email[0]} navigation={navigation} />,
                tabBarActiveTintColor: '#f39c12',
            })}
        >
            <Tab.Screen
                name={'Photos'}
                component={Photos}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <IonIcons name="images-outline" color={color} size={size} />
                    ),
                    title: t('photos.title'),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <IonIcons name="search-outline" color={color} size={size} />
                    ),
                    title: t('search.title'),
                }}
            />
            <Tab.Screen
                name="Library"
                component={Library}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <IonIcons name="library-outline" color={color} size={size} />
                    ),
                    title: t('library.title'),
                }}
            />
        </Tab.Navigator>
    )
}

export default SelfcareStack
