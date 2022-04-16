import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styled from 'styled-components'
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
        <MainView>
            <TouchableOpacity onPress={showInterstitialAd}>
                <Text>Show pub</Text>
            </TouchableOpacity>
        </MainView>
    )
}

const MainView = styled.View`
    display: 'flex';
    justify-content: 'center';
    align-items: 'center';
`

export default Search
