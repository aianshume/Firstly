import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Layout, Text, Button, Divider } from '@ui-kitten/components';
import { connect } from 'react-redux';
import FeedCard from './components/FeedCard';
import Loading from '../Loading'
import firebase from 'firebase';
require('firebase/firestore')

const Feed = (props) => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let posts = [];
		if (props.usersLoaded == props.following.length){
			for(let i = 0; i < props.following.length; i++){
				const user = props.users.find(el => el.uid === props.following[i]);	
				if (user != undefined){
					posts = [...posts, ...user.posts];
				}
			}
			posts.sort(function (x,y){
				return x.date - y.date;
			})

			setPosts(posts);
			setLoading(false);
		}

	}, [props.usersLoaded])

	if (loading){
		return <Loading/>
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<Text>Home</Text>
			{/*<FlatList
				numColoums={1}
				horizontal={false}
				data={posts}
				renderItem = {({ item }) => {
					<FeedCard key={posts.indexOf(item)} data={item} />
				}}
			/>*/}
			<ScrollView showsVerticalScrollIndicator={false}>
			{
				posts.map((item)=> {
					return <FeedCard key={posts.indexOf(item)} data={item} />
				})
			}
			{
				posts.map((item)=> {
					return <FeedCard key={posts.indexOf(item)} data={item} />
				})
			}
			{
				posts.map((item)=> {
					return <FeedCard key={posts.indexOf(item)} data={item} />
				})
			}
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	safeArea : {
		margin : 10
	}
})

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	following: store.userState.following,
	users : store.usersState.users,
	usersLoaded : store.usersState.userLoaded,
})

export default connect(mapStateToProps, null)(Feed)