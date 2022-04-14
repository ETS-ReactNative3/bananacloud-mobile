import React from 'react'
import styled from 'styled-components'
import IonIcons from 'react-native-vector-icons/Ionicons'

export const Button = ({ title, onPress, icon, style, disabled = false }) => (
    <ButtonContainer onPress={onPress} style={style} disabled={disabled}>
        {icon && (
            <IconContainer>
                <IonIcons name={icon} size={18} color={`${style?.color ? 'black' : 'white'}`} />
            </IconContainer>
        )}
        {title && (
            <ButtonText color={`${style?.color ? style.color : 'white'}`}>{title}</ButtonText>
        )}
    </ButtonContainer>
)

const ButtonContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    padding: 15px 30px;
    border: 1px solid ${({ style }) => (style?.color ? style?.color : 'transparent')};
    border-radius: 10px;
    background-color: ${({ style }) => (style?.bgColor ? style?.bgColor : 'black')};
`

const IconContainer = styled.View`
    margin-right: 0;
`

const ButtonText = styled.Text`
    font-weight: bold;
    text-align: center;
    color: ${({ color }) => (color ? color : 'white')};
    font-size: 16px;
    margin-left: 10px;
`
