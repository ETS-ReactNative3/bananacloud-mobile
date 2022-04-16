import React, { useState, useEffect } from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'

import Card from '@components/Card'
import { StyledText } from '@components/styled-components'

const AlbumDetail = ({ route }) => {
    const { t } = useTranslation()

    const albumName = route.params.albumName

    const { width } = Dimensions.get('window')

    const [listPhotosAlbum, setListPhotosAlbum] = useState({})

    useEffect(() => {
        // hydrateListPhotosAlbum()
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
