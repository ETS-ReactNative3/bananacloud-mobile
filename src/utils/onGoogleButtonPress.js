import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { WEB_ID_GOOGLE } from '@env'

import { register } from '@actions/user'

export const onGoogleButtonPress = async () => {
   
    await GoogleSignin.configure({
        webClientId: WEB_ID_GOOGLE,
    })


    const user = await GoogleSignin.signIn()
    console.log(user);
    
    //const googleCredential = auth.GoogleAuthProvider.credential(idToken)


    //return auth().signInWithCredential(googleCredential)
}
