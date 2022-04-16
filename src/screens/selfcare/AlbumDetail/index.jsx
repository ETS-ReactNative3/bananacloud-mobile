import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { getPhotosAlbum } from '@actions/album'

import Card from '@components/Card'
import { StyledText, Margin } from '@components/styled-components'

const AlbumDetail = ({ route }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.user._id)
    const photosList = useSelector(state => state.album.photosList)

    const albumName = route.params.albumName

    useEffect(() => {
        dispatch(getPhotosAlbum(userId, albumName))
    }, [])

    return (
        <Margin mt={15}>
            {photosList[0]?.path ? (
                <FlatList
                    data={photosList}
                    numColumns={2}
                    renderItem={item => (
                        <CustomView>
                            <Card isAlbum="true" photo={item} />
                        </CustomView>
                    )}
                    keyExtractor={item => item}
                />
            ) : (
                <View>
                    <StyledText center>{t('albumDetail.noPhoto')}</StyledText>
                </View>
            )}
        </Margin>
    )
}

const CustomView = styled.View`
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export default AlbumDetail
