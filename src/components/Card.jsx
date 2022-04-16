import React, { useState } from 'react'
import {
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Text,
    FlatList,
} from 'react-native'
import styled from 'styled-components'
import ImageView from 'react-native-image-view'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { addPhotoToAlbum } from '@utils/albums/addPhotoToAlbum'

import { Button, Margin, Container } from './styled-components'

const Card = ({ photo }) => {
    const { t } = useTranslation()
    const userId = useSelector(state => state.user.user._id)
    const albumsList = useSelector(state => state.album.albumsList)

    const favoritesList = false

    const [isImageViewVisible, setIsImageViewVisible] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    const [visible, setIsVisible] = useState(false)

    const handleAddPhotoToAlbum = async albumName => {
        await addPhotoToAlbum(albumName, photo.item.relativePath, userId)
        setIsVisible(false)
    }

    return (
        <>
            <TouchableOpacity style={{ width: 150 }} onPress={() => setIsImageViewVisible(true)}>
                <View style={{ position: 'relative' }}>
                    <Image
                        source={{ uri: photo?.item?.path }}
                        style={{ width: '100%', height: 150, borderRadius: 15 }}
                        onLoadEnd={() => setIsLoading(false)}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            borderRadius: 5,
                            padding: 5,
                        }}
                    >
                        <>
                            <TouchableOpacity onPress={() => console.log(photo)}>
                                {favoritesList ? (
                                    <IonIcons name="heart" color="#f39c12" size={21} />
                                ) : (
                                    <IonIcons name="heart-outline" color="#f39c12" size={21} />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsVisible(true)}>
                                <IonIcons name="folder" color="#f39c12" size={21} />
                            </TouchableOpacity>
                        </>
                    </View>
                </View>

                {isLoading && (
                    // Exception style 🥲
                    <ActivityIndicator
                        size={32}
                        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                    />
                )}

                <Modal visible={visible} onPress={() => setIsVisible(false)}>
                    <Container>
                        <SameLine>
                            <Text>{t('card.placePicture')}</Text>
                            <TouchableOpacity onPress={() => setIsVisible(false)}>
                                <IonIcons name="close" size={32} />
                            </TouchableOpacity>
                        </SameLine>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            legacyImplementation={false}
                            data={albumsList}
                            renderItem={({ item }) => (
                                <Margin mb={5} mt={5} ml={5} mr={5}>
                                    <Button
                                        title={item}
                                        onPress={() => handleAddPhotoToAlbum(item)}
                                        icon="folder"
                                        style={{ color: '#000000', bgColor: '#ffffff' }}
                                    ></Button>
                                </Margin>
                            )}
                            keyExtractor={item => item}
                        />
                    </Container>
                </Modal>
            </TouchableOpacity>
            <ImageView
                images={[{ source: { uri: photo?.item?.path } }]}
                imageIndex={0}
                isVisible={isImageViewVisible}
                onClose={() => setIsImageViewVisible(false)}
            />
        </>
    )
}

const SameLine = styled.View`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`

export default Card
