import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

import { getAlbums } from '@utils/albums/getAlbums'
import { addAlbum } from '@utils/albums/addAlbum'

import { Button, TextInput } from '@components/styled-components'
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

    useEffect(() => {
        hydrateAlbums()
    }, [])

    return (
        <>
            <SafeAreaView>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        icon="add-outline"
                        onPress={() => setIsVisible(true)}
                        title="Créer un album"
                    />

                    {albumsList.length > 0 ? (
                        <View>
                            <FlatList
                                data={albumsList}
                                numColumns="2"
                                renderItem={({ item }) => <Button title={<Text>{item}</Text>} />}
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
                            placeholder="Prague"
                            value={name}
                            onChangeText={e => setName(e)}
                            color="#dfe6e9"
                        />
                        <Button title="Valider" onPress={createFolder} />
                    </Modal>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Albums
