import { StyleSheet , Dimensions} from 'react-native'

import { colors, fonts } from '../../Theme'

const { height: windowHeight} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: windowHeight * 0.09,
        left: 0,
        width: '100%',
        height: windowHeight * 0.04,
        backgroundColor: '#CC4A69',
        elevation: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    text: {
        color: colors.TextColor,
        fontFamily: fonts.FiraCodeMedium,
        fontSize: 16
    }
})