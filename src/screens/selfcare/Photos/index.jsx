import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'

import HeaderPhoto from '@components/HeaderPhoto'

const Photos = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [transferred, setTransferred] = useState(0)

    const selectImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'mixed',
            durationLimit: 15,
        })

        if (result.didCancel) {
            console.log('User cancelled image picker')
        } else if (result.error) {
            console.log('ImagePicker Error: ', result.error)
        } else {
            const source = result.assets[0].uri
            setImage(source)
        }
    }

    const uploadImage = async () => {
        const uri = image
        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        setUploading(true)
        setTransferred(0)
        const task = storage().ref(filename).putFile(uploadUri)
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000)
        })
        try {
            await task
        } catch (e) {
            console.error(e)
        }
        setUploading(false)
        setImage(null)
    }

    return (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity onPress={selectImage}>
                <Text>Pick an image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadImage}>
                <Text>Gooooo</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Photos
