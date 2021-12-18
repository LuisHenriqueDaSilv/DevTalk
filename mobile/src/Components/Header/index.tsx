import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Hooks 
import { useAuthContext } from '../../Hooks/Auth'


// Types 
import { HeaderPropsType } from '../../@types'

import { styles } from './styles'

export function Header({ title }: HeaderPropsType) {

    const navigator = useNavigation()
    const { user } = useAuthContext()

    function handleGoToUserScreen() {
        navigator.navigate('UserScreen', {
            user
        })
    }

    function handleToMenuScreen() {
        navigator.navigate('MenuScreen')
    }

    return (
        <View style={styles.container}>

            {/*Use userImage styles to have the same width*/}
            <View style={styles.userImage} />

            <TouchableOpacity
                onPress={handleToMenuScreen}
                style={styles.titleContainer}
            >
                <Text style={styles.chatTitleHash}>#</Text>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleGoToUserScreen}
            >
                <Image
                    style={styles.userImage}
                    source={{
                        uri: user?.avatar_url
                    }}
                />
            </TouchableOpacity>

        </View>
    )
}