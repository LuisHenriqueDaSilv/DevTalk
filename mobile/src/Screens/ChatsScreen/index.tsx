import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    BackHandler,
    Text,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ImageView from 'react-native-image-viewing'

// Hooks 
import { useChatsContext } from '../../Hooks/Chats'

// Components
import { Header } from '../../Components/Header'
import { SocketNotConnectedWarn } from '../../Components/SocketNotConnectedWarn'
import { SendMessageArea } from './Components/SendMessageArea'
import { CodeArea } from '../../Components/CodeArea'

// Types
import { MessageType, UserType } from '../../@types'

import { styles } from './styles'
import { Loading } from '../../Components/Loading'

export function ChatsScreen() {

    const scrollViewRef = useRef(null) as any
    const navigator = useNavigation()
    const {
        currentChat,
        makeSocketIoConnection,
        hasSocketioConnection,
        disconnectSocketio,
        fetchMessages,
        selectReplyingMessage,
    } = useChatsContext()


    const [imagesInFullScreen, setImagesInFullScreen] = useState<{uri:string}[]>([])

    useEffect(() => {

        makeSocketIoConnection()

        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })

        return () => { disconnectSocketio }
    }, [])

    useEffect(() => {
        if (!currentChat) {
            return
        }
        if (currentChat.messages.length < 30) {
            fetchMessages()
        }
    }, [currentChat])

    function goToUserPage(user: UserType) {
        navigator.navigate('UserScreen', {
            user
        })
    }

    function detectScrollAtEndInScrollView(event: any) {
        const yPosition = event.nativeEvent.contentOffset.y;
        if (yPosition === 0) {
            fetchMessages()
        }
    }

    function closeImageInFullScreen(){
        setImagesInFullScreen([])
    }

    function handlePressMessage(message: MessageType) {
        selectReplyingMessage(message)
    }

    if (!currentChat) {
        return <Loading />
    }

    return (
        <View style={styles.container}>

            {
                imagesInFullScreen.length > 0 && (
                    <ImageView
                        images={imagesInFullScreen}
                        onRequestClose={closeImageInFullScreen}
                        visible={true}
                        imageIndex={0}
                        animationType='fade'
                    />
                )
            }

            {
                !hasSocketioConnection && <SocketNotConnectedWarn />
            }

            <Header title={currentChat.name} />

            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                onScroll={detectScrollAtEndInScrollView}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    scrollViewRef.current?.scrollTo({
                        y: contentHeight,
                        animated: true,
                    })
                }}
            >

                {
                    currentChat.messages.map((message, index) => {

                        return (
                            <TouchableOpacity
                                key={message.id}
                                style={styles.messageContainer}
                                onLongPress={() => { handlePressMessage(message) }}
                                delayLongPress={300}
                            >

                                {
                                    message.replying && (
                                        <>
                                            <View 
                                                style={{
                                                    ...styles.replyingMessageContainer,
                                                    backgroundColor: '#342E20'
                                                }}
                                            >

                                                <Text style={styles.replyingText}>replying</Text>
                                                <Text style={styles.replyingMessageAuthorName}>LuisHenriqueDaSilv</Text>
                                                <Image
                                                    style={styles.replyingMessageAuthorImage}
                                                    source={{ uri: message.author.avatar_url }}
                                                />
                                                <Text style={styles.replyingText}>:</Text>

                                                <View style={styles.replyingMessageContentContainer}>
                                                    {
                                                        message.replying.message.content.map((part, index) => {
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

                                            </View>
                                        </>
                                    )
                                }

                                <View style={styles.messageArea}>

                                    <TouchableOpacity
                                        onPress={() => { goToUserPage(message.author) }}
                                    >
                                        <Image
                                            source={{
                                                uri: message.author.avatar_url
                                            }}
                                            style={styles.messageAuthorImage}
                                        />
                                    </TouchableOpacity>

                                    <View>

                                        <TouchableOpacity
                                            onPress={() => { goToUserPage(message.author) }}
                                            style={styles.messageInfosArea}
                                        >
                                            <Text style={styles.messageAuthorUsername}>
                                                {message.author.username}
                                            </Text>
                                            <Text style={styles.messageDate}>
                                                {message.date}
                                            </Text>
                                        </TouchableOpacity>

                                        <View>
                                            {
                                                message.content.map((messagePart, index) => {

                                                    if (messagePart.type == 'code') {
                                                        return (
                                                            <CodeArea
                                                                key={index / 0.1}
                                                                code={messagePart.code}
                                                                language={messagePart.language_name}
                                                            />
                                                        )
                                                    } else {
                                                        return (
                                                            <Text
                                                                key={index / 0.1}
                                                                style={styles.messageContent}
                                                            >
                                                                {messagePart.text}
                                                            </Text>
                                                        )
                                                    }

                                                })
                                            }
                                        </View>

                                    </View>
                                    
                                </View>

                                {
                                    message.files.length > 0 && (
                                        <View style={styles.imagesContainer}>
                                            {
                                                message.files.map((file) => {
                                                    return (
                                                        <TouchableOpacity 
                                                            key={file.uri}
                                                            onPress={() => {setImagesInFullScreen(message.files)}}
                                                        >
                                                            <Image
                                                                source={{uri: file.uri}}
                                                                style={styles.messageImage}
                                                            />
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                }

                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>

            <SendMessageArea />

        </View>
    )
}