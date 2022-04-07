import React, { useState } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'

const CardExample = ({ photo }) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <View style={{ position: 'relative', width: 100, height: 100 }}>
            <Image
                source={{ uri: photo?.item?.path }}
                style={{ width: 100, height: 100 }}
                onLoadEnd={() => setIsLoading(false)}
            />
            {isLoading && (
                <ActivityIndicator
                    size={32}
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                />
            )}
        </View>
    )
}

export default CardExample
