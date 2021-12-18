import React from 'react'
import { View, Text } from 'react-native'

import { styles } from './style'

export function SocketNotConnectedWarn(){

    return (
        <View style={styles.container}>

            <Text style={styles.text}>
                Connecting...
            </Text>
            
        </View>
    )
}