import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { login } from '@actions/user'

import { Padding, TextInput } from '@components/styled-components'

import logo from '@root/assets/bananacloud.png'

const Login = ({ navigation }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const errorValue = useSelector(state => state.user.error)

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
        <MySafeAreaView>
            <Padding pl={10} pr={10}>
                <MyView>
                    <Image
                        source={logo}
                        style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 20 }}
                    />

                    <Title>{t('login.title')}</Title>

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

                    <MyText weight="bold" decoration="none" align="center" top="0px" color="red">
                        {errorValue}
                    </MyText>

                    <BtnSubmit
                        disabled={isLoading}
                        onPress={loginMe}
                        style={{ bgColor: '#00b894' }}
                    >
                        <MyText decoration="none" align="center" top="0px" color="black">{`${
                            isLoading ? t('login.loading') : t('login.validate')
                        }`}</MyText>
                    </BtnSubmit>

                    <Register onPress={() => navigation.navigate('Register')}>
                        <MyText decoration="underline" align="center" top="5%" color="#ffffff">
                            {t('login.goRegister')}
                        </MyText>
                    </Register>
                </MyView>
            </Padding>
        </MySafeAreaView>
    )
}

const MySafeAreaView = styled.SafeAreaView`
    background-color: #00dafe;
    height: 100%;
`
const MyView = styled.View`
    display: flex;
    align-items: center;
`
const BtnSubmit = styled.TouchableOpacity`
    background-color: #00b894;
    padding: 5%;
    border-radius: 10px;
`
const Register = styled.TouchableOpacity``

const MyText = styled.Text`
    text-decoration: ${props => props.decoration};
    text-align: ${props => props.align};
    margin-top: ${props => props.top};
    color: ${props => props.color};
`
const Title = styled.Text`
    font-size: 30px;
    color: #ffff;
    font-weight: bold;
    margin-bottom: 5%;
`
export default Login
