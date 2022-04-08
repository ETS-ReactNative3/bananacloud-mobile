import React, { useState } from 'react'
import { SafeAreaView, View, Text, Modal, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import IonIcons from 'react-native-vector-icons/Ionicons'

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

    const [modalVisible, setModalVisible] = useState(false)

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
                <Button
                    title={currentTheme}
                    style={{ bgColor: '#be2edd' }}
                    onPress={() => setModalVisible(true)}
                />

                <View>
                    <Text style={{ textAlign: 'center' }}>
                        Formule :{' '}
                        <Text style={{ fontWeight: 'bold' }}>
                            {isPremium ? t('profile.premium') : t('profile.free')}
                        </Text>
                    </Text>
                    {!isPremium && (
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{ position: 'absolute', top: 0, bottom: 0 }}
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            position: 'relative',
                            backgroundColor: '#ecf0f1',
                            padding: 50,
                            borderRadius: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <View style={{ position: 'absolute', top: 5, right: 5 }}>
                            <TouchableOpacity
                                icon="close-outline"
                                onPress={() => setModalVisible(false)}
                                style={{}}
                            >
                                <IonIcons name="close-outline" size={28} />
                            </TouchableOpacity>
                        </View>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={LIGHT_THEME}
                                icon="sunny-outline"
                                onPress={() => {
                                    dispatch(chooseTheme(LIGHT_THEME), setModalVisible(false))
                                }}
                            />
                        </Margin>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={DARK_THEME}
                                icon="moon-outline"
                                onPress={() => {
                                    dispatch(chooseTheme(DARK_THEME), setModalVisible(false))
                                }}
                            />
                        </Margin>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={SYSTEM_THEME}
                                icon="settings-outline"
                                onPress={() => {
                                    dispatch(chooseTheme(SYSTEM_THEME), setModalVisible(false))
                                }}
                            />
                        </Margin>
                    </View>
                </SafeAreaView>
            </Modal>
        </Margin>
    )
}

export default Profile
