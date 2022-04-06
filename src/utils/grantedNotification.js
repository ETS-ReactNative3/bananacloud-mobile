import messaging from '@react-native-firebase/messaging'

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()

    if (authStatus) {
        console.log('Authorization status:', authStatus)
    }
}
