import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AntDesign from 'react-native-vector-icons/AntDesign'
AntDesign.loadFont()

import { Button, TextInput, Container, StyledText } from '@components/styled-components'
import Modal from '@components/Modal'
import FolderItem from '@components/FolderItem'

const Albums = ({ navigation }) => {
    const userId = useSelector(state => state.user.user._id)

    const [visible, setIsVisible] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        hydrateAlbums(userId)
    }, [])

    return (
        <Container>
            <MainView>
                <TouchableOpacity onPress={() => setIsVisible(true)}>
                    <AntDesign name="addfolder" size={35} color="red" />
                </TouchableOpacity>

                {albumsList.length > 0 ? (
                    <FlatList
                        data={albumsList}
                        numColumns={3}
                        renderItem={({ item }) => (
                            <FolderItem folder={item} navigation={navigation} />
                        )}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <View>
                        <StyledText>Pas d'albums</StyledText>
                    </View>
                )}

                <Modal visible={visible} onPress={() => setIsVisible(false)}>
                    <TextInput
                        placeholder="Nom dossier"
                        value={name}
                        onChangeText={e => setName(e)}
                        color="#dfe6e9"
                    />
                    <Button title="Valider" onPress={createFolder} />
                </Modal>
            </MainView>
        </Container>
    )
}

const MainView = styled.View`
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
`

export default Albums
