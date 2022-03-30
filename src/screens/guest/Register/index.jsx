import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import { register } from '@actions/auth'

import { Container, TextInput, Button } from '@components/styled-components'

import logo from '@root/assets/bananacloud.png'

const Index = ({ navigation }) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    return (
        <Container>
            <View
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={logo}
                    style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 20 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 20 }}>
                    S'enregistrer
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
                <TextInput
                    placeholder="********"
                    onChangeText={e => setUser({ ...user, confirmPassword: e })}
                    secureTextEntry
                    color="#dfe6e9"
                    icon="key-outline"
                />
                <Button
                    title="Valider"
                    onPress={() => dispatch(register(user))}
                    style={{ bgColor: '#00b894' }}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            textAlign: 'center',
                            marginTop: 20,
                        }}>
                        J'ai déjà un compte
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Index
