import { StyleSheet, Dimensions } from 'react-native'
const { width: windowWidth } = Dimensions.get("window")

import { colors, fonts } from '../../../../Theme'

export const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.SecondaryAppBackgroundColor,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '50%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
        
    },

    infoContainer: {
        flex: 1,
        padding: '6%',
        alignItems: 'center',
        justifyContent: 'center',
        width: windowWidth
    },

    infoImage: {
        maxHeight: '60%',
        maxWidth: '90%',
        resizeMode: 'contain',
        borderRadius: 10,
        overflow: 'hidden',
    },

    infoText: {
        textAlign: 'center',
        color: colors.TextColor,
        fontFamily: fonts.RubikBold,
        marginTop: '5%',
        fontSize: 16
    },

    infoIndexContainer: {
        position: 'absolute',
        bottom: '2%',
        height: windowWidth * 0.03,
        width: '30%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    infoIndexBall: {
        backgroundColor: colors.AppBackgroundColor,
        height: windowWidth * 0.03,
        width: windowWidth * 0.03,
        borderRadius: 200
    },

    currentInfoIndexBall: {
        backgroundColor: '#0A358C',
        height: windowWidth * 0.04,
        width: windowWidth * 0.04,
        borderRadius: 200,
        position: 'absolute',
        bottom: '2%'
    },

    loginWithGithubButton: {
        backgroundColor: '#161B22',
        width: '90%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexDirection: 'row'
    },
    
    loginText: {
        color: colors.TextColor,
        fontFamily: fonts.FiraCodeBold,
        fontSize: 16,
        margin: '2.5%'

    },

    loginButtonImage: {
        margin: '2.5%'
    }
    
})