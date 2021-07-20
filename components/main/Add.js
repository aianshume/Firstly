import React, { useState, useEffect } from 'react';
import { Image, Dimensions, Platform, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Button, Layout, Input, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { VideoIcon, LocationIcon } from '../auth/extra/icons';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');
import Loading from "../Loading"

const Add = ({ navigation }) => {
	const [image, setImage] = useState('https://user-images.githubusercontent.com/68537640/126079852-1506efd2-2c44-4ec7-ab56-f770e1edd160.png');
	const [title, setTitle] = React.useState('')
	const [article, setArticle] = React.useState('')
	const [videoLink, setVideoLink] = React.useState('')
	const [location, setLocation] = React.useState('')
	const [loading, setLoading] = React.useState(false)

	useEffect(() => {
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
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	const lineInTitle = () => {
		return <Text>{title.length}</Text>
	}

	const handleTitle = (text) => {
		if (text.length >= 101) {
			setEdidable(false)
		} else {
			setTitle(text)
		}
	}

	const sendDataToSever = async() => {
		const url = await upload(image);
		firebase.firestore().collection('posts')
			.doc(firebase.auth().currentUser.uid)
			.collection('userPosts')
			.add({
				title,
				article,
				image: url,
				location,
				video: videoLink,
				date: firebase.firestore.FieldValue.serverTimestamp()
			}).then((function () {
				navigation.popToTop()
			}))
			.catch(err=>{
				console.log(err)
			})
	}

	const upload = async (url) => {
		setLoading(true)
		// Why are we using XMLHttpRequest? See:
		// https://github.com/expo/expo/issues/2402#issuecomment-443726662
		const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
		const blob = await new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.onload = function () {
				resolve(xhr.response);
			};
			xhr.onerror = function (e) {
				console.log(e);
				reject(new TypeError("Network request failed"));
			};
			xhr.responseType = "blob";
			xhr.open("GET", url, true);
			xhr.send(null);
		});

		const ref = firebase.storage().ref().child(childPath);
		const snapshot = await ref.put(blob);

		// We're done with the blob, close and release it
		blob.close();

		return await snapshot.ref.getDownloadURL()
	}

	if (loading == true) {
		return <Loading />
	} else {
		return (
			<ScrollView>
				<TouchableOpacity onPress={pickImage}>
					<Image source={{ uri: image }} style={styles.image} />
				</TouchableOpacity>
				<Layout style={styles.textArea}>
					<Input
						placeholder='Title'
						value={title}
						onChangeText={handleTitle}
						accessoryRight={lineInTitle}
						multiline={true}
						style={styles.textInputArea}
						label="Title"
					/>
					<Input
						multiline={true}
						textStyle={{ minHeight: (Dimensions.get('window').height / 100) * 30 }}
						placeholder='Article Here'
						label="Article"
						style={styles.textInputArea}
						scrollEnabled={true}
						value={article}
						onChangeText={setArticle}
						{...article}
					/>
					<Input
						placeholder='Youtube Video Link'
						value={videoLink}
						onChangeText={setVideoLink}
						multiline={false}
						style={styles.textInputArea}
						label="Video"
						accessoryRight={VideoIcon}
					/>

					<Input
						placeholder="Location here"
						value={location}
						onChangeText={setLocation}
						style={styles.textInputArea}
						label="location"
						accessoryRight={LocationIcon}
					/>

					<Button onPress={sendDataToSever} style={styles.textInputArea} >Upload 🚀 </Button>
				</Layout>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	image: {
		width: (Dimensions.get('window').width),
		height: (Dimensions.get('window').height / 100) * 30
	},
	textArea: {
		margin: 10
	},
	textInputArea: {
		marginTop: 5,
		marginBottom: 5
	}
})

export default Add;