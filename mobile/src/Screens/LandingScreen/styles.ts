import { StyleSheet } from 'react-native'
import {colors} from '../../Theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.AppBackgroundColor,
    },

    logoImage: {
        aspectRatio: 1/1,
        marginTop: '5%',
        marginBottom: '3%'
    }
}) 