import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Dimensions } from 'react-native'

import { getPhotoAlbum } from '@utils/albums/getPhotoAlbum'

import Card from '@components/Card'

const PhotoAlbum = ({ route }) => {
    const { width } = Dimensions.get('window')
    const albumName = route.params.paramNameAlbum
    const [listPhotosAlbum, setListPhotosAlbum] = useState()
    const hydrateListPhotosAlbum = async () => {
        const list = await getPhotoAlbum(albumName)
        setListPhotosAlbum(list)
    }

    useEffect(() => {
        hydrateListPhotosAlbum()
    }, [])

    return (
        <View>
            {listPhotosAlbum ? (
                <FlatList
                    data={listPhotosAlbum}
                    numColumns={2}
                    renderItem={item => (
                        <View
                            style={{
                                width: width / 2,
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}
                        >
                            <Card isAlbum="true" photo={item} />
                        </View>
                    )}
                    keyExtractor={item => item}
                />
            ) : (
                <View></View>
            )}
        </View>
    )
}

export default PhotoAlbum
