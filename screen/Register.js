import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import firebase from '../firebaseConfig';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

const db = firebase.firestore();

export default function RegisterScreen({ navigation }) {
    const [UserName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [PassWord, setPassWord] = useState('')
    // fucntion to send data to firebase
    const sendDataToFirebase = () => {
        firebase.auth().createUserWithEmailAndPassword(email, PassWord)
            .then((data) => {
                db.collection('Accounts').doc(data.user.email.substring(0, data.user.email.search('@gmail.com'))).set({
                    name: 'Firstly User',
                    username: UserName,
                    image: 'https://user-images.githubusercontent.com/68537640/118956405-32d80300-b97d-11eb-8bf2-74e34268ab87.png',
                    email: data.user.email,
                    followers: 0,
                    Articles: 0,
                    reating: 0,
                })
                    .then(() => console.log('data writed'))
                    .catch(() => console.log('error while writing data'))
            })
            .catch(err => console.log(err))
    }

    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    const onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken);

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .then((data) => {
                        db.collection('Accounts').doc(data.user.email.substring(0, data.user.email.search('@gmail.com'))).set({
                            name: data.user.displayName,
                            username: data.user.email.substring(0, data.user.email.search('@gmail.com')),
                            image: data.user.photoURL,
                            email: data.user.email,
                            followers: 0,
                            Articles: 0,
                            reating: 0,
                        })
                            .then(() => console.log('data writed'))
                            .catch(() => console.log('error while writing data'))
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        let errorCode = error.code;
                        let errorMessage = error.message;
                        // The email of the user's account used.
                        let email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        let credential = error.credential;
                        // ...
                    });
            } else {
                alert('User already signed-in Firstly.');
            }
        });
    }

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: '990849444684-03u45er5fl5hji1bjq0rplq0jnekurgg.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                onSignIn(result);

            } else {
                console.log('i dont know')
            }
        } catch (e) {
            console.log('error: ' + e)
        }
    }
    //fucntion to save data in email and password filed

    const saveEmailAndUsername = (text) => {
        setEmail(text);
        if (Math.sign(text.search('@')) == 1){
            setUserName(text.substring(0,text.search('@')))
        }
    }
    return (
        <View >
            <SafeAreaView style={styles.completeArea}>
                <StatusBar style="dark" />
                <Text style={styles.mainHeading}>Create Account 🖐️,</Text>
                <Text style={styles.secondLine}>Register to get started!</Text>
                <View style={styles.loginForm}>
                    <TextInput editable={false} style={styles.userTextStyle} onChangeText={setUserName} value={UserName} placeholderTextColor="grey" placeholder="Username" />
                    <TextInput style={styles.userTextStyle} onChangeText={saveEmailAndUsername} value={email} placeholderTextColor="grey" placeholder="Email" />
                    <TextInput style={styles.passTextStyle} onChangeText={setPassWord} value={PassWord} secureTextEntry={true} placeholderTextColor="grey" placeholder="Password" />
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        sendDataToFirebase()
                    }}>
                        <Text style={{ color: '#F1F1F1', textAlign: 'center', fontWeight: 'bold' }}>Register</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.googleButton} onPress={() => {
                        signInWithGoogleAsync();
                    }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <AntDesign name="google" size={18} color="#111820" />
                            <Text style={{ color: '#111820', fontWeight: 'bold' }}>     Register With Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.signupLink} onPress={() => {
                    navigation.goBack()
                }}>
                    <Text style={{ color: '#111820', textAlign: 'center', fontWeight: 'bold' }}>I have Account! Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    completeArea: {
        margin: 30,
    },
    mainHeading: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    secondLine: {
        color: "grey",
        fontSize: 18,
    },
    loginForm: {
        marginTop: '40%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    userTextStyle: {
        borderRadius: 3,
        borderColor: 'grey',
        padding: 2,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    passTextStyle: {
        borderRadius: 3,
        borderColor: 'grey',
        padding: 2,
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 10,
    },
    loginButton: {
        backgroundColor: '#111820',
        padding: 10,
        marginTop: 15,
        borderRadius: 3
    },
    googleButton: {
        backgroundColor: '#d9d9d9',
        padding: 10,
        marginTop: 15,
        borderRadius: 3
    },
    signupLink: {
        justifyContent: "flex-end",
        marginBottom: 20
    }
})
