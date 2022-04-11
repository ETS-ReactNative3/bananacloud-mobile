import storage from '@react-native-firebase/storage'
import { showMessage } from 'react-native-flash-message'
import RNFS from 'react-native-fs'

export const addAlbum = async (userId, albumName) => {
    console.log(userId)
    try {
        const albumPath = `${RNFS.DocumentDirectoryPath}/${albumName}.json`
        await RNFS.writeFile(albumPath, JSON.stringify([{ id: 0, path: 'isetest.png' }]), 'utf8')

        await storage().ref(`/${userId}/albums/${albumName}.json`).putFile(albumPath)

        showMessage({
            message: 'Album créé',
            type: 'info',
        })
    } catch (error) {
        console.log(error)
        showMessage({
            message: 'error',
            type: 'warning',
        })
    }
}
