import React from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Picker } from '@react-native-picker/picker'
import { useTranslation } from 'react-i18next'

import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, chooseTheme } from '@actions/theme'
import { logout } from '@actions/user'

import { version as version } from '@root/package.json'

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

    const currentTheme = useSelector(state => state.theme.currentTheme)

    return (
        <Margin mt={10} ml={5} mr={5}>
            <SafeAreaView
                style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Picker
                    selectedValue={currentTheme}
                    mode={'dialog'}
                    onValueChange={theme => dispatch(chooseTheme(theme))}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Picker.Item label="Light" value={LIGHT_THEME} />
                    <Picker.Item label="Dark" value={DARK_THEME} />
                    <Picker.Item label="System" value={SYSTEM_THEME} />
                </Picker>

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
                            onPress={() => navigation.navigate('Payment')}
                        />
                    ) : (
                        <Button
                            title={t('profile.premiumButton')}
                            icon="cash-outline"
                            style={{ bgColor: '#f39c12' }}
                            onPress={() => navigation.navigate('Payment')}
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
                        }}
                    >
                        BananaCloud {version}
                    </Text>
                </View>
            </SafeAreaView>
        </Margin>
    )
}

export default Profile
