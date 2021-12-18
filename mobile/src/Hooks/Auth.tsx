import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

// Configs
import { config } from '../../config' 

import * as AuthSession from 'expo-auth-session'

// Services
import { api } from '../Services/Api'

// Types
import {
    UserType,
    AuthContextDataType,
    ContextProviderParamsType,
    AuthorizationResponseType,
    LoginWithGithubErrorResponseType,
    LoginWithGithubSuccesType
} from '../@types'

// Hooks
import { useLoadingContext } from './Loading'

const GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID
const GITHUB_AUTH_SCOPE = 'read:user'

const AuthContext = createContext({} as AuthContextDataType)

export function AuthProvider({ children }: ContextProviderParamsType) {

    const navigator = useNavigation()
    const { enableLoading, disableLoading } = useLoadingContext()

    const [user, setUser] = useState<UserType | null>(null)
    const [authorizationJwt, setAuthorizationJwt] = useState<string>('')

    useEffect(() => {

        async function fetchLocalData() {

            const localAuthorizationJwt = await AsyncStorage.getItem('@authorization_token')
            setAuthorizationJwt(localAuthorizationJwt || '')

            const localUserInfosJson = await AsyncStorage.getItem('@user_infos')
            if (localUserInfosJson) {
                const localUserInfosData = JSON.parse(localUserInfosJson)
                setUser(localUserInfosData)
            }

            if (localAuthorizationJwt) {
                navigator.navigate('ChatsScreen')
            }
        }

        fetchLocalData()

    }, [])

    useEffect(() => {
        if (!authorizationJwt) {
            navigator.navigate('LandingScreen')
        }
    }, [authorizationJwt])

    async function signIn() {

        enableLoading()

        const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=${GITHUB_AUTH_SCOPE}`
        const { params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponseType

        if (!params.code) {
            disableLoading()
            return
        }

        const loginFormData = new FormData()
        loginFormData.append('github_code', params.code)

        const response = await api.post(
            '/login/github',
            loginFormData
        ).catch((error: LoginWithGithubErrorResponseType) => {

            if (error.response) {
                alert(error.response.data.error)
            } else {
                alert('Error while connect in backend, try again later')
            }

            return false
        }) as LoginWithGithubSuccesType

        if (!response) {
            disableLoading()
            return
        }

        await AsyncStorage.setItem('@authorization_token', response.data.authorization_jwt)
        await AsyncStorage.setItem('@user_infos', JSON.stringify(response.data.user_infos))

        setUser(response.data.user_infos)
        setAuthorizationJwt(response.data.authorization_jwt)
        disableLoading()
        
        navigator.navigate('ChatsScreen')

    }


    async function signOut() {

        enableLoading()
        await AsyncStorage.clear()
        setAuthorizationJwt('')
        setUser(null)

        disableLoading()
    }

    return <AuthContext.Provider
        value={{
            signIn,
            signOut,
            user,
            authorizationJwt
        }}
    >
        {children}
    </AuthContext.Provider>

}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}
