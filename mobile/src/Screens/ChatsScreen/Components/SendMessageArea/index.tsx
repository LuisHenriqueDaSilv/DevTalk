import React, { useState, useRef } from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Keyboard,
    Dimensions,
    Image
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';

// Themes
import { colors } from '../../../../Theme'
import { styles } from './styles'

// Hooks
import { useChatsContext } from '../../../../Hooks/Chats'
import { useAuthContext } from '../../../../Hooks/Auth'

// Services 
import { api } from '../../../../Services/Api'

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')

export function SendMessageArea() {

    const textInputRef = useRef(null)

    const [messageText, setMessageText] = useState<string>('')
    const [textInputAreaHeight, setTextInputAreaHeight] = useState(screenHeight * 0.06)
    const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false)
    const [uploadPercentage, setUploadPercentage] = useState<number>(0)
    const [imagesToSend, setImagesToSend] = useState<string[]>([])

    const {
        currentChat,
        replyingMessage,
        cancelReplyMessage
    } = useChatsContext()

    const {
        authorizationJwt,
        signOut
    } = useAuthContext()

    async function handleSendMessage() {

        if (!currentChat || !messageText) {
            return
        }

        setIsSendingMessage(true)

        const headers = {
            authorization: `Bearer ${authorizationJwt}`
        }

        const data = new FormData()
        data.append('content', messageText)
        if (replyingMessage) {
            data.append('replying', replyingMessage.id.toString())
        }

        imagesToSend.forEach((image: string, index: number) => {

            data.append(`image_${index}`, {
                name: `image_${index}.jpg`,
                type: "image/jpg",
                uri: image,
            } as any);

        })

        Keyboard.dismiss()

        function handleUploadProgess(event: any) {
            const percentage = event.loaded / event.total
            setUploadPercentage(percentage)
        }

        const response = await api.post(
            `/chat/${currentChat.id}/create_message`,
            data,
            {
                headers,
                onUploadProgress: handleUploadProgess
            }
        ).catch((error) => {

            if (error.response) {
                if (error.response.data.error === 'You must be logged to use this app') {
                    signOut()
                } else {
                    alert(error.response.data.error)
                }
            } else {
                alert('Error while connect in backend, try again later')
            }

            return false
        }) as any

        if (!response) {
            setIsSendingMessage(false)
            return
        }

        setMessageText('')
        setTextInputAreaHeight(screenHeight * 0.08)
        setIsSendingMessage(false)
        cancelReplyMessage()
        setUploadPercentage(0)
        setImagesToSend([])

    }

    async function selectImages() {

        if (imagesToSend.length >= 3) {
            alert('You only can  upload  3 images per message')
            return
        }

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        })

        if (result.cancelled) {
            return
        }

        const { uri: image } = result
        setImagesToSend([...imagesToSend, image])
    }

    function removeImageToSend(imageToDelete: string) {
        const newImagesData = imagesToSend.filter((image: string) => {
            return image !== imageToDelete
        })

        setImagesToSend(newImagesData)
    }

    function resizeTextInputHeight(e: any) {

        if (e.nativeEvent.contentSize.height.toFixed(2) > screenHeight * 0.27) {
            setTextInputAreaHeight(screenHeight * 0.27)
            return
        }
        setTextInputAreaHeight(e.nativeEvent.contentSize.height + screenHeight * 0.02)
    }

    return (
        <View style={styles.container}>

            {
                replyingMessage && (
                    <View style={styles.replyingMessageContainer}>

                        <Text style={styles.replyingText}>replying</Text>
                        <Text style={styles.replyingMessageAuthorName}>{replyingMessage.author.username}</Text>

                        <Image
                            style={styles.replyingMessageAuthorImage}
                            source={{ uri: replyingMessage.author.avatar_url }}
                        />

                        <Text style={styles.replyingText}>:</Text>

                        <View style={styles.replyingMessageContentContainer}>
                            {
                                replyingMessage.content.map((part, index) => {
                                    if (part.type == "code") {
                                        return (
                                            <Text
                                                style={styles.replyingMessageContentCode}
                                                key={index}
                                            > (CODE) </Text>
                                        )
                                    } else {
                                        return (
                                            <Text
                                                style={styles.replyingMessageContentText}
                                                key={index}
                                            > {part.text} </Text>
                                        )
                                    }
                                })
                            }
                        </View>

                        <TouchableOpacity
                            onPress={cancelReplyMessage}
                            style={styles.cancelReplyButton}
                        >
                            <FontAwesome
                                name="close"
                                size={19}
                                color="#ffffff"
                            />
                        </TouchableOpacity>

                    </View>
                )
            }

            {
                isSendingMessage && (
                    <View style={styles.messageSendingProgressBarContainer}>

                        <View
                            style={{
                                ...styles.messageSendingProgressBar,
                                width: screenWidth * uploadPercentage
                            }}
                        />

                    </View>
                )
            }


            {
                imagesToSend.length > 0 && (

                    <View style={styles.filesContainer}>
                        {
                            imagesToSend.map((imageUri: string, index: number) => {
                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => { removeImageToSend(imageUri) }}
                                    >
                                        <Image
                                            style={styles.imagePreview}
                                            source={{ uri: imageUri }}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                )
            }

            <View
                style={{
                    ...styles.textInputContainer,
                    height: textInputAreaHeight
                }}
            >

                <TouchableOpacity
                    style={styles.addFileButton}
                    onPress={selectImages}
                >
                    <Text style={styles.addFileText}>
                        +
                    </Text>
                </TouchableOpacity>

                <TextInput
                    ref={textInputRef}
                    value={messageText}
                    onChangeText={setMessageText}
                    style={styles.textInput}
                    onContentSizeChange={resizeTextInputHeight}
                    maxLength={3000}
                    multiline
                    editable={!isSendingMessage}
                />

                <TouchableOpacity
                    onPress={handleSendMessage}
                    style={styles.sendMessageButton}
                    disabled={isSendingMessage}
                >
                    <MaterialIcons
                        name="send"
                        size={32}
                        color={colors.TextColor}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )

}