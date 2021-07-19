import React, { useState, useEffect } from 'react';
import { Image, Dimensions, Platform, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Button, Layout, Input, Text } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { VideoIcon, LocationIcon } from '../auth/extra/icons'

const Add = (props) => {
	const [image, setImage] = useState('https://user-images.githubusercontent.com/68537640/126079852-1506efd2-2c44-4ec7-ab56-f770e1edd160.png');
	const [title, setTitle] = React.useState('')
	const [article, setArticle] = React.useState('')
	const [edidable, setEdidable] = React.useState('')
	const [videoLink, setVideoLink] = React.useState('')
	const [location, setLocation] = React.useState('')

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
		if (text.length >= 101){
			setEdidable(false)
		} else {
			setTitle(text)
		}
	}

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

				<Button style={styles.textInputArea} >Upload 🚀 </Button>
			</Layout>
				</ScrollView>
	)
}

const styles = StyleSheet.create({
	image: {
		width: (Dimensions.get('window').width),
		height: (Dimensions.get('window').height / 100) * 30
	},
	textArea: {
		margin: 10
	},
	textInputArea : {
		marginTop : 5,
		marginBottom : 5
	}
})

export default Add