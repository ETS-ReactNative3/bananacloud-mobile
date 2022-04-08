import React from 'react'
import { View, Text } from 'react-native'

const Details = ({ route }) => {
    const photoInfo = route.params.photo

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details</Text>
        </View>
    )
}

export default Details
