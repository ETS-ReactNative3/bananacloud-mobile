import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView, View, Text, TouchableOpacity, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'

import { register } from '@actions/user'

import { onGoogleButtonPress } from '@utils/onGoogleButtonPress'

import { Padding, TextInput, Button } from '@components/styled-components'

import logo from '@root/assets/bananacloud.png'

const Register = ({ navigation }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const errorValue = useSelector(state => state.user.error)

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    useEffect(() => {
        // const initGoogleConfig = async () => {
        //     await GoogleSignin.configure({
        //         iosClientId:
        //             '195454906388-e11t77vv3f4rnk2jmma29hmfbvp4c8eu.apps.googleusercontent.com',
        //         webClientId:
        //             '195454906388-7bd59hug9reesa0ihtkgkb700l0usl67.apps.googleusercontent.com',
        //         offlineAccess: false,
        //     })
        // }
        // initGoogleConfig()
    }, [])

    const registerMe = async () => {
        await setIsLoading(true)
        await dispatch(register(user))
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#00dafe', height: '100%' }}>
            <Padding pl={10} pr={10}>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Image
                        source={logo}
                        style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 20 }}
                    />
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 32,
                            marginBottom: 20,
                            color: '#ffffff',
                        }}
                    >
                        {t('register.title')}
                    </Text>
                    <GoogleSigninButton
                        style={{ width: '100%', height: 50 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={() => onGoogleButtonPress()}
                        disabled={false}
                    />
                    <TextInput
                        placeholder="john.doe@bananacloud.com"
                        onChangeText={e => setUser({ ...user, email: e })}
                        color="#dfe6e9"
                        icon="person-outline"
                    />
                    <TextInput
                        placeholder="********"
                        onChangeText={e => setUser({ ...user, password: e })}
                        secureTextEntry
                        color="#dfe6e9"
                        icon="key-outline"
                    />
                    <TextInput
                        placeholder="********"
                        onChangeText={e => setUser({ ...user, confirmPassword: e })}
                        secureTextEntry
                        color="#dfe6e9"
                        icon="key-outline"
                    />
                    <Text style={{ color: 'red' }}>{errorValue}</Text>
                    <Button
                        title={`${isLoading ? t('register.loading') : t('register.validate')}`}
                        disabled={isLoading}
                        onPress={registerMe}
                        style={{ bgColor: '#00b894' }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textAlign: 'center',
                                marginTop: 20,
                                color: '#ffffff',
                            }}
                        >
                            {t('register.goLogin')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Padding>
        </SafeAreaView>
    )
}

export default Register
