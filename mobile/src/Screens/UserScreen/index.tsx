import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking
} from 'react-native'

// Images
import GithubIcon from '../../Assets/Icons/Github.svg'

// Hooks
import { useAuthContext } from '../../Hooks/Auth'

// Types
import { UserPageProps } from '../../@types'

import { styles } from './styles'

export function UserScreen({ route }:UserPageProps) {

    const { user } = route.params

    const navigator = useNavigation()
    const {signOut, user:localUser} = useAuthContext()

    function goToGithub(){
        Linking.openURL(`https://github.com/${user.username}`)
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigator.goBack()}
            >
                <AntDesign
                    name="back"
                    size={27}
                    color="#818182"
                />
            </TouchableOpacity>

            <View style={styles.imageContainer}>

                <Image
                    style={styles.userImage}
                    source={{
                        uri: user?.avatar_url
                    }}
                />

                <LinearGradient
                    colors={[
                        `transparent`,
                        `rgba(14, 14, 14, 0.80)`,
                        `rgba(14, 14, 14, 0.98)`,
                        `rgba(14, 14, 14, 1)`,
                    ]}
                    style={styles.imageGradient}
                >

                    <Text style={styles.username}>
                        {user?.username}
                    </Text>

                </LinearGradient>

            </View>

            <View style={styles.infosContainer}>

                <Text style={styles.info}>
                    <Text style={styles.infoTitle}>Followers: </Text> 
                    {user.followers}
                </Text>

                <Text style={styles.info}>
                    <Text style={styles.infoTitle}>Repos: </Text> 
                    {user.repos}
                </Text>

                <Text style={styles.info}>
                    <Text style={styles.infoTitle}>ID: </Text> 
                    {user.id}
                </Text>
                
            </View>

            <TouchableOpacity 
                style={styles.goToGitubButton}
                onPress={goToGithub}
            >

                <GithubIcon
                    style={styles.githubIcon}
                    width='12%'
                />

                <Text style={styles.loginText}>
                    Go to github profile
                </Text>

            </TouchableOpacity>
            
            {
                localUser?.id === user.id && (
                    <TouchableOpacity 
                        style={styles.logoutButton}
                        onPress={signOut}
                    >

                        <Text style={styles.logoutText}>
                            Logout
                        </Text>
                        
                    </TouchableOpacity>
                )
            }

        </View>
    )
}