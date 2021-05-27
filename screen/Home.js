import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import faker, { datatype } from 'faker';
import StoryAvator from './compo/StoryAvator';
import NewBigBox from './compo/NewsBigBox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebaseConfig';
import LoadingPage from './compo/LoadingScr'

var setArticleToLoad = 0;
var dataToPrint = [];
var isUserFollowing = false;
var userFollowing = [];

export default function HomeScreen({ navigation }) {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const db = firebase.firestore();
    var un = firebase.auth().currentUser.email;
    const renderItem = ({ item }) => (
        <NewBigBox
            username={item.user.username}
            fullArticle={item.post.Article}
            catagory={item.post.Category}
            newsImage={item.post.Image}
            newsHeading={item.post.Title}
            channelNews={item.user.name}
            avatorImg={item.user.avator}
            nav={navigation}
        />
    );

    React.useEffect(() => {
        const loadData = () => {
            db.collection("Accounts").doc(un.substring(0, un.search('@gmail.com'))).get().then(async (doc) => {
                if (doc.exists) {
                    userFollowing = doc.data().following;
                    let dataToStore = JSON.stringify(doc.data());
                    await AsyncStorage.setItem("@userProfile", dataToStore);
                    await console.log('data stored')
                    try {
                        console.log(userFollowing)
                        let dump = Object.getOwnPropertyNames(userFollowing);
                        for (var i = 0; i < dump.length; i++) {
                            console.log(userFollowing[i]);
                            await db.collection('Accounts').doc(userFollowing[i]).get().then(async (doc) => {
                                if (doc.exists) {
                                    let articles = doc.data().Articles;
                                    let articleToLoad = [articles, articles - 1];
                                    let userToLoad = userFollowing[i];
                                    for (var j = 0; j < 2; j++) {
                                        await db.collection('Accounts').doc(userToLoad).collection('Posts').doc(j.toString()).get().then(async (doc) => {
                                            if (doc.exists) {
                                                let postData = doc.data();
                                                
                                                
                                                setIsLoaded(true)
                                            } else {
                                                console.log('doc not found , user: ' + userToLoad + ' and posts ' + j);
                                                setIsLoaded(true)
                                            }
                                        })
                                    }
                                }
                            })
                        }
                    } catch (e) {
                        console.log('error: ' + e)
                    }

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
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
                        <Ionicons name="search-outline" size={24} color="black" />
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* story view */}
                        <View style={styles.storyLine}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                                <StoryAvator imageUrl={faker.image.avatar()} />
                            </ScrollView>
                        </View>
                    </ScrollView>
                    {/* news card view */}
                    <View style={styles.newsCardBoxList}>
                        <FlatList
                            data={dataToPrint}
                            renderItem={renderItem}
                            keyExtractor={item => dataToPrint.indexOf(item) + 1}
                        />
                    </View>
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