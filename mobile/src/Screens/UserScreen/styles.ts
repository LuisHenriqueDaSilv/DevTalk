import { StyleSheet } from 'react-native'

import { colors, fonts } from '../../Theme'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.AppBackgroundColor
    },

    imageContainer: {
        width: '100%',
        aspectRatio: 1/1,
        justifyContent: 'flex-end'
    },

    userImage: {
        width: '100%',
        aspectRatio: 1/1,
        position: 'absolute',
    },

    backButton: {
        position: 'absolute',
        bottom: '2%',
        left: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '13%',
        aspectRatio: 1/1,
        backgroundColor: colors.SecondaryAppBackgroundColor,
        borderRadius: 200,
    },

    username: {
        margin: '3%',
        alignSelf: 'center',
        color: colors.TextColor,
        fontFamily: fonts.RubikBold,
        fontSize: 25
    },

    imageGradient: {
        height: '30%',
        justifyContent: 'center'
    },

    goToGitubButton: {
        width: '90%',
        backgroundColor: '#161B22',
        alignSelf: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        height: '8%',
        marginTop: '13%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    githubIcon: {
        aspectRatio: 1/1,
        margin: '5%'
    },

    loginText: {
        color: colors.TextColor,
        fontFamily: fonts.RubikBold,
        fontSize: 17
    },

    logoutButton: {
        position: 'absolute',
        bottom: '3%',
        alignSelf: 'center',
        width: '20%',
        height: '5%',
        borderRadius: 5,
        backgroundColor: colors.SecondaryAppBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoutText: {
        fontFamily: fonts.FiraCodeBold,
        fontSize: 16,
        color: colors.TextColor
    },

    infosContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '-7%'
    },

    info: {
        color: colors.TextColor,
        fontFamily: fonts.RubikLight,
        fontSize: 15
    },

    infoTitle: {
        fontFamily: fonts.RubikBold
    }
})