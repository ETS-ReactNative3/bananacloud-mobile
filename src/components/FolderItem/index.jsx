import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
MCIcons.loadFont()

import { removeAlbum } from '@actions/album'

import { Container, StyledText } from '@components/styled-components'

const FolderItem = ({ albumName, navigation }) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.user._id)

    return (
        <Container>
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate({
                        name: 'AlbumDetail',
                        params: {
                            albumName,
                        },
                    })
                }
            >
                <IonIcons name="folder" color="#f39c12" size={85}></IonIcons>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
                <StyledText>{albumName}</StyledText>
                <TouchableOpacity
                    onPress={() => dispatch(removeAlbum(userId, albumName))}
                    style={{ left: '100%' }}
                >
                    <MCIcons name="delete" size={20}></MCIcons>
                </TouchableOpacity>
            </View>
        </Container>
    )
}

export default FolderItem
