import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useFocusEffect } from '@react-navigation/native'

import { getAlbums } from '@utils/albums/getAlbums'
import { addAlbum } from '@utils/albums/addAlbum'
import { removeAlbums } from '@utils/albums/removeAlbum'

import { Button, TextInput, Container } from '@components/styled-components'
import Modal from '@components/Modal'

const Albums = () => {
    const userId = useSelector(state => state.user.user._id)
    const [visible, setIsVisible] = useState(false)
    const [name, setName] = useState('')
    const [albumsList, setAlbumsList] = useState([])

    const hydrateAlbums = async () => {
        const list = await getAlbums(userId)
        setAlbumsList(list)
    }

    const createFolder = async () => {
        await addAlbum(userId, name)
        setIsVisible(false)
        hydrateAlbums(userId)
    }

    const deleteFolder = async (userId, item) => {
        await removeAlbums(userId, item)
        await hydrateAlbums()
    }

    useEffect(() => {
        hydrateAlbums()
    }, [])
    useFocusEffect(() => {
        hydrateAlbums
    })

    return (
        <>
            <Container>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => setIsVisible(true)}>
                        <AntDesign name="addfolder" size={35} />
                    </TouchableOpacity>

                    {albumsList.length > 0 ? (
                        <View>
                            <FlatList
                                data={albumsList}
                                numColumns={3}
                                renderItem={({ item }) => (
                                    <Container>
                                        <IonIcons
                                            name="folder"
                                            color="#f39c12"
                                            size={85}
                                        ></IonIcons>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{item}</Text>
                                            <TouchableOpacity
                                                onPress={() => deleteFolder(userId, item)}
                                                style={{ left: '100%' }}
                                            >
                                                <MCIcons name="delete" size={20}></MCIcons>
                                            </TouchableOpacity>
                                        </View>
                                    </Container>
                                )}
                                keyExtractor={item => item.id}
                            />
                        </View>
                    ) : (
                        <View>
                            <Text style={{ textAlign: 'center' }}>Pas d'albums</Text>
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
                </View>
            </Container>
        </>
    )
}

export default Albums
