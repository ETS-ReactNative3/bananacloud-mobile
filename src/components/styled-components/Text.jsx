import React from 'react'
import styled from 'styled-components'

export const Text = ({ children, secondary = false }) => <Text secondary>{children}</Text>

const Text = styled.Text`
    color: ${props => (props.secondary ? props.theme.colors.secondary : 'black')};
`
