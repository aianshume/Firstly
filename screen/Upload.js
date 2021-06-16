import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Entypo, AntDesign } from '@expo/vector-icons';
import firebase from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import Loading from './compo/LoadingScr';

var store = firebase.storage().ref();
const db = firebase.firestore();

let imageUrl = 'https://user-images.githubusercontent.com/68537640/119179517-a0268980-ba8c-11eb-9b10-3ab81e8d4ec1.png';

export default function Upload({ navigation }) {
    const [userData, setUserData] = React.useState({})
    const [image, setImage] = React.useState(imageUrl)
    const [title, setTitle] = React.useState('')
    const [titleLenght, setTitleLenght] = React.useState(1)
    const [videoLink, setVideoLink] = React.useState('')
    const [dic, setDic] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [selectedValue, setSelectedValue] = React.useState("Select Category");
    const [isUpload, setIsUpload] = React.useState(false);
    const [itemSelected, setItemSelected] = React.useState({
        isPhotoSelected: false,
        isTitleUpdate: false,
        isDicUpdate: false
    })

    var checkTheFileExtention = (url) => {
        if (url.substring(url.search('jpg')) == 'jpg') {
            return 'jpg';
        } else if (url.substring(url.search('png')) == 'png') {
            return 'png';
        } else if (url.substring(url.search('jpeg')) == 'jpeg') {
            return 'jpeg';
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            itemSelected.isPhotoSelected = true;
            setImage(result.uri);
        }
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let value = await AsyncStorage.getItem('@userProfile')
                let dataToSave = JSON.parse(value);
                setUserData(dataToSave);
            }
            catch (e) {
                console.log(e)
            }
        }

        fetchData();
    }, [])
    // create function that handle text dic and image

    const replaceTitle = (heading) => {
        setTitleLenght(heading.length);
        if (titleLenght != 0 && titleLenght <= 80) {
            if (titleLenght >= 80) {
                alert('you can type only 80 words in title')
            } else {
                itemSelected.isTitleUpdate = true;
                console.log(titleLenght)
                setTitle(heading)
            }

        }
    }

    const replaceDec = (text) => {
        if (text.length >= 10) {
            itemSelected.isDicUpdate = true;
            console.log('text is updated')
        }
        setDic(text);
    }

    const UploadToServer = async() => {
        if (itemSelected.isDicUpdate == false || itemSelected.isPhotoSelected == false || itemSelected.isTitleUpdate == false) {
            alert("Title, Article and Image Are Require Please Check Again Something is missing")
        } else {
                    let articleId = userData.Articles + 1;
                    setIsUpload(true);
                    console.log('my article id: ' + articleId)
                    let metaData = {
                        type: `image/${checkTheFileExtention(image)}`
                    }
                    const response = await fetch(image)
                    const blob = await response.blob();
                    await store.child(`content/${userData.username+articleId}.${checkTheFileExtention(image)}`)
                        .put(blob, metaData)
                        .then((doc) => doc.ref.getDownloadURL().then((URL) => {
                            console.log('iamge upload');
                            db.collection('Accounts').doc(userData.username).update({
                                    posts : firebase.firestore.FieldValue.arrayUnion({
                                        Title: title,
                                        Article: dic,
                                        Image: URL,
                                        Video: videoLink,
                                        Location: location,
                                        Category: selectedValue,
                                        Avator: userData.image,
                                        Username: userData.username,
                                        Name: userData.name,
                                        Likes : 0,
                                        LikedBy : [],
                                    })
                            }).then(() => {
                                console.log('data write in database')
                                db.collection('Accounts').doc(userData.username).update({
                                    Articles: articleId
                                }).then(() => {
                                        console.log('data write in profile')
                                        setIsUpload(false);
                                        navigation.goBack();
                                    })
                                })
                            })
                        )
                }
        }

    if (isUpload == true) {
        return (<Loading />)
    } else if (isUpload == false) {
        return (
            <>
                <StatusBar style='dark' />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SafeAreaView style={styles.fullBox}>
                        <View style={styles.headerSection}>
                            <Entypo onPress={() => navigation.goBack()} name="cross" size={25} color="black" />
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Add Article</Text>
                            <TouchableOpacity onPress={() => {
                                UploadToServer()
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>Post</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxToWrite}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: userData.image }} style={styles.avatorImg} />
                                <View style={{ marginLeft: 10 }}>
                                    <Text>{userData.name}</Text>
                                    <Text>@{userData.username}</Text>
                                </View>
                            </View>
                            <View>
                                <Image source={{ uri: image }} style={styles.imageToUpload} />
                                <TextInput style={{ marginTop: 20, paddingLeft: 10, paddingBottom: 5, paddingTop: 5, borderColor: 'grey', borderTopWidth: 1, borderBottomWidth: 1 }} onChangeText={replaceTitle} placeholder='Create a title' value={title} />
                                <TextInput value={dic} onChangeText={replaceDec} multiline={true} style={styles.articleText} placeholder="type your article here !" />
                                <TouchableOpacity style={styles.optionStyle} onPress={() => {
                                    pickImage()
                                }}>
                                    <Entypo name="folder-images" size={24} color="black" />
                                    <Text style={styles.margin10}>Add Image</Text>
                                </TouchableOpacity>
                                <View style={styles.optionStyle}>
                                    <Entypo name="location-pin" size={24} color="black" />
                                    <TextInput onChangeText={setLocation} value={location} style={styles.margin10} placeholder='Add Location' />
                                </View>
                                <View style={styles.optionStyle}>
                                    <Entypo name="video-camera" size={24} color="black" />
                                    <TextInput value={videoLink} onChangeText={setVideoLink} style={styles.margin10} placeholder='Add YouTube Video' />
                                </View>
                                <View style={styles.optionStyle}>
                                    <Entypo name="list" size={24} color="black" />
                                    <Picker
                                        selectedValue={selectedValue}
                                        style={{ width: 150 }}
                                        onValueChange={(itemValue, itemIndex) => { setSelectedValue(itemValue); console.log(selectedValue) }}
                                    >
                                        <Picker.Item label="Select Category" value="Select Category" />
                                        <Picker.Item label="Crime" value="crime" />
                                        <Picker.Item label="Sports" value="Sports" />
                                        <Picker.Item label="Technology" value="tech" />
                                        <Picker.Item label="Business" value="Business" />
                                        <Picker.Item label="Other" value="other" />
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    fullBox: {
        margin: 10,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    avatorImg: {
        height: 46,
        width: 46,
        overflow: 'hidden',
        borderRadius: 50,
    },
    boxToWrite: {
        marginTop: 10
    },
    articleText: {
        height: 200,
        textAlignVertical: 'top',
        padding: 10,
    },
    imageToUpload: {
        height: (Dimensions.get('window').height / 100) * 30,
        width: (Dimensions.get('window').width / 100) * 95,
        overflow: 'hidden',
        borderRadius: 2,
        marginTop: 15
    },
    title: {
        borderColor: 'grey',
        borderRadius: 2,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10
    },
    optionStyle: {
        flexDirection: 'row',
        padding: 10
    },
    margin10: {
        marginLeft: 10
    }
})