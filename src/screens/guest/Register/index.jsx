import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'

import { register } from '@actions/auth'

import { Container, TextInput, Button } from '@components/styled-components'

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
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
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
                    title="S'enregistrer"
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
