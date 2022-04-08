import { View, Text } from 'react-native'
import React from 'react'

const PickerMode = () => {
    return (
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
    )
}

export default PickerMode
