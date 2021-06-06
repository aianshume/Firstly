import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import StoryAvator from './compo/StoryAvator';
import NewBigBox from './compo/NewsBigBox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebaseConfig';
import LoadingPage from './compo/LoadingScr'

var setArticleToLoad = 0;
var isUserFollowing = false;
var userFollowing = [];
var userTempData = [];

// this line is used to check that all system are wrok or not
// anohter line

export default function HomeScreen({ navigation }) {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [dataToPrint, setDataToPrint] = React.useState([]);
    const [userFollow, setUserFollow] = React.useState([]);
    const db = firebase.firestore();
    var un = firebase.auth().currentUser.email;

    const loadPostsFromUserFollowing = async (followings) => {
        for (let i = 0; i < 5; i++) {
            await db.collection('Accounts').doc(followings[setArticleToLoad]).get().then(async (doc) => {
                if (doc.exists) {
                    let totalArticle = await doc.data().Articles;
                    let post = totalArticle-1;
                    let postLength = await doc.data().PostLength;

                    if (postLength == null){
                        console.log('user have no any post')
                    } else {
                        console.log('so the totalArticle ' + post)
                        console.log('article are not found when user is ' + followings[setArticleToLoad])
                        userTempData.push(doc.data().posts[post])
                        setDataToPrint(...dataToPrint, userTempData);
                    }

                    setUserFollow([...userFollow, {
                        Avator: doc.data().image,
                        Username: doc.data().username
                    }]);

                    setArticleToLoad = await setArticleToLoad + 1;
                } else {
                    console.log('user ' + followings[setArticleToLoad] + ' not found');
                }
            })
        }
    }

    React.useEffect(() => {
        const loadData = () => {
            // code stated working from here
            // and then goes to upper fuctions
            db.collection("Accounts").doc(un.substring(0, un.search('@gmail.com'))).get().then(async (doc) => {
                if (doc.exists) {
                    userFollowing = doc.data().following;
                    if (userFollowing) {
                        isUserFollowing = true;
                        console.log('user is following someone')
                    }
                    await loadPostsFromUserFollowing(userFollowing);
                    let dataToStore = JSON.stringify(doc.data());
                    await AsyncStorage.setItem("@userProfile", dataToStore);
                    await console.log('data stored')
                    await setIsLoaded(true);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    setIsLoaded(true);
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
        loadData();
    }, [])
    if (isLoaded == false) {
        return (<LoadingPage />)
    } else if (isLoaded == true) {
        return (
            <View>
                <SafeAreaView>
                    <StatusBar style='dark' />
                    <View style={styles.HeaderPart}>
                        <Text style={styles.homeheading}>Home</Text>
                        <Ionicons name="search-outline" size={24} color="black"  onPress= {()=> navigation.navigate('search')}/>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* story view */}
                        <View style={styles.storyLine}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {
                                    userFollow.map((item) => {
                                        return (
                                            <StoryAvator
                                                imageUrl={item.Avator}
                                                username={item.Username}
                                                key={userFollow.indexOf(item)}
                                            />
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                        {/* news card view */}
                        <View style={styles.newsCardBoxList}>
                            {
                                dataToPrint.map((item) => {
                                    return (
                                        <NewBigBox
                                            postData = {item}
                                            key = {dataToPrint.indexOf(item)}
                                            key2 = {dataToPrint.indexOf(item)}
                                            nav = {navigation}
                                        />
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    HeaderPart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 10
    },
    homeheading: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    storyLine: {
        flexDirection: 'row',
    },
    newsCardBoxList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 25,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 80,
    },
})