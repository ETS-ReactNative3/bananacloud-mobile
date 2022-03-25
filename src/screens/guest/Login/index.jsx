import React, { useContext, useState } from 'react'

import AuthContext from '@configs/contexts/AuthContext'

import { Container, TextInput, Button } from '@components/styled-components'

const Index = () => {
    const { login } = useContext(AuthContext)

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
                onPress={() => {
                    login(user)
                }}
                style={{ bgColor: '#00b894' }}
            />
        </Container>
    )
}

export default Index
