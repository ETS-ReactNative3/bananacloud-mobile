import React from 'react'
import styled from 'styled-components'

export const Text = ({ children, secondary = false }) => <TextColor secondary>{children}</TextColor>

const TextColor = styled.Text`
    color: ${props => (props.secondary ? props.theme.colors.secondary : 'black')};
`
