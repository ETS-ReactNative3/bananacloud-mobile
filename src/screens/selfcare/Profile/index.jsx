import React, { useState } from 'react'
import styled from 'styled-components'
import { View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, chooseTheme } from '@actions/theme'
import { logout } from '@actions/user'
import { changeLangage } from '@actions/langage'

import { version as version } from '@root/package.json'

import { Margin, Button, StyledText } from '@components/styled-components'

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
            <MainView>
                <Button
                    title={currentTheme}
                    style={{ bgColor: '#be2edd' }}
                    onPress={() => setModalVisible(true)}
                />

                <View>
                    <StyledText>
                        Formule :{' '}
                        <StyledText bold>
                            {isPremium ? t('profile.premium') : t('profile.free')}
                        </StyledText>
                    </StyledText>
                    {!isPremium && (
                        <Button
                            title={t('profile.premiumButton')}
                            icon="cash-outline"
                            style={{ bgColor: '#2c3e50' }}
                            onPress={() => navigation.navigate('Payment')}
                        />
                    )}
                </View>
                <View>
                    <StyledText>
                        Langue : <StyledText bold>{currentLang}</StyledText>
                    </StyledText>
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
                    <AppVersionText>BananaCloud {version}</AppVersionText>
                </View>
            </MainView>
            <ModalView animationType="slide" transparent={true} visible={modalVisible}>
                <ModalSafeAreaView>
                    <SubModalView>
                        <CloseView>
                            <TouchableOpacity
                                icon="close-outline"
                                onPress={() => setModalVisible(false)}
                                style={{}}
                            >
                                <IonIcons name="close-outline" size={28} />
                            </TouchableOpacity>
                        </CloseView>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={t('profile.light')}
                                icon="sunny-outline"
                                onPress={() => {
                                    dispatch(chooseTheme(LIGHT_THEME), setModalVisible(false))
                                }}
                            />
                        </Margin>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={t('profile.dark')}
                                icon="moon-outline"
                                onPress={() => {
                                    dispatch(chooseTheme(DARK_THEME), setModalVisible(false))
                                }}
                            />
                        </Margin>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={t('profile.system')}
                                icon="settings-outline"
                                onPress={() => {
                                    dispatch(chooseTheme(SYSTEM_THEME), setModalVisible(false))
                                }}
                            />
                        </Margin>
                    </SubModalView>
                </ModalSafeAreaView>
            </ModalView>
        </Margin>
    )
}

const MainView = styled.SafeAreaView`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
`

const CloseView = styled.View`
    position: absolute;
    top: 5px;
    right: 5px;
`

const AppVersionText = styled.Text`
    font-size: 12px;
    color: gray;
    text-align: center;
`

const ModalView = styled.Modal`
    position: absolute;
    top: 0;
    bottom: 0;
`

const ModalSafeAreaView = styled.SafeAreaView`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`

const SubModalView = styled.View`
    position: relative;
    background-color: #ecf0f1;
    padding: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default Profile
