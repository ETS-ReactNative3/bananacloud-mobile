import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { WEB_ID_GOOGLE } from '@env'

export const onGoogleButtonPress = async () => {
    await GoogleSignin.configure({
        webClientId: WEB_ID_GOOGLE,
    })

    const { idToken } = await GoogleSignin.signIn()

    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential)
}
