import React, { useEffect, useState } from 'react'
import { View, Image, Text } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Container, Button } from '@components/styled-components'
import storage from '@react-native-firebase/storage'

const Library = ({ navigation }) => {
    const { t } = useTranslation()

    const [image, setImage] = useState('')

    useEffect(() => {
        const getImages = async () => {
            const test = await storage()
                .ref('55C60149-091A-4E42-A397-04CDFDE2EA35.jpg')
                .getDownloadURL()
            setImage(test)
        }
        getImages()
    }, [])

    return (
        <Container>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <Button
                    title={t('favorites.title')}
                    onPress={() => navigation.navigate('Favorites')}
                    icon="heart-outline"
                    style={{ flex: 1, marginRight: 5, bgColor: '#f2f2f2', color: '#f39c12' }}
                />
                <Button
                    title={t('albums.title')}
                    onPress={() => navigation.navigate('Albums')}
                    icon="albums-outline"
                    style={{ flex: 1, marginLeft: 5, bgColor: '#f2f2f2', color: '#f39c12' }}
                />
                {image ? (
                    <Image source={{ uri: image }} style={{ width: '100%', height: 200 }} />
                ) : (
                    <Text>ok</Text>
                )}
            </View>
        </Container>
    )
}

export default Library
