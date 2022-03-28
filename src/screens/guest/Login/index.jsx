import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '@actions/auth'

import { Container, TextInput, Button } from '@components/styled-components'

const Index = () => {
    const dispatch = useDispatch()

    const [user, setUser] = useState({
        username: '',
        password: '',
    })

    return (
        <Container>
            <TextInput
                placeholder="johndoe"
                onChangeText={e => setUser({ ...user, username: e })}
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
        </Container>
    )
}

export default Index
