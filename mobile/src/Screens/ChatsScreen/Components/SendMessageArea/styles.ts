import { StyleSheet, Dimensions } from 'react-native'

import { colors, fonts} from '../../../../Theme'

const {height:screenHeight, width:screenWidth} = Dimensions.get('screen')


export const styles = StyleSheet.create({
    
    container: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'flex-end',
        width: '100%'
    },
    
    textInputContainer: {
        minHeight: screenHeight * 0.08,
        maxHeight: screenHeight * 0.3,
        width: '100%',
        backgroundColor: colors.SecondaryAppBackgroundColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 7
    },
    
    textInput: {
        backgroundColor: '#DFDFDF',
        width: screenWidth * 0.75,
        fontSize: 20,
        fontFamily: fonts.RubikMedium,
        padding: 5,
        color: colors.AppBackgroundColor,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        height: '100%'
    },
    
    addFileText: {
        fontFamily: fonts.RubikBold,
        color: colors.Pink,
        fontSize: 40,
    },
    
    addFileButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    
    sendMessageButton: {
        backgroundColor: colors.AppBackgroundColor,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth * 0.11,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },

    replyingMessageContainer: {
        width: '100%',
        backgroundColor: colors.Pink,
        height: screenHeight * 0.04,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 5,
        alignItems: 'center',
        flexDirection: 'row'
    },

    replyingText: {
        color: '#ffffff',
        fontFamily: fonts.FiraCodeBold,
        fontSize: 12,
    },

    replyingMessageAuthorName: {
        color: '#434344',
        fontFamily: fonts.FiraCodeBold,
        fontSize: 12,
        marginLeft: 3,
        marginRight: 3
    },

    replyingMessageAuthorImage: {
        height: '90%',
        aspectRatio: 1/1,
        borderRadius: 100
    },

    cancelReplyButton: {
        height: '95%',
        aspectRatio: 1/1,
        borderRadius: 5,
        backgroundColor: colors.AppBackgroundColor,
        position: 'absolute',
        right: 5,
        alignItems: 'center',
        justifyContent: 'center'
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

    messageSendingProgressBarContainer: {
        width: '100%',
        height: 5,
        backgroundColor: colors.TextColor
    },
    
    messageSendingProgressBar: {
        height: 5,
        backgroundColor: colors.TextColor
    },

    filesContainer: {
        width: '100%',
        height: screenHeight * 0.08,
        backgroundColor: colors.SecondaryAppBackgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '5%',
        paddingRight: '5%',
        borderTopColor: colors.Pink,
        borderTopWidth: 1,
        paddingTop: 5
    },

    imagePreview: {
        height: '90%',
        aspectRatio: 1/1,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.Pink,
        margin: 5
    }

})