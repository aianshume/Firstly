import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase';
import storage from 'firebase/storage';
import Loading from './compo/LoadingScr';


var store = firebase.storage().ref();
var db = firebase.firestore();

var isPhotoSelected = false;


var checkTheFileExtention = (url) => {
  if (url.substring(url.search('jpg')) == 'jpg') {
    return 'jpg';
  } else if (url.substring(url.search('png')) == 'png') {
    return 'png';
  } else if (url.substring(url.search('jpeg')) == 'jpeg') {
    return 'jpeg';
  }
}

const EditProfile = ({ route, navigation }) => {
  const [newImage, setNewImage] = React.useState(route.params.userState.image);
  const [newEmail, setNewEmail] = React.useState(route.params.userState.email);
  const [name, setNewName] = React.useState(route.params.userState.name);
  const [isLoading, setIsLoading] = React.useState(false);
  const newUserName = route.params.userState.username;

  //function that uplaod data on the firebase

  const saveData = async () => {
    setIsLoading(true)
    if (isPhotoSelected == true) {
      let metaData = {
        type: `image/${checkTheFileExtention(newImage)}`
      }
      const response = await fetch(newImage)
      const blob = await response.blob();
      await store.child(`avator/${newUserName}.${checkTheFileExtention(newImage)}`)
        .put(blob, metaData)
        .then((doc) => doc.ref.getDownloadURL().then((URL) => {
          db.collection('Accounts').doc(newUserName).update({
            name: name,
            image: URL,
            email: newEmail,
          }).then(() => {
            navigation.goBack();
          })
        }))
    } else if (isPhotoSelected == false) {
      db.collection('Accounts').doc(newUserName).update({
        name: name,
        email: newEmail,
      }).then(() => {
        navigation.goBack();
      })
    }
  }

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      isPhotoSelected = true;
      setNewImage(result.uri);
    }
  };

  if (isLoading == true) {
    return (<Loading />)
  } else if (isLoading == false) {
    return (
      <>
        <View style={{ backgroundColor: '#f1f1f1' }}>
          <StatusBar style='dark' />
          <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.fullBox}>
              <View style={styles.headerSection}>
                <Ionicons onPress={() => navigation.goBack()} name="arrow-back-sharp" size={25} color="black" />
                <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Edit Profile</Text>
                <Text />
              </View>
              <TouchableOpacity style={styles.imageAndName} onPress={pickImage}>
                <Image source={{ uri: newImage }} style={styles.userImage} />
              </TouchableOpacity>
              <View style={styles.loginForm}>
                <TextInput editable={false} style={styles.userTextStyle} value={newUserName} placeholderTextColor="grey" placeholder="Username" />
                <TextInput style={styles.userTextStyle} onChangeText={setNewName} value={name} placeholderTextColor="grey" placeholder="Name" />
                <TextInput style={styles.userTextStyle} onChangeText={setNewEmail} value={newEmail} placeholderTextColor="grey" placeholder="Email" />
                <TouchableOpacity style={styles.loginButton} onPress={() => {
                  saveData()
                }}>
                  <Text style={{ color: '#F1F1F1', textAlign: 'center', fontWeight: 'bold' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>
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
  imageAndName: {
    justifyContent: "center",
    alignItems: 'center',
    marginTop: (Dimensions.get('window').height / 100) * 5
  },
  userImage: {
    height: 86,
    width: 86,
    overflow: 'hidden',
    borderRadius: 50,
  },
  loginForm: {
    marginTop: '20%',
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
})

export default EditProfile;