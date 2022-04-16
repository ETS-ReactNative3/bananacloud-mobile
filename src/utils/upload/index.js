import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

export const uploadFromGallery = async () => {
    const result = await launchImageLibrary({
        mediaType: 'mixed',
        durationLimit: 15,
    })

    if (result.didCancel) return null
    else if (result.error) return null
    else {
        const source = result.assets[0].uri
        return source
    }
}

export const uploadFromCamera = async () => {
    const result = await launchCamera({
        mediaType: 'mixed',
        durationLimit: 15,
    })

    if (result.didCancel) return null
    else if (result.error) return null
    else {
        const source = result.assets[0].uri
        return source
    }
}
