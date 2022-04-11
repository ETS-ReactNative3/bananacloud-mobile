import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import Modal from '@components/Modal'
import styled from 'styled-components'

import Folder from '@public/folder.png'

const Albums = () => {
    const [visible, setIsVisible] = useState(false)
    const [nameFolder, setNameFolder] = useState([])

    const createFolder = () => {
        setIsVisible(true)
    }

    return (
        <>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        createFolder()
                    }}
                >
                    <Text>Créer un dossier</Text>
                </TouchableOpacity>
                <FlatList
                    data={nameFolder}
                    numColumns="3"
                    renderItem={({ item }) => (
                        <View>
                            <ImageFolder source={Folder} />
                            <Text>{item.label}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>

            {visible ? (
                <View>
                    <Modal
                        setIsVisible={setIsVisible}
                        nameFolder={nameFolder}
                        setNameFolder={setNameFolder}
                    ></Modal>
                </View>
            ) : (
                <View></View>
            )}
        </>
    )
}

const ImageFolder = styled.Image`
    width: 80px;
    height: 65px;
    text-align: center;
    border-radius: 5px;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
`

export default Albums
