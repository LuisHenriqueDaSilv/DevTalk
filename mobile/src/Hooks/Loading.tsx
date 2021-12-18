import React, {
    createContext,
    useContext,
    useState
} from 'react'

// Components
import { Loading } from '../Components/Loading'

// Types
import {
    LoadingContextDataType,
    ContextProviderParamsType
} from '../@types'

const LoadingContext = createContext({} as LoadingContextDataType)
export function LoadingProvider({ children }: ContextProviderParamsType) {

    const [loading, setLoading] = useState<boolean>(false)

    function disableLoading() {
        setLoading(false)
    }

    function enableLoading() {
        setLoading(true)
    }

    return (
        <LoadingContext.Provider
            value={{
                disableLoading,
                enableLoading
            }}
        >

            {
                loading && <Loading />
            }

            {children}
            
        </LoadingContext.Provider>
    )
}

export function useLoadingContext() {
    const context = useContext(LoadingContext)
    return context
}