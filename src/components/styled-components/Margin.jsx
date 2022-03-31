import React from 'react'
import styled from 'styled-components'

export const Margin = ({ children, mt, mb, ml, mr }) => (
    <ViewMargin mt={mt} mb={mb} ml={ml} mr={mr}>
        {children}
    </ViewMargin>
)

const ViewMargin = styled.View`
    margin: ${({ mt = 0, mb = 0, ml = 0, mr = 0 }) => `${mt}px ${mr}px ${mb}px ${ml}px `};
`
