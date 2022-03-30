import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { useDispatch } from 'react-redux'

import { login } from '@actions/auth'

import { Container, TextInput, Button } from '@components/styled-components'

import logo from '@root/assets/bananacloud.png'

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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Image
                    source={logo}
                    style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 20 }}
                />
                <Text style={{ fontWeight: 'bold', fontSize: 32, marginBottom: 20 }}>
                    Se connecter
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
                <Button
                    title="Valider"
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
