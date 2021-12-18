import React from 'react'
import { View } from 'react-native'

//Components
import { CodeArea } from '../../Components/CodeArea'
import { InfosCarousel } from './Components/InfosCarousel'

import { styles } from './styles'

// Images
import LogoClear from '../../Assets/Icons/LogoClear.svg'

export function LandingScreen(){

    return (
        <View style={styles.container}>

            <LogoClear
                style={styles.logoImage}
                width='50%'
                height='28%'
            />

            <CodeArea
                code={`The place to talk about \ntechnology with people who \nunderstand technology`}
                language='javascript'
            />

            <InfosCarousel/>

        </View>
    )
}