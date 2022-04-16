import React, { useEffect, useState } from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { getDownloadablePath } from '@actions/favorite'

import { Margin, StyledText } from '@components/styled-components'
import Card from '@components/Card'

const Favorites = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const favlist = useSelector(state => state.favorite.favlist)
    const favlistDownloadable = useSelector(state => state.favorite.favlistDownloadable)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        dispatch(getDownloadablePath(favlist)).then(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <MainView>
            {isLoading ? (
                <ActivityIndicator size={32} />
            ) : favlistDownloadable.length > 0 ? (
                <Margin mt={15}>
                    <FlatList
                        data={favlistDownloadable}
                        numColumns={2}
                        renderItem={item => (
                            <CustomView>
                                <Card photo={item} />
                            </CustomView>
                        )}
                        keyExtractor={item => item.path}
                    />
                </Margin>
            ) : (
                <CenterView>
                    <StyledText center>{t('favorites.emptyPhotos')}</StyledText>
                </CenterView>
            )}
        </MainView>
    )
}

const MainView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`

const CenterView = styled.View`
    width: 100%;
    margin-top: 10px;
`

const CustomView = styled.View`
    width: 50%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`

export default Favorites
