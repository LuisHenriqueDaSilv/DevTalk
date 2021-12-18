import { StyleSheet, Dimensions } from 'react-native'
import { colors, fonts } from '../../Theme'

const { height: windowHeight } = Dimensions.get("window");


export const styles = StyleSheet.create({
    
    container: {
        backgroundColor: colors.SecondaryAppBackgroundColor,
        padding: '4%',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: windowHeight * 0.09,
        borderBottomRightRadius: 7,
        borderBottomLeftRadius: 7,
        top: 0,
        left: 0,
        flexDirection: 'row',
        elevation: 1,
    },

    userImage: {
        height: windowHeight * 0.07,
        width: windowHeight * 0.07,
        borderRadius: 200
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    title: {
        color: '#C9CACC',
        fontFamily: fonts.RubikBold,
        fontSize: 20
    },

    chatTitleHash: {
        color: '#434344',
        fontFamily: fonts.RubikBold,
        fontSize: 27,
        margin: 2
    },

    button: {
        height: windowHeight * 0.07,
        width: windowHeight * 0.07,
        alignItems: 'center',
        justifyContent: 'center'
    }
})