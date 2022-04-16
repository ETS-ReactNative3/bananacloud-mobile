import React, { useEffect } from 'react'
import { View, FlatList, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { getPhotosAlbum } from '@actions/album'

import Card from '@components/Card'
import { StyledText, Margin } from '@components/styled-components'

const AlbumDetail = ({ route }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.user._id)
    const photosList = useSelector(state => state.album.photosList)

    const albumName = route.params.albumName

    const { width } = Dimensions.get('window')

    useEffect(() => {
        dispatch(getPhotosAlbum(userId, albumName))
    }, [])

    return (
        <Margin mt={15}>
            {photosList ? (
                <FlatList
                    data={photosList}
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
        </Margin>
    )
}

export default AlbumDetail
