import React, { useState, useEffect } from 'react'
import { View, Text, Modal, FlatList, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'

import { getAlbums } from '@utils/albums/getAlbums'
import { addAlbum } from '@utils/albums/addAlbum'

import { Button, TextInput } from '@components/styled-components'

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
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    icon="add-outline"
                    onPress={() => setIsVisible(true)}
                    title="Créer un album"
                />

                {albumsList.length > 0 ? (
                    <FlatList
                        data={albumsList}
                        numColumns="2"
                        renderItem={({ item }) => <Button title={item} />}
                        keyExtractor={item => item.id}
                    />
                ) : (
                    <Text style={{ textAlign: 'center' }}>Pas d'albums</Text>
                )}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    style={{ position: 'absolute', top: 0, bottom: 0 }}
                >
                    <SafeAreaView
                        style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            margin: 20,
                        }}
                    >
                        <View
                            style={{
                                position: 'relative',
                                backgroundColor: '#ecf0f1',
                                borderRadius: 10,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                width: '100%',
                            }}
                        >
                            <TextInput
                                placeholder="Prague"
                                value={name}
                                onChangeText={e => setName(e)}
                                color="#dfe6e9"
                            />
                            <Button title="Valider" onPress={createFolder} />
                        </View>
                    </SafeAreaView>
                </Modal>
            </View>
        </>
    )
}

export default Albums
