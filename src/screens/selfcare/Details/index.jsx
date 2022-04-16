import React from 'react'
import styled from 'styled-components'

const Details = ({ route }) => {
    const photoInfos = route.params.photo.item

    return (
        <MainView>
            <CustomImage source={{ uri: photoInfos?.path }} />
        </MainView>
    )
}

const MainView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`

const CustomImage = styled.Image`
    width: 100%;
    height: 100%;
`
export default Details
