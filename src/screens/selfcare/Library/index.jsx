import React from 'react'
import { View } from 'react-native'

import { Container, Button } from '@components/styled-components'

const Index = ({ navigation }) => {
    return (
        <Container>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Button
                    title="Favoris"
                    onPress={() => navigation.navigate('Favorites')}
                    icon="heart-outline"
                    style={{ flex: 1, marginRight: 5, bgColor: '#f2f2f2', color: '#f39c12' }}
                />
                <Button
                    title="Albums"
                    onPress={() => navigation.navigate('Albums')}
                    icon="albums-outline"
                    style={{ flex: 1, marginLeft: 5, bgColor: '#f2f2f2', color: '#f39c12' }}
                />
            </View>
        </Container>
    )
}

export default Index
