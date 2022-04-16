import React from 'react'

const Details = ({ route }) => {
    const photoInfos = route.params.photo.item

    return (
        <MainView>
            <CustomImage source={{ uri: photoInfos?.path }} />
        </MainView>
    )
}

const MainView = styled.View`
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
`

const CustomImage = styled.Image`
    width: '100%';
    height: auto;
`
export default Details
