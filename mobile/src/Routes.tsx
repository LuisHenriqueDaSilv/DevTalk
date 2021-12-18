import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens
import { LandingScreen } from './Screens/LandingScreen'
import { ChatsScreen } from './Screens/ChatsScreen'
import { UserScreen } from './Screens/UserScreen'
import { MenuScreen } from './Screens/MenuScreen'

// Hooks
import { AuthProvider } from './Hooks/Auth'
import { LoadingProvider } from './Hooks/Loading'
import { ChatsProvider } from './Hooks/Chats'

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
    

    return (
        <NavigationContainer>
            <LoadingProvider>
                <AuthProvider>
                    <ChatsProvider>
                        <Navigator screenOptions={{ headerShown: false }}>
                            <Screen
                                name="LandingScreen"
                                component={LandingScreen}
                            />
                            <Screen
                                name="ChatsScreen"
                                component={ChatsScreen}
                            />

                            <Screen
                                name="UserScreen"
                                component={UserScreen}
                            />
                            <Screen
                                name="MenuScreen"
                                component={MenuScreen}
                            />

                        </Navigator>
                    </ChatsProvider>
                </AuthProvider>
            </LoadingProvider >
        </NavigationContainer>
    )

}