import React from 'react'
import { View, Text } from 'react-native'

import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/src/styles/hljs'

// Interfaces
import { CodeAreaParams } from '../../@types'

import { styles } from './styles'
import { fonts } from '../../Theme'

export function CodeArea({ code, language }: CodeAreaParams) {

    const codeLines = code.split('\n')

    return (
        <View
            style={{
                ...styles.container,
            }}
        >

            <View
                style={styles.codeLinesArea}
            >
                {
                    codeLines.map((line, index) => {
                        index = index + 1 // To not start with 0
                        return (
                            <Text
                                style={styles.lineNumber}
                                key={index}
                            >
                                {index.toString().length == 2 ? index : `0${index}`}
                            </Text>
                        )
                    })
                }
            </View>

            <SyntaxHighlighter
                highlighter={"hljs"}
                fontSize={16.5}
                language={language}
                style={darcula}
                fontFamily={fonts.RubikRegular}
                customStyle={styles.codeArea}
            >
                {code}
            </SyntaxHighlighter>

        </View>
    )
}