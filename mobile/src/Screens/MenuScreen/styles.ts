import { StyleSheet } from 'react-native'

import { colors, fonts } from '../../Theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.AppBackgroundColor,
        paddingTop: '5%',
        alignItems: 'center'
    },

    chatsArea: {
        width: '90%'
    },

    chatButton: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        marginTop: 10
    },

    selectedChatButton: {
        width: '100%',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        backgroundColor: '#ffffff10',
        marginTop: 10
    },

    chatNameSeparator: {
        backgroundColor: '#434344',
        height: 8,
        width: 8,
        borderRadius: 100,
        marginLeft: '5%',
        marginRight: '5%'
    },

    chatHash: {
        fontSize: 32,
        fontFamily: fonts.RubikBold,
        color: '#434344',
        marginRight: '3%'
    },

    chatName: {
        fontFamily: fonts.RubikMedium,
        color: colors.TextColor,
        fontSize: 20
    },
})