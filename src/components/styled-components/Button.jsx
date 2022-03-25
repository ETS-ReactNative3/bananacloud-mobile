import React from 'react'
import styled from 'styled-components'
import IonIcons from 'react-native-vector-icons/Ionicons'

export const Button = ({ title, onPress, icon, style }) => (
    <ButtonContainer onPress={onPress} style={style}>
        {icon && (
            <IconContainer>
                <IonIcons name={icon} size={18} color={style?.color} />
            </IconContainer>
        )}
        <ButtonText>{title}</ButtonText>
    </ButtonContainer>
)

const ButtonContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    padding: 15px 30px;
    border: 1px solid ${({ style }) => (style.bgColor ? style.bgColor : 'black')};
    border-radius: 10px;
    background-color: ${({ style }) => (style.bgColor ? style.bgColor : 'black')};
`

const IconContainer = styled.View`
    margin-right: 10px;
`

const ButtonText = styled.Text`
    font-weight: bold;
    text-align: center;
    color: white;
    font-size: 16px;
`
