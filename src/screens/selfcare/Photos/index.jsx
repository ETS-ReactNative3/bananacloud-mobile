import React, { useEffect, useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Modal,
} from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import IonIcons from 'react-native-vector-icons/Ionicons'

import { uploadFromCamera, uploadFromGallery, uploadImage } from '@utils/upload'
import { getPhotos } from '@utils/photos/getPhotos'

import { Button, Margin } from '@components/styled-components'
import Card from '@components/Card'

const Photos = () => {
    const { t } = useTranslation()

    const { width } = Dimensions.get('window')
    const userId = useSelector(state => state.user.user._id)

    const [listPhotos, setListPhotos] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    hydrateListPhotos = async () => {
        const list = await getPhotos(userId)
        setListPhotos(list)
    }

    useEffect(() => {
        hydrateListPhotos()
    }, [])

    const [uploading, setUploading] = useState(false)
    // const [transferred, setTransferred] = useState(0)

    const handleUploadFromCamera = async () => {
        const photo = await uploadFromCamera()
        if (photo) {
            setUploading(true)
            await uploadImage(photo, userId)
            setUploading(false)
            hydrateListPhotos()
        }
    }

    const handleUploadFromGallery = async () => {
        const photo = await uploadFromGallery()
        if (photo) {
            setUploading(true)
            await uploadImage(photo, userId)
            setUploading(false)
            hydrateListPhotos()
        }
    }

    return (
        <View style={{ flex: 1, position: 'relative' }}>
            {uploading && (
                <View>
                    <ActivityIndicator size={32} />
                    <Text style={{ textAlign: 'center' }}>{t('photos.uploadLoading')}</Text>
                </View>
            )}
            {listPhotos.length > 0 && (
                <FlatList
                    data={listPhotos}
                    numColumns={2}
                    renderItem={item => (
                        <View
                            style={{
                                width: width / 2,
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 20,
                            }}
                        >
                            <Card photo={item} />
                        </View>
                    )}
                    keyExtractor={item => item.path}
                />
            )}
            <View
                style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                }}
            >
                <Button icon="cloud-upload-outline" onPress={() => setModalVisible(true)} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{ position: 'absolute', top: 0, bottom: 0 }}
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            position: 'relative',
                            backgroundColor: '#ecf0f1',
                            padding: 50,
                            borderRadius: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <View style={{ position: 'absolute', top: 5, right: 5 }}>
                            <TouchableOpacity
                                icon="close-outline"
                                onPress={() => setModalVisible(false)}
                                style={{}}
                            >
                                <IonIcons name="close-outline" size={28} />
                            </TouchableOpacity>
                        </View>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={t('photos.uploadCamera')}
                                icon="camera-outline"
                                onPress={() => handleUploadFromCamera()}
                            />
                        </Margin>
                        <Margin mb={5} mt={5}>
                            <Button
                                title={t('photos.uploadGallery')}
                                icon="image-outline"
                                onPress={() => handleUploadFromGallery()}
                            />
                        </Margin>
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    )
}

export default Photos
