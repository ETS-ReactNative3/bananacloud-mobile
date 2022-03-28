import AsyncStorage from '@react-native-async-storage/async-storage'

export const getIsAuth = async () => {
    const token = await AsyncStorage.getItem('token')
    // const user = await AsyncStorage.getItem('user')

    return token ? true : false
}
