import { StyleSheet } from 'react-native'
import { colors, fonts } from '../../Theme'

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: 5,
        backgroundColor: colors.SecondaryAppBackgroundColor,
        width: '90%'
    },

    codeLinesArea: {
        borderRightWidth: 2.5,
        borderColor: colors.AppBackgroundColor,
        width: '10%',
        alignItems: 'center',
        marginTop: 1,
    },

    lineNumber: {
        marginTop: 8,
        color: `${colors.TextColor}50`,
        fontFamily: fonts.RubikMedium,
        fontSize: 16,
        marginBottom: -5.39,
    },

    codeArea: {
        width: '90%',
        backgroundColor: '#00000000'
    }
})