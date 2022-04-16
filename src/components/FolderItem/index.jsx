import { View, Text } from 'react-native'
import React from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
MCIcons.loadFont()

import { Container } from '@components/styled-components'

const FolderItem = () => {
    return (
        <Container>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate({
                        name: 'AlbumDetail',
                        params: {
                            paramNameAlbum: item,
                        },
                    })
                }
            >
                <IonIcons name="folder" color="#f39c12" size={85}></IonIcons>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <Text>{item}</Text>
                <TouchableOpacity onPress={() => deleteFolder(item)} style={{ left: '100%' }}>
                    <MCIcons name="delete" size={20}></MCIcons>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default FolderItem
