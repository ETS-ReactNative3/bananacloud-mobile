import React, { useState } from 'react'
import { View, Image, ActivityIndicator, TouchableOpacity, Modal, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { Button, Margin } from './styled-components'

const Card = props => {
    const navigation = useNavigation()
    const favoritesList = true
    const photo = props.photo
    const [isLoading, setIsLoading] = useState(true)

    return (
        <TouchableOpacity
            style={{ width: 150 }}
            onPress={() =>
                navigation.navigate('Details', {
                    photo,
                })
            }
        >
            <View style={{ position: 'relative' }}>
                <Image
                    source={{ uri: photo?.item?.path }}
                    style={{ width: '100%', height: 150, borderRadius: 15 }}
                    onLoadEnd={() => setIsLoading(false)}
                />
                <View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        padding: 5,
                    }}
                >
                    <TouchableOpacity onPress={() => console.log(photo)}>
                        {favoritesList ? (
                            <IonIcons name="heart" color="#f39c12" size={21} />
                        ) : (
                            <IonIcons name="heart-outline" size={21} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log(photo)}>
                        {favoritesList ? (
                            <IonIcons
                                name="folder"
                                color="#f39c12"
                                size={21}
                                onPress={() => {
                                    props.setIsVisible(true)
                                }}
                            />
                        ) : (
                            <IonIcons
                                name="folder"
                                size={21}
                                onPress={() => {
                                    setIsVisible(true)
                                }}
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            {isLoading && (
                <ActivityIndicator
                    size={32}
                    style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
                />
            )}
        </TouchableOpacity>
    )
}

export default Card
