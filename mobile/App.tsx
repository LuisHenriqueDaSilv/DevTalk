import React from 'react'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'

import { colors } from './src/Theme'

// Fonts
import {
    useFonts,
    Rubik_300Light,
    Rubik_400Regular,
    Rubik_500Medium,
    Rubik_700Bold,
} from '@expo-google-fonts/rubik'
import {
    FiraCode_300Light,
    FiraCode_500Medium,
    FiraCode_700Bold
} from '@expo-google-fonts/fira-code'

import { Routes } from './src/Routes'

export default function App() {

    const [fontsLoaded] = useFonts({
        Rubik_300Light,
        Rubik_400Regular,
        Rubik_500Medium,
        Rubik_700Bold,
        FiraCode_300Light,
        FiraCode_500Medium,
        FiraCode_700Bold
    })

    if (!fontsLoaded) {
        return (
            <AppLoading />
        )
    }

    return (
        <>
            <StatusBar
                translucent={false}
                style="light"
                backgroundColor={colors.SecondaryAppBackgroundColor}
            />
            <Routes />
        </>
    )
}