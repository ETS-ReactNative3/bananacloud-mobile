import React from 'react'
import { View, Text } from 'react-native'
import Color from '@components/styled-components/Color'
import styled from 'styled-components'

const Index = () => {
    console.log(Color.Color.DEFAULT)
    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TextColor>Rechercher</TextColor>
        </View>
    )
}

const TextColor = styled.Text`
    color: ${Color.Color.DEFAULT};
`

export default Index
