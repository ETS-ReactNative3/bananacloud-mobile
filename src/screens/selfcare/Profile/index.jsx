import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { version as version } from '@root/package.json'

import { logout } from '@actions/user'
import { changeLangage } from '@actions/langage'

import { Margin, Button } from '@components/styled-components'

const Profile = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const isPremium = useSelector(state => state.user.isPremium)
    const currentLang = useSelector(state => state.langage.currentLang)

    const changeLangNow = async () => {
        if (currentLang === 'FR') {
            return dispatch(changeLangage('EN'))
        } else {
            return dispatch(changeLangage('FR'))
        }
    }

    return (
        <Margin mt={10} ml={5} mr={5}>
            <SafeAreaView
                style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'space-between',
                }}>
                <View>
                    <Text style={{ textAlign: 'center' }}>
                        Formule :{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                            {isPremium ? t('profile.premium') : t('profile.free')}
                        </Text>
                    </Text>
                    {isPremium ? (
                        <Button
                            title={t('profile.freeButton')}
                            icon="cash-outline"
                            style={{ bgColor: '#2c3e50' }}
                            onPress={() => navigation.navigate('Paiement')}
                        />
                    ) : (
                        <Button
                            title={t('profile.premiumButton')}
                            icon="cash-outline"
                            style={{ bgColor: '#f39c12' }}
                            onPress={() => navigation.navigate('Paiement')}
                        />
                    )}
                </View>
                <View>
                    <Text style={{ textAlign: 'center' }}>
                        Langue : <Text style={{ fontWeight: 'bold' }}>{currentLang}</Text>
                    </Text>
                    <Button
                        title={t('profile.changeLang')}
                        icon="flag-outline"
                        onPress={changeLangNow}
                        style={{ bgColor: '#10ac84' }}
                    />
                </View>
                <View>
                    <Button
                        title={t('logout')}
                        icon="log-out-outline"
                        onPress={() => dispatch(logout())}
                    />
                    <Text
                        style={{
                            fontSize: 12,
                            color: 'gray',
                            textAlign: 'center',
                        }}>
                        BananaCloud {version}
                    </Text>
                </View>
            </SafeAreaView>
        </Margin>
    )
}

export default Profile
