import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob'

const Search = () => {
    const showInterstitialAd = () => {
        const interstitialAd = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL)

        interstitialAd.onAdEvent((type, error) => {
            console.log('type: ', type)
            console.log('error: ', error)
            if (type === AdEventType.LOADED) {
                console.log('show')
                interstitialAd.show()
            }
        })
        console.log('load')
        interstitialAd.load()
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={showInterstitialAd}>
                <Text>Show pub</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Search
