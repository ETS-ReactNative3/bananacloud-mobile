import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { useDispatch } from 'react-redux'

import { login } from '@actions/auth'

import { Container, TextInput, Button } from '@components/styled-components'

const Index = ({ navigation }) => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        email: '',
        password: '',
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
                <Button
                    title="Connexion"
                    onPress={() => dispatch(login(user))}
                    style={{ bgColor: '#00b894' }}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text
                        style={{
                            textDecorationLine: 'underline',
                            textAlign: 'center',
                            marginTop: 20,
                        }}>
                        Je créé mon compte
                    </Text>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default Index
