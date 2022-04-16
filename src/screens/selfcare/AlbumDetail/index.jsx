import React, { useState, useEffect } from 'react'
import { View, FlatList, Dimensions } from 'react-native'

import { getPhotoAlbum } from '@utils/albums/getPhotoAlbum'

import Card from '@components/Card'
import { StyledText } from 'src/components/styled-components'
import { t } from 'i18next'

const AlbumDetail = ({ route }) => {
    const albumName = route.params.paramNameAlbum

    const { width } = Dimensions.get('window')

    const [listPhotosAlbum, setListPhotosAlbum] = useState({})

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
                <View>
                    <StyledText>{t('albumDetail.noPhoto')}</StyledText>
                </View>
            )}
        </View>
    )
}

export default AlbumDetail
