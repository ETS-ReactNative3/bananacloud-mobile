import React from 'react'
import styled from 'styled-components'
import IonIcons from 'react-native-vector-icons/Ionicons'
IonIcons.loadFont()

export const TextInput = ({
    icon,
    placeholder,
    value,
    onChangeText,
    style,
    color,
    secureTextEntry,
}) => (
    <View color={color} style={style}>
        <IconContainer style={style}>
            <IonIcons name={icon} size={18} />
        </IconContainer>
        <TextInputContainer
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            color={color}
            cstyle={style}
            secureTextEntry={secureTextEntry}
        />
    </View>
)

const View = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 2%;
    margin-top: 15px;
    margin-bottom: 15px;
    border-radius: 10px;
    background-color: ${({ style }) => (style?.bgColor ? style.bgColor : 'white')};
`

const IconContainer = styled.View`
    margin-right: 10px;
    background-color: ${({ style }) => (style?.bgColor ? style.bgColor : 'white')};
    border: none;
`

const TextInputContainer = styled.TextInput`
    flex: 1;
    border-radius: 5px;
    background-color: ${({ cstyle }) => (cstyle?.bgColor ? cstyle.bgColor : 'white')};
    color: black;
`
