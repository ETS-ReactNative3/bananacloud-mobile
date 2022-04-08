import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'
import { showMessage } from 'react-native-flash-message'

export const uploadImage = async (photo, userId) => {
    const uri = photo
    const filename = uri.substring(uri.lastIndexOf('/') + 1)
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

    const task = storage().ref(`${userId}/${filename}`).putFile(uploadUri)
    // set progress state
    // task.on('state_changed', snapshot => {
    //     setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
    // })
    try {
        await task
        showMessage({
            message: `Success`,
            type: 'success',
        })
    } catch (e) {
        console.error(e)
        showMessage({
            message: `${e}`,
            type: 'warning',
        })
    }
}

export const uploadFromGallery = async () => {
    const result = await launchImageLibrary({
        mediaType: 'mixed',
        durationLimit: 15,
    })

    if (result.didCancel) {
        console.log('User cancelled image picker')
        return null
    } else if (result.error) {
        console.log('ImagePicker Error: ', result.error)
        return null
    } else {
        const source = result.assets[0].uri
        return source
    }
}

export const uploadFromCamera = async () => {
    const result = await launchCamera({
        mediaType: 'mixed',
        durationLimit: 15,
    })

    if (result.didCancel) {
        console.log('User cancelled image picker')
        return null
    } else if (result.error) {
        console.log('ImagePicker Error: ', result.error)
        return null
    } else {
        const source = result.assets[0].uri
        return source
    }
}
