import React, {
    useContext,
    createContext,
    useState,
    useEffect
} from 'react'
import socketIo from 'socket.io-client'
import { config } from '../../config'

// Types
import {
    ContextProviderParamsType,
    ChatsContextDataType,
    ChatType,
    SocketServerMessageDataType,
    MessageType,
} from '../@types'

// Services
import { api } from '../Services/Api'

// Hooks
import { useAuthContext } from './Auth'
import { useLoadingContext } from './Loading'

// Socket.IO
let socketIoClient: any = null
let messagesQueue = [] as SocketServerMessageDataType[]

const ChatsContext = createContext({} as ChatsContextDataType)

export function ChatsProvider({ children }: ContextProviderParamsType) {

    const { signOut, authorizationJwt } = useAuthContext()
    const { enableLoading, disableLoading } = useLoadingContext()


    const [chats, setChats] = useState<ChatType[]>([])
    const [currentChat, setCurrentChat] = useState<ChatType | null>(null)
    const [lastMessageTime, setLastMessageTime] = useState(new Date())

    const [replyingMessage, setReplyingMessage] = useState<MessageType | null>(null)
    
    const [hasSocketioConnection, setHasSocketioConnection] = useState<boolean>(false)

    const [fetchingMessages, setFetchingMessages] = useState<boolean>(false)
    const [
        hasMessagesToBeFetchedInCurrentChat,
        sethasMessagesToBeFetchedInCurrentChat
    ] = useState<boolean>(true)


    useEffect(() => {

        if (messagesQueue.length > 0) {

            let newChatsData = [...chats] as ChatType[]

            messagesQueue.map((message, index) => {

                const chatsWithCurrentMessage = [] as ChatType[]

                newChatsData.map((chat) => {

                    if (chat.id == message.message.chat_id) {

                        const messageData = {
                            content: message.message.content,
                            id: message.message.id,
                            author: message.author,
                            date: message.date,
                            replying: message.replying as any,
                            files: message.message.files
                        } as MessageType
                        chat.messages.push(messageData)

                        chat.messages = chat.messages.sort((a, b) => {
                            if (a.id > b.id) {
                                return 1
                            } else {
                                return -1
                            }
                        })
                    }

                    chatsWithCurrentMessage.push(chat)

                })
                newChatsData = chatsWithCurrentMessage

                delete (messagesQueue[index])

            })

            setChats(newChatsData)
        }


    }, [lastMessageTime])


    useEffect(() => {

        if (!authorizationJwt && socketIoClient) {
            disconnectSocketio()
            setChats([])
            setCurrentChat(null)
        }

    }, [authorizationJwt])

    useEffect(() => {
        sethasMessagesToBeFetchedInCurrentChat(true)
    }, [currentChat?.id])

    function handleNewMessage(data: SocketServerMessageDataType) {
        messagesQueue.push(data)
        setLastMessageTime(new Date())
    }

    async function selectCurrentChat(chat: ChatType) {
        setCurrentChat(chat)
    }

    async function selectReplyingMessage(message: MessageType) {
        setReplyingMessage(message)
    }

    async function cancelReplyMessage() {
        setReplyingMessage(null)
    }

    async function disconnectSocketio() {
        socketIoClient?.disconnect()
        socketIoClient = null
    }

    async function fetchMessages() {

        if (
            !hasMessagesToBeFetchedInCurrentChat ||
            !currentChat ||
            fetchingMessages
        ) {
            return
        }

        enableLoading()
        setFetchingMessages(true)

        const start_param = currentChat?.messages.length || 0
        const response = await api.get(
            `/chat/${currentChat?.id}/messages?start=${start_param}`,
            {
                headers: {
                    authorization: `Bearer ${authorizationJwt}`
                }
            }
        ).catch((error) => {

            if (error.response) {
                if (error.response.data.error === 'You must be logged to use this app') {
                    signOut()
                }
            } else {
                alert('Error while connect in backend, try again later')
            }

            return false
        }) as any

        if (!response) {
            sethasMessagesToBeFetchedInCurrentChat(false)
            disableLoading()
            setFetchingMessages(false)
            return
        }

        messagesQueue = messagesQueue.concat(response.data)

        setLastMessageTime(new Date())
        setFetchingMessages(false)
        disableLoading()
    }

    async function fetchChats() {
        
        const response = await api.get(
            '/chats/list',
            {
                headers: {
                    authorization: `Bearer ${authorizationJwt}`
                }
            }
        ).catch((error) => {

            if (error.response) {
                if (error.response.data.error == 'You must be logged to use this app') {
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
            return
        }

        const responseData = response.data as ChatType[]
        setChats(responseData)
        setCurrentChat(responseData[0])

    }

    async function makeSocketIoConnection() {

        if (socketIoClient) {
            disconnectSocketio()
        }

        socketIoClient = await socketIo.connect(
            config.BACKEND_URL,
            {
                query: {
                    'authorization': `Bearer ${authorizationJwt}`
                }
            }
        )

        await fetchChats()

        // Socket events handler's set
        socketIoClient.on('connect', () => { setHasSocketioConnection(true) })
        socketIoClient.on('reconnect', () => { setHasSocketioConnection(true) })
        socketIoClient.on('disconnect', () => { setHasSocketioConnection(false) })
        socketIoClient.on('chat_message', handleNewMessage)
    }

    return (
        <ChatsContext.Provider
            value={{
                chats,
                currentChat,
                selectCurrentChat,
                makeSocketIoConnection,
                hasSocketioConnection,
                disconnectSocketio,
                fetchMessages,
                selectReplyingMessage,
                replyingMessage,
                cancelReplyMessage
            }}
        >
            {children}
        </ChatsContext.Provider>
    )
}

export function useChatsContext() {
    const context = useContext(ChatsContext)
    return context
}
