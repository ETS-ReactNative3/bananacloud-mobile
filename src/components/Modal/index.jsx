import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import uuid from 'react-native-uuid'

import croix from '../../public/croix.png'
import { TextInput } from '../styled-components'
import { Button } from '../styled-components'

const Modal = props => {
    const [text, setText] = useState('')

    const addToTodoList = () => {
        props.setNameFolder([...props.nameFolder, { label: text, id: uuid.v4() }])
        setText('')
    }

    return (
        <ModalView>
            <TouchableOpacity onPress={() => props.setIsVisible(false)}>
                <Croix source={croix} />
            </TouchableOpacity>
            <TextInput
                placeholder="Nom du dossier"
                onChangeText={el => {
                    setText(el)
                }}
            ></TextInput>
            <Button
                title="Créer"
                onPress={() => {
                    addToTodoList()
                    props.setIsVisible(false)
                }}
                icon="heart-outline"
                style={{ flex: 1, marginRight: 5, bgColor: '#544747', color: '#f39c12' }}
            ></Button>
        </ModalView>
    )
}

const ModalView = styled.View`
    width: 180px;
    height: 130px;
    margin-top: 130px;
    margin-left: 90px;
    border: 2px solid #f39c12;
    //opacity:0.80;
    border-radius: 10px;
    z-index: 99999;
`

const Croix = styled.Image`
    height: 20px;
    width: 30px;
    position: absolute;
    right: 0px;
    z-index: 1;
`

export default Modal
