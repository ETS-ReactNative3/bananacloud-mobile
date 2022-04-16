import React from 'react'
import { Text } from 'react-native'
import styled from 'styled-components'

const Favorites = () => {
    return (
        <MainView>
            <Text>Favoris</Text>
        </MainView>
    )
}

const MainView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Favorites
