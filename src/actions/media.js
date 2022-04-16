import { Image } from 'react-native-compressor'
import storage from '@react-native-firebase/storage'
import { showMessage } from 'react-native-flash-message'

import i18n from '@configs/translations/initTranslation'

export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_FAILED = 'UPLOAD_FAILED'

export const ALL_PHOTOS_SUCCESS = 'ALL_PHOTOS_SUCCESS'
export const ALL_PHOTOS_FAILED = 'ALL_PHOTOS_FAILED'

export const uploadMedia = (photo, userId) => async dispatch => {
    const uri = await Image.compress(photo, {
        compressionMethod: 'auto',
    })
    const filename = uri.substring(uri.lastIndexOf('/') + 1)
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

    const task = storage().ref(`${userId}/${filename}`).putFile(uploadUri)

    try {
        await task
        showMessage({
            message: i18n.t('reduxMsg.successUpload'),
            type: 'success',
        })

        let mediaList = []
        const photos = await storage().ref(`${userId}`).list({
            maxResults: 15,
        })

        for (const key in photos.items) {
            const path = await storage().ref(photos.items[key].path).getDownloadURL()
            mediaList.push({ path: path.toString(), relativePath: photos.items[key].path })
        }

        dispatch({ type: UPLOAD_SUCCESS, payload: { mediaList } })
    } catch (e) {
        showMessage({
            message: `${e}`,
            type: 'warning',
        })

        dispatch({ type: UPLOAD_FAILED, payload: { error: e } })
    }
}

export const getMedia =
    (userId, offset = 15) =>
    async dispatch => {
        try {
            let mediaList = []
            const photos = await storage().ref(`${userId}`).list({
                maxResults: offset,
            })

            for (const key in photos.items) {
                const path = await storage().ref(photos.items[key].path).getDownloadURL()
                mediaList.push({ path: path.toString(), relativePath: photos.items[key].path })
            }

            dispatch({ type: ALL_PHOTOS_SUCCESS, payload: { mediaList } })
        } catch (error) {
            dispatch({ type: ALL_PHOTOS_FAILED, payload: { error } })
        }
    }
