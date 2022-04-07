import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, View, TouchableOpacity, Text, Image } from 'react-native'
import { InterstitialAd, TestIds } from '@react-native-firebase/admob'
import { useDispatch, useSelector } from 'react-redux'

import { login } from '@actions/user'

import { Padding, TextInput, Button } from '@components/styled-components'

import logo from '@root/assets/bananacloud.png'

const Login = ({ navigation }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const errorValue = useSelector(state => state.user.error)

    useEffect(() => {
        const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL)
        interstitial.load()
    }, [])

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const loginMe = async () => {
        await setIsLoading(true)
        await dispatch(login(user))
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={{ backgroundColor: '#00dafe', height: '100%' }}>
            <Padding pl={10} pr={10}>
                <View
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#00dafe',
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
                        {t('login.title')}
                    </Text>
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
                    <Text style={{ color: 'red' }}>{errorValue}</Text>
                    <Button
                        title={`${isLoading ? t('login.loading') : t('login.validate')}`}
                        disabled={isLoading}
                        onPress={loginMe}
                        style={{ bgColor: '#00b894' }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                textAlign: 'center',
                                marginTop: 20,
                                color: '#ffffff',
                            }}
                        >
                            {t('login.goRegister')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Padding>
        </SafeAreaView>
    )
}

export default Login
