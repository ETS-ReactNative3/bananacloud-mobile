import { showMessage } from 'react-native-flash-message'
import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs'

import i18n from '@configs/translations/initTranslation'

export const addPhotoToAlbum = async (albumName, photoPath, userId) => {
    try {
        let content = ''

        const albumContentPath = await storage()
            .ref(`${userId}/albums/${albumName}.json`)
            .getDownloadURL()

        RNFS.downloadFile({
            fromUrl: albumContentPath,
            toFile: `${RNFS.DocumentDirectoryPath}/${albumName}_old.json`,
        }).promise.then(async () => {
            content = JSON.parse(
                await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/${albumName}_old.json`),
            )

            let photoExist = content.findIndex(el => {
                if (el.path === photoPath) {
                    return el.path
                }
            })

            if (photoExist === -1) {
                content = [...content, { path: photoPath }]
                const albumPath = `${RNFS.DocumentDirectoryPath}/${albumName}.json`

                await RNFS.writeFile(albumPath, JSON.stringify(content), 'utf8')
                await storage().ref(`/${userId}/albums/${albumName}.json`).putFile(albumPath)

                await RNFS.unlink(albumPath)
                await RNFS.unlink(`${RNFS.DocumentDirectoryPath}/${albumName}_old.json`)

                showMessage({
                    message: i18n.t('reduxMsg.addedSucces'),
                    type: 'info',
                })
            } else {
                showMessage({
                    message: i18n.t('reduxMsg.alreadyAdded'),
                    type: 'info',
                })
            }
        })
    } catch (error) {
        showMessage({
            message: `${error}`,
            type: 'warning',
        })
    }
}
