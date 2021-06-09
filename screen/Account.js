import React, { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../firebaseConfig'
import NewBigBox from './compo/NewsBigBox'
import faker from 'faker'
import { StatusBar } from 'expo-status-bar';
import LoadingPage from './compo/LoadingScr'
import AsyncStorage from '@react-native-async-storage/async-storage';

// there is some eror in this page

const Account = ({ navigation }) => {
    const [userDetails, setUserDetails] = useState({
        name: 'data',
        image: 'https://user-images.githubusercontent.com/68537640/118956405-32d80300-b97d-11eb-8bf2-74e34268ab87.png',
    })
    const [isLoaded, setIsLoaded] = useState(false)

    const logout = async () => {
        await firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                alert('error in logout')
            } else if (!user) {
                navigation.navigate('Login')
            }
        })
    }

    useEffect(() => {
        const loadData = async()=> {
            await AsyncStorage.getItem('@userProfile')
            .then(doc=>{
                let jsonData = JSON.parse(doc);
                setUserDetails(jsonData)
                setIsLoaded(true)
            })
        }
        loadData();
    }, [])

    if (!isLoaded) {
        return (<LoadingPage />)
    } else if (isLoaded == true) {
        return (
            <View>
                <StatusBar style='dark' />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={styles.fullBox}>
                        <View style={styles.headerSection}>
                            <Ionicons onPress={() => navigation.goBack()} name="arrow-back-sharp" size={25} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Profile</Text>
                            <Text />
                        </View>
                        <View>
                            <View style={styles.imageAndName}>
                                <Image source={{ uri: userDetails.image }} style={styles.userImage} />
                                <Text style={styles.channelName}>{userDetails.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        paddingTop: 15,
                                        paddingBottom: 15,
                                        backgroundColor: '#111820',
                                        borderRadius: 10,
                                        marginTop: 10
                                    }} onPress={() => navigation.navigate('editProfile', {
                                        userState: userDetails
                                    })}>
                                        <Text style={{ color: '#f1f1f1' }}>Edit Profile</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        paddingTop: 15,
                                        paddingBottom: 15,
                                        backgroundColor: '#111820',
                                        borderRadius: 10,
                                        marginTop: 10,
                                        marginLeft: 10,
                                    }} onPress={() => {
                                        firebase.auth().signOut().then(function () {
                                            logout()
                                        }, function (error) {
                                            alert('Sign Out Error', error);
                                        });

                                    }}>
                                        <Text style={{ color: '#f1f1f1' }}>Log Out</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.followBox}>
                                <View style={styles.followTextBox}>
                                    <Text style={styles.textInFollow}>Followers</Text>
                                    <Text style={styles.textValue}>{userDetails.followers}</Text>
                                </View>
                                <View style={styles.followTextBox}>
                                    <Text style={styles.textInFollow}>Articles</Text>
                                    <Text style={styles.textValue}>{userDetails.Articles}</Text>
                                </View>
                                <View style={styles.followTextBox}>
                                    <Text style={styles.textInFollow}>Reatings</Text>
                                    <Text style={styles.textValue}>{userDetails.reating}/<Text style={{ color: 'grey' }}>5</Text></Text>
                                </View>
                            </View>
                        </View><View style={styles.newsCardBoxList}>
                            <NewBigBox
                                username={userDetails.username}
                                avatorImg={userDetails.image}
                                channelNews={userDetails.name}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={userDetails.username}
                                avatorImg={userDetails.image}
                                channelNews={userDetails.name}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={userDetails.username}
                                avatorImg={userDetails.image}
                                channelNews={userDetails.name}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={userDetails.username}
                                avatorImg={userDetails.image}
                                channelNews={userDetails.name}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                            <NewBigBox
                                username={userDetails.username}
                                avatorImg={userDetails.image}
                                channelNews={userDetails.name}
                                newsImage={faker.image.imageUrl()}
                                newsHeading={faker.lorem.lines(2)}
                                catagory={faker.commerce.department()}
                            />
                        </View>
                        {/* <Button title='logout' onPress={() => {
                        firebase.auth().signOut()
                        logout();
                    }} /> */}
                    </SafeAreaView>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    fullBox: {
        margin: 10,
    },
    userImage: {
        height: 86,
        width: 86,
        overflow: 'hidden',
        borderRadius: 50,
    },
    imageAndName: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Dimensions.get('window').height / 100) * 5
    },
    channelName: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold'
    },
    followBox: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    followTextBox: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    textInFollow: {
        fontSize: 16
    },
    textValue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    followTextBox2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    textInFollow2: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    textValue2: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    newsCardBoxList: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 25,
        marginBottom: 80,
    }

})

export default Account;