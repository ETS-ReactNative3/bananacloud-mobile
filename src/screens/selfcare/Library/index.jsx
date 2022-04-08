import React from 'react'
import { View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Container, Button } from '@components/styled-components'

const Library = ({ navigation }) => {
    const { t } = useTranslation()

    return (
        <Container>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button
                    title={t('favorites.title')}
                    onPress={() => navigation.navigate('Favorites')}
                    icon="heart-outline"
                    style={{ flex: 1, marginRight: 5, bgColor: '#544747', color: '#f39c12' }}
                />
                <Button
                    title={t('albums.title')}
                    onPress={() => navigation.navigate('Albums')}
                    icon="albums-outline"
                    style={{ flex: 1, marginLeft: 5, bgColor: '#f2f2f2', color: '#f39c12' }}
                />
            </View>
        </Container>
    )
}

export default Library
