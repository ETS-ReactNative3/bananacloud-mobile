import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    ActivityIndicator,
    TouchableOpacity,
    Modal,
    Text,
    FlatList,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { getAlbums } from '@utils/albums/getAlbums'
import { addPhotoToAlbum } from '@utils/albums/addPhotoToAlbum'

import { Button, Margin } from './styled-components'

const Card = ({ photo, isAlbum }) => {
    const navigation = useNavigation()
    const userId = useSelector(state => state.user.user._id)
    const favoritesList = true

    const [albumsList, setAlbumsList] = useState([])

    const hydrateAlbums = async () => {
        const list = await getAlbums(userId)
        setAlbumsList(list)
    }

    useEffect(() => {
        hydrateAlbums()
    }, [])

    const [isLoading, setIsLoading] = useState(true)
    const [visible, setIsVisible] = useState(false)

    const handleAddPhotoToAlbum = async albumName => {
        await addPhotoToAlbum(albumName, photo.item.relativePath, userId)
        setIsVisible(false)
    }

    return (
        <TouchableOpacity
            style={{ width: 150 }}
            onPress={() =>
                navigation.navigate('Details', {
                    photo,
                })
            }
        >
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
                    {isAlbum === 'true' ? (
                        <></>
                    ) : (
                        <>
                            <TouchableOpacity onPress={() => console.log(photo)}>
                                {favoritesList ? (
                                    <IonIcons name="heart" color="#f39c12" size={21} />
                                ) : (
                                    <IonIcons name="heart-outline" size={21} />
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsVisible(true)}>
                                <IonIcons name="folder" color="#f39c12" size={21} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>

            {isLoading && (
                <ActivityIndicator
                    size={32}
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                />
            )}

            <Modal visible={visible}>
                <Text>Placer l'image dans un album</Text>

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
            </Modal>
        </TouchableOpacity>
    )
}

export default Card
