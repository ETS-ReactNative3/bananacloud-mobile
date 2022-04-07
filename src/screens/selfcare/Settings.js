import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { List, Switch } from 'react-native-paper'
import { ToggleTheme } from '../../actions/theme'
import { useDispatch, useSelector } from 'react-redux'
import { ToggleDarkTheme, ToggleLightTheme } from '../../actions/theme'

export default ({ navigation }) => {
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
    )
}
