import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Picker } from '@react-native-picker/picker'
import { View } from 'react-native'

import { DARK_THEME, LIGHT_THEME, SYSTEM_THEME, chooseTheme } from '@actions/theme'
import { logout } from '@actions/auth'

import { Button } from '@components/styled-components'

const Index = () => {
    const dispatch = useDispatch()

    const currentTheme = useSelector(state => state.theme.currentTheme)

    return (
        <>
            <Picker
                selectedValue={currentTheme}
                mode={'dialog'}
                onValueChange={theme => dispatch(chooseTheme(theme))}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Picker.Item label="Light" value={LIGHT_THEME} />
                <Picker.Item label="Dark" value={DARK_THEME} />
                <Picker.Item label="System" value={SYSTEM_THEME} />
            </Picker>

            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                    title="Deconnexion"
                    icon="log-out-outline"
                    onPress={() => dispatch(logout())}
                />
            </View>
        </>
    )
}

export default Index
