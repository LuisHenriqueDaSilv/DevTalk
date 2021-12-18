import React, { 
    useEffect, 
    useState 
} from 'react'
import { 
    FlatList, 
    View, 
    Text,
    Dimensions,
    Animated,
    TouchableOpacity
} from 'react-native'


// Hooks 
import { useAuthContext } from '../../../../Hooks/Auth'

// Images
import GithubIcon from '../../../../Assets/Icons/Github.svg'
import ChatsThumbnail from '../../../../Assets/Prints/Chats.svg'
import CodeSnippetsThumbnail from '../../../../Assets/Prints/CodeSnippets.svg'

import { styles } from './styles'

// Interfaces
type infoInterface = {
    Thumbnail?: any,
    text?: string | null,
    login?: boolean,
    infoIndex?: number
}

const { width: windowWidth, height: windowHeight } = Dimensions.get("window")

const infosArray: infoInterface[]  = [
    {
        Thumbnail: ChatsThumbnail,
        text: 'Talk about the most popular programming languages in separated chats',
    },
    {
        Thumbnail: CodeSnippetsThumbnail,
        text: 'Send snippets of your code so that everyone can read',
    },
    {
        login: true,
    }
]

function LoginCamp(){

    const { signIn } = useAuthContext()

    return ( 
        <View style={styles.infoContainer}>

            <TouchableOpacity
                onPress={signIn}
                style={styles.loginWithGithubButton}
            >
                
                <GithubIcon 
                    style={styles.loginButtonImage}
                    width={windowHeight * 0.05}
                    height={windowHeight * 0.05}
                />
                <Text style={styles.loginText}>Login with github</Text>

            </TouchableOpacity>

        </View>
    )

}

function InfoCamp(info: infoInterface){
    
    const { Thumbnail, text, login } = info
    if(!Thumbnail || login){
        return ( <LoginCamp/> )
    }
    
    return (
        <View style={styles.infoContainer}>

            <Thumbnail
                style={styles.infoImage}
            />
            <Text style={styles.infoText}>{text}</Text>

        </View>
    )

}

export function InfosCarousel(){

    const [currentInfoIndexBallPosition] = useState(new Animated.Value(
        (windowWidth * 0.37)  - windowWidth * 0.02)
    )

    const [currentInfoIndex, setCurrentInfoIndex] = useState<number>(0)
    
    useEffect(() => {
        
        Animated.timing(
            currentInfoIndexBallPosition,
            {
                toValue: (
                    (
                        windowWidth * (
                            0.37 + currentInfoIndex * 0.13
                        )
                    )  - windowWidth * 0.02
                ),
                duration: 150,
                useNativeDriver: false
            }
        ).start()

    }, [currentInfoIndex])

    function handleScroll(event:any){

        const index = Math.ceil(
            event.nativeEvent.contentOffset.x / windowWidth 
        )
        setCurrentInfoIndex(index)
    }

    return (
        <>

            <FlatList
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                
                data={infosArray}
                renderItem={({item, index}:any)=> {

                    return <InfoCamp
                        infoIndex={index}
                        Thumbnail={item.Thumbnail}
                        text={item.text}
                        login={item.login}
                    />
                }}
                keyExtractor={(item, index) => index.toString()}
                onScroll={handleScroll}

                style={styles.container}
            />

            <View style={styles.infoIndexContainer}>
                {
                    infosArray.map((_, index) => {
                        return (
                            <View
                                key={index} 
                                style={styles.infoIndexBall}
                            />
                        )
                    })
                }
            </View>

            <Animated.View 
                style={{
                    ...styles.currentInfoIndexBall,
                    left: currentInfoIndexBallPosition,
                }}
            />

        </>
    )
}