import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Container, Button } from '@components/styled-components'

const Library = ({ navigation }) => {
    const { t } = useTranslation()

    return (
        <Container>
            <MainView>
                <Button
                    title={t('favorites.title')}
                    onPress={() => navigation.navigate('Favorites')}
                    icon="heart-outline"
                />
                <Button
                    title={t('albums.title')}
                    onPress={() => navigation.navigate('Albums')}
                    icon="albums-outline"
                />
            </MainView>
        </Container>
    )
}

const MainView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export default Library
