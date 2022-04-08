import React from 'react'
import { View, Image } from 'react-native'

const Details = ({ route }) => {
    const photoInfos = route.params.photo.item

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: photoInfos?.path }} style={{ width: '100%', height: '100%' }} />
        </View>
    )
}

export default Details
