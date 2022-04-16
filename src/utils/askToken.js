import messaging from '@react-native-firebase/messaging'

export const askToken = async () => {
    const token = await messaging().getToken()
}
