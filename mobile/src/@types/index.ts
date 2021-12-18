import React from 'react'

type UserType = {
    username: string,
    avatar_url: string,
    id: number,
    github_id: number,
    followers: string,
    repos: number 
}

type AuthContextDataType = {
    user: UserType | null,
    authorizationJwt: string,
    signIn: () => Promise<void>,
    signOut: () => Promise<void>
}

type ContextProviderParamsType = {
    children: React.ReactNode
}

type AuthorizationResponseType = {
    params: {
        code?: string
    }
}

type LoginWithGithubErrorResponseType = {
    response: {
        data: {
            error?: 'Bad Verification Code' | 'Something unexpected happened'
        }
    }
}

type LoginWithGithubSuccesType = {
    data: {
        authorization_jwt: string,
        user_infos: UserType
    }
}

type LoadingContextDataType = {
    enableLoading: () => void,
    disableLoading: () => void
}

type CodeAreaParams = {
    code: string,
    language: string
}

type ChatsContextDataType = {
    chats: ChatType[],
    replyingMessage: MessageType | null,
    hasSocketioConnection: boolean,
    currentChat: ChatType | null,
    disconnectSocketio: () => void,
    fetchMessages: () => void,
    makeSocketIoConnection: () => void,
    selectCurrentChat: (chat: ChatType) => void,
    selectReplyingMessage: (message:MessageType) => void,
    cancelReplyMessage: () => void
}

type MessageContentTextType = {
    type: 'text',
    text: string
}

type MessageContentCodeType = {
    type: 'code',
    code: string,
    language_name: string
}

type MessageType = {
    content: Array<MessageContentCodeType | MessageContentTextType>,
    id: number,
    author: UserType
    date: string,
    replying: {
        message: MessageType,
        author: UserType,
    } | false,
    files: {uri:string}[]
}

type ChatType = {
    image_url: string,
    name: string,
    aliase: string,
    id: number,
    messages: MessageType[]
}

type SocketServerMessageDataType = {
    message: {
        content: Array<MessageContentCodeType | MessageContentTextType>,
        chat_id: number,
        id: number,
        files: {uri:string}[]
    },
    author: UserType,
    date: string,
    replying: MessageType,
}

type HeaderPropsType = {
    title?: string
}

type UserPageProps = {
    route: {
        params: {
            user: UserType
        }
    }
}

export {
    HeaderPropsType,
    ChatType,
    UserType,
    MessageType,
    CodeAreaParams,
    AuthContextDataType,
    ChatsContextDataType,
    SocketServerMessageDataType,
    LoadingContextDataType, 
    ContextProviderParamsType,
    LoginWithGithubSuccesType,
    AuthorizationResponseType,
    LoginWithGithubErrorResponseType,
    UserPageProps
}