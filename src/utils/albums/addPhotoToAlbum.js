import React, { useState } from 'react'
import { showMessage } from 'react-native-flash-message'
import storage from '@react-native-firebase/storage'
import RNFS from 'react-native-fs'

export const addPhotoToAlbum = async (albumName, photoPath, userId) => {
    try {
        let content = ''

        const albumContentPath = await storage()
            .ref(`${userId}/albums/${albumName}.json`)
            .getDownloadURL()

        RNFS.downloadFile({
            fromUrl: albumContentPath,
            toFile: `${RNFS.DocumentDirectoryPath}/${albumName}_old.json`,
        })
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

            showMessage({
                message: 'Ajouté avec succès',
                type: 'info',
            })
        } else {
            showMessage({
                message: 'Photo déjà dans album',
                type: 'info',
            })
        }
    } catch (error) {
        console.log(error)
        showMessage({
            message: "Une erreur c'est produite",
            type: 'warning',
        })
    }
}
