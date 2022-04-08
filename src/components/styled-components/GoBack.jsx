import React from 'react'
import { TouchableOpacity } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Color from './Color'

export const GoBack = ({ onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <IonIcons name="chevron-back-outline" size={18} color={Color.Color.DEFAULT} />
    </TouchableOpacity>
)
