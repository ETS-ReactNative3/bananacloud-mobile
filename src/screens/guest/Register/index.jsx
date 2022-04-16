import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, TouchableOpacity } from 'react-native'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
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

    const registerMe = async () => {
        await setIsLoading(true)
        await dispatch(register(user))
        await setIsLoading(false)
    }

    return (
        <MainView>
            <Padding pl={10} pr={10}>
                <CenterView>
                    <CustomImage source={logo} />
                    <TitleText>{t('register.title')}</TitleText>
                    <GoogleSigninButton
                        // Exception styled 🥲
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
                    <TextRed style={{ color: 'red' }}>{errorValue}</TextRed>
                    <Button
                        title={`${isLoading ? t('register.loading') : t('register.validate')}`}
                        disabled={isLoading}
                        onPress={registerMe}
                        style={{ bgColor: '#00b894' }}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <BackText>{t('register.goLogin')}</BackText>
                    </TouchableOpacity>
                </CenterView>
            </Padding>
        </MainView>
    )
}

const MainView = styled.SafeAreaView`
    background-color: #00dafe;
    height: 100%;
`

const CenterView = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`

const CustomImage = styled.Image`
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 20px;
`

const TitleText = styled.Text`
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 20px;
    color: #ffffff;
`

const TextRed = styled.Text`
    color: red;
`

const BackText = styled.Text`
    text-decoration: underline;
    text-align: center;
    margin-top: 20px;
    color: #ffffff;
`

export default Register
