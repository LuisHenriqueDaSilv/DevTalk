import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

import { Overlay } from 'react-native-elements'

import { colors } from '../../Theme/Colors'

export function Loading() {

    return (
        <Overlay
            isVisible
            overlayStyle={styles.container}
        >
            <ActivityIndicator
                size="large"
                color={colors.Pink}
            />
        </Overlay>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        opacity: 0.8,
        elevation: 30,
    }
})