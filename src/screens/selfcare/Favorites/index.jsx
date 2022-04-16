import React from 'react'
import { Text } from 'react-native'

const Favorites = () => {
    return (
        <MainView>
            <Text>Favoris</Text>
        </MainView>
    )
}

const MainView = styled.View`
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
`

export default Favorites
