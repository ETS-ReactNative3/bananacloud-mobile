import React from 'react'
import { View, Text } from 'react-native'
import { useDispatch } from 'react-redux'

import { logout } from '@actions/auth'

import { Button } from '@components/styled-components'

const Index = () => {
    const dispatch = useDispatch()

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Hello Banana Cloud</Text>
            <Text>Settings</Text>
            <Button title="Deconnexion" icon="log-out-outline" onPress={() => dispatch(logout())} />
        </View>
    )
}

export default Index
