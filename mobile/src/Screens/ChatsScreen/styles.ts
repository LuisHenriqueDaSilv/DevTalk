import { StyleSheet, Dimensions } from 'react-native'

import { colors, fonts } from '../../Theme'

const { height: screenHeight, width: screenWidth } = Dimensions.get('screen')

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.AppBackgroundColor
    },

    messagesContainer: {
        flex: 1,
        marginBottom: screenHeight * 0.09,
    },

    messageContainer: {
        flexDirection: 'column'
    },

    messageArea: {
        padding: '2%',
        flexDirection: 'row'
    },

    replyingMessageContainer: {
        height: screenHeight * 0.04,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderRadius: 5,
        borderColor: colors.SecondaryAppBackgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5
    },

    replyingMessageAuthorName: {
        color: '#434344',
        fontFamily: fonts.FiraCodeBold,
        fontSize: 12,
        marginLeft: 3,
        marginRight: 3
    },

    replyingText: {
        color: '#ffffff',
        fontFamily: fonts.FiraCodeBold,
        fontSize: 12,
    },

    replyingMessageContentContainer: {
        flexDirection: 'row'
    },

    replyingMessageContentCode: {
        color: 'cyan',
        fontFamily: fonts.FiraCodeBold,
    },

    replyingMessageContentText: {
        fontFamily: fonts.FiraCodeMedium,
        color: '#ffffff'
    },

    replyingMessageAuthorImage: {
        height: screenHeight * 0.03,
        aspectRatio: 1 / 1,
        borderRadius: 100
    },

    messageAuthorImage: {
        height: screenHeight * 0.06,
        borderRadius: 100,
        aspectRatio: 1 / 1,
        marginRight: 10
    },


    messageAuthorUsername: {
        fontFamily: fonts.FiraCodeBold,
        color: '#434343',
        fontSize: 17
    },

    messageContent: {
        color: colors.TextColor,
        fontFamily: fonts.FiraCodeMedium,
        fontSize: 15,
        marginLeft: 7,
        marginRight: screenWidth * 0.15
    },

    messageInfosArea: {
        flexDirection: 'column',
    },

    messageDate: {
        color: '#212121',
        marginTop: -3,
        marginLeft: 5,
        fontSize: 13
    },

    messageImage: {
        width: '100%',
        minHeight: screenHeight * 0.2,
        maxHeight: screenHeight * 0.4,
        borderRadius: 5,
        marginBottom: screenHeight * 0.01,
        resizeMode: 'center'
    },

    imagesContainer: {
        width: '80%',
        alignSelf: 'center'
    }

})