import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import { SvgUri } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'

import { styles } from './styles'

// Hooks
import { useChatsContext } from '../../Hooks/Chats'

// Components
import { CodeArea } from '../../Components/CodeArea'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Types
import { ChatType } from '../../@types'

export function MenuScreen(){

    const { chats, currentChat, selectCurrentChat } = useChatsContext()
    const navigator = useNavigation()

    function handleSelectChat(chat:ChatType){
        selectCurrentChat(chat)

        navigator.navigate('ChatsScreen')
    }

    return (
        <View style={styles.container}>

            <CodeArea
                code={`The place to talk about \ntechnology with people who \nunderstand technology`}
                language="javascript" 
            />

            <ScrollView style={styles.chatsArea}>

                {
                    chats.map((chat, index) => {
                        return (

                            <TouchableOpacity 
                                key={index}
                                onPress={() => {handleSelectChat(chat)}}
                                style={
                                    chat.id === currentChat?.id? (
                                        styles.selectedChatButton
                                    ) : (
                                        styles.chatButton
                                    )
                                }
                            >

                                <Text style={styles.chatHash}>#</Text>

                                <SvgUri
                                    fill="#444444"
                                    height={30}
                                    width={30}
                                    uri={chat.image_url}
                                />

                                <View style={styles.chatNameSeparator}/>

                                <Text style={styles.chatName}>{chat.name}</Text>
                                
                            </TouchableOpacity>

                        )
                    })
                }
                
            </ScrollView>
        </View>
    )
}