import React from 'react'
import styled from 'styled-components'

export const StyledText = ({ children, color, bold, title }) => (
    <TextView color={color} bold={bold} title={title}>
        {children}
    </TextView>
)

const TextView = styled.Text`
    color: ${({ color, theme }) => (color ? color : theme.colors.secondary)};
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    font-size: ${props => (props.title ? '21px' : '16px')};
`
