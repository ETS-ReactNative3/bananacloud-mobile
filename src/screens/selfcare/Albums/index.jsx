import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import AntDesign from 'react-native-vector-icons/AntDesign'
AntDesign.loadFont()

import { createAlbum, hydrateAlbums } from '@actions/album'

import { Button, TextInput, Container, StyledText } from '@components/styled-components'
import Modal from '@components/Modal'
import FolderItem from '@components/FolderItem'

const Albums = ({ navigation }) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.user._id)
    const albumsList = useSelector(state => state.album.albumsList)

    const [isLoading, setIsLoading] = useState(true)
    const [visible, setIsVisible] = useState(false)
    const [name, setName] = useState('')

    const handleCreateFolder = () => {
        dispatch(createAlbum(userId, name))
        setName('')
        setIsVisible(false)
    }

    useEffect(() => {
        dispatch(hydrateAlbums(userId))
        setIsLoading(false)
    }, [])

    return (
        <Container>
            <MainView>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <AntDesign name="addfolder" size={35} color="red" />
                </TouchableOpacity>

                {isLoading ? (
                    <ActivityIndicator />
                ) : albumsList.length > 0 ? (
                    <FlatList
                        data={albumsList}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <FolderItem albumName={item} navigation={navigation} />
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View>
                        <StyledText>{t('albums.emptyAlbum')}</StyledText>
                    </View>
                )}

                <Modal visible={visible} onPress={() => setIsVisible(false)}>
                    <TextInput
                        placeholder="Paris"
                        value={name}
                        onChangeText={e => setName(e)}
                        color="#dfe6e9"
                    />
                    <Button title={t('login.validate')} onPress={handleCreateFolder} />
                </Modal>
            </MainView>
        </Container>
    )
}

const MainView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Albums
