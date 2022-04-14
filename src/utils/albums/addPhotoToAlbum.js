import { showMessage } from 'react-native-flash-message'
import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs'

export const addPhotoToAlbum = async (albumName, photoPath, userId) => {
    try {
        const albumContentPath = await storage()
            .ref(`${userId}/albums/${albumName}.json`)
            .getDownloadURL()

        const test = RNFS.downloadFile({
            fromUrl: albumContentPath,
            toFile: `${RNFS.DocumentDirectoryPath}/${albumName}.json`,
        })

        // RNFS.readFile(albumContentPath).then(res => console.log(res))

        showMessage({
            message: 'Ajouté avec succès',
            type: 'info',
        })
    } catch (error) {
        console.log(error)
        showMessage({
            message: "Une erreur c'est produite",
            type: 'warning',
        })
    }
}
