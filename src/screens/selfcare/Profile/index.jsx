import React from 'react'
import { View, Text } from 'react-native'
import { List, Switch } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleDarkTheme, ToggleLightTheme } from '@actions/theme'

import { logout } from '@actions/auth'

import { Button } from '@components/styled-components'

const Index = () => {
    const dispatch = useDispatch()
    const themeReducer = useSelector(state => state.theme)

    const ToggleTheme = theme => {
        if (theme === true) {
            dispatch(ToggleDarkTheme())
        } else {
            dispatch(ToggleLightTheme())
        }
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <List.Item
                    title="Dark Mode"
                    left={() => <List.Icon icon="brightness-4" />}
                    right={() => (
                        <Switch
                            value={themeReducer.theme}
                            onValueChange={val => {
                                ToggleTheme(val)
                            }}
                        />
                    )}
                />
            </View>
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
