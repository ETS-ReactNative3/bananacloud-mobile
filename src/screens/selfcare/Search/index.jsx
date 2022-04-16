import React from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob'

import { Margin, Button } from '@components/styled-components'

const Search = () => {
    const { t } = useTranslation()

    const isPremium = useSelector(state => state.user.isPremium)

    const showInterstitialAd = () => {
        if (isPremium) {
            return alert(t('search.alreadyPremium'))
        }

        const interstitialAd = InterstitialAd.createForAdRequest(
            'ca-app-pub-9539113506509263/9888016585',
        )

        interstitialAd.onAdEvent((type, error) => {
            if (type === AdEventType.LOADED) {
                interstitialAd.show()
            }
        })
        interstitialAd.load()
    }

    return (
        <MainView>
            <Margin mt={10} />
            <Button onPress={showInterstitialAd} title={t('search.showPubBtn')} />
        </MainView>
    )
}

const MainView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`

export default Search
