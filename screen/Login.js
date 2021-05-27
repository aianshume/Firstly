import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import firebase from '../firebaseConfig'

const db = firebase.firestore();

export default function LoginScreen({ navigation }) {
    const [UserName, setUserName] = useState('')
    const [PassWord, setPassWord] = useState('')

    // login with id and password

    const loginButtonWork = () => {
        firebase.auth().signInWithEmailAndPassword(UserName, PassWord)
            .then((details) => {
                navigation.navigate('Home')
            })
            .catch((err) => {
                alert(err)
            })
    }


    // this function help us to check the user is exsisted or not 
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
                        db.collection("Accounts").doc(data.user.email.substring(0, data.user.email.search('@gmail.com'))).get().then((doc) => {
                            if (doc.exists) {
                                console.log('user allready registered')
                            } else {
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
                            }
                        }).catch((error) => {
                            console.log("Error getting document:", error);
                        });
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
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

    return (
        <View >
            <SafeAreaView style={styles.completeArea}>
                <StatusBar style="dark" />
                <Text style={styles.mainHeading}>Welcome 👋,</Text>
                <Text style={styles.secondLine}>Sign In To Countinue!</Text>
                <View style={styles.loginForm}>
                    <TextInput style={styles.userTextStyle} onChangeText={setUserName} value={UserName} placeholderTextColor="grey" placeholder="Email" />
                    <TextInput style={styles.passTextStyle} onChangeText={setPassWord} value={PassWord} secureTextEntry={true} placeholderTextColor="grey" placeholder="Password" />
                    <Text style={{ textAlign: 'right', fontWeight: 'bold' }} onPress={() => console.log(' i forget the password')}>Forget Password</Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        loginButtonWork()
                    }}>
                        <Text style={{ color: '#F1F1F1', textAlign: 'center', fontWeight: 'bold' }}>Login</Text>
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
                            <Text style={{ color: '#111820', fontWeight: 'bold' }}>     Sign In With Google</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.signupLink} onPress={() => {
                    navigation.navigate('Register')
                }}>
                    <Text style={{ color: '#111820', textAlign: 'center', fontWeight: 'bold' }}>I Am New! Register</Text>
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
        marginBottom: '7%'
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
        marginBottom: 10
    }
})
