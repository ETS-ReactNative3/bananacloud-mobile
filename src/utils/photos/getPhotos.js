import storage from '@react-native-firebase/storage'

export const getPhotos = async (userId, offset = 15) => {
    let yourPhotosList = []
    const photos = await storage().ref(`${userId}`).list({
        maxResults: offset,
    })

    for (const key in photos.items) {
        const path = await storage().ref(photos.items[key].path).getDownloadURL()
        yourPhotosList.push({ path: path.toString() })
    }
    return yourPhotosList
}
