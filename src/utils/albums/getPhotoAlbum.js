import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs'

export const getPhotoAlbum = async albumName => {
    try {
        let yourPhotosAlbumList = []
        const file = await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/${albumName}_old.json`)
        const fileList = JSON.parse(file)
        for (const key in fileList) {
            const path = await storage().ref(fileList[key].path).getDownloadURL()
            yourPhotosAlbumList.push({ path: path.toString(), relativePath: fileList[key].path })
        }
        return yourPhotosAlbumList
    } catch (e) {}
}
