import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import LoadingScr from './compo/LoadingScr'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import faker from 'faker';
import StoryAvator from './compo/StoryAvator';
import NewBigBox from './compo/NewsBigBox'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../firebaseConfig';
import LoadingPage from './compo/LoadingScr'


export default function HomeScreen({ navigation }) {
    const [isLoaded, setIsLoaded] = React.useState(false)
    const db = firebase.firestore();
    var un = firebase.auth().currentUser.email;

    React.useEffect(() => {
        const loadData = () => {
            db.collection("Accounts").doc(un.substring(0, un.search('@gmail.com'))).get().then(async (doc) => {
                if (doc.exists) {
                    try {
                        let value = JSON.stringify(doc.data())
                        await AsyncStorage.setItem('@userProfile', value).then(() => console.log('data saved in asyncStorage'))
                        setIsLoaded(true)
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
            <View style={{ backgroundColor: '#f1f1f1' }}>
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
                        {/* news card view */}
                        <View style={styles.newsCardBoxList}>
                            <NewBigBox
                                username={faker.name.firstName()}
                                avatorImg={faker.image.avatar()}
                                channelNews={faker.company.companyName()}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                                nav={navigation}
                            />
                            <NewBigBox
                                username={faker.name.firstName()}
                                avatorImg={faker.image.avatar()}
                                channelNews={faker.company.companyName()}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={faker.name.firstName()}
                                avatorImg={faker.image.avatar()}
                                channelNews={faker.company.companyName()}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={faker.name.firstName()}
                                avatorImg={faker.image.avatar()}
                                channelNews={faker.company.companyName()}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={faker.name.firstName()}
                                avatorImg={faker.image.avatar()}
                                channelNews={faker.company.companyName()}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
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
    }
})