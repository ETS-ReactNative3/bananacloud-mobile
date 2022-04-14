import storage from '@react-native-firebase/storage'
import { showMessage } from 'react-native-flash-message'

export const removeAlbums = async (userId, name) => {
    const album = storage().ref(`${userId}/albums/${name}.json`)

    album
        .delete()
        .then(() => {
            showMessage({
                message: 'Album supprimé',
                type: 'info',
            })
        })
        .catch(error => {
            console.log(error)
            showMessage({
                message: 'error',
                type: 'warning',
            })
        })
}
