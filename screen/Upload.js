import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import firebase from 'firebase';
import storage from 'firebase/storage';
import firestore from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';


var store = firebase.storage().ref();
const db = firebase.firestore();

let imageUrl = 'https://user-images.githubusercontent.com/68537640/119179517-a0268980-ba8c-11eb-9b10-3ab81e8d4ec1.png';

export default function Upload({ navigation }) {
    const [userData, setUserData] = React.useState({})
    const [image, setImage] = React.useState(imageUrl)
    const [title, setTitle] = React.useState('')
    const [videoLink, setVideoLink] = React.useState('')
    const [dic, setDic] = React.useState('')

    React.useEffect(()=>{
        const fetchData = async()=> {
            try {
               const value = await AsyncStorage.getItem('@userProfile')
                console.log(value);
            }
            catch (e) {
                console.log(e)
            }
        }
        fetchData();
    },[])

    return (
        <>
            <View style={{ backgroundColor: '#f1f1f1' }}>
                <StatusBar style='dark' />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={styles.fullBox}>
                        <View style={styles.headerSection}>
                            <Entypo onPress={() => navigation.goBack()} name="cross" size={25} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Add News</Text>
                            <Text />
                        </View>
                        <View>

                        </View>
                    </SafeAreaView>
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    fullBox: {
        margin: 10,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})