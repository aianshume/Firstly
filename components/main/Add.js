import React, { useState, useEffect } from 'react';
import {Image, Dimensions, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { Button  } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context'


const Add = (props) => {
	const [image, setImage] = useState('https://user-images.githubusercontent.com/68537640/126079852-1506efd2-2c44-4ec7-ab56-f770e1edd160.png');

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
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,
		  aspect: [4, 3],
		  quality: 1,
		});
	
		console.log(result);
	
		if (!result.cancelled) {
		  setImage(result.uri);
		}
	  };

	return (
		<SafeAreaView style={{backgroundColor: "#ffffff"}}>
			<TouchableOpacity>
				<Image source={{uri: image}} style={styles.image}/>
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	image : {
		width : (Dimensions.get('window').width),
		height : (Dimensions.get('window').height / 100) * 25,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Add
