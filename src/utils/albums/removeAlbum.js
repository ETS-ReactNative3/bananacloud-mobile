import storage from '@react-native-firebase/storage'
import { showMessage } from 'react-native-flash-message'

export const removeAlbums = async (userId, name) => {
    const album = await storage().ref(`${userId}/albums/${name}.json`)

    album
        .delete()
        .then(function () {
            showMessage({
                message: 'Album supprimé',
                type: 'info',
            })
        })
        .catch(function (error) {
            console.log(error)
            showMessage({
                message: 'error',
                type: 'warning',
            })
        })
}
