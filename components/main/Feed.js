import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import PostCard from './components/PostCard';
import Loading from '../Loading'
import firebase from 'firebase';
require('firebase/firestore')

const Feed = (props) => {
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		let posts = [];
		if (props.usersLoaded == props.following.length){
			for(let i = 0; i < props.following.length; i++){
				const user = props.users.find(el => el.uid === props.following[i]);	
				if (user != undefined){
					posts = [...posts, ...user.posts];
				}
			}
			posts.sort()
		}

	}, [props.usersLoaded])

	if (loading) {
		return <Loading />
	}

	return (
		<Text>ok</Text>
	)
}

const styles = StyleSheet.create({
	
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts,
	users : store.usersState.users,
	usersLoaded : store.usersState.usersLoaded
})

export default connect(mapStateToProps, null)(Feed)