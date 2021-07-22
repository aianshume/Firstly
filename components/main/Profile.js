import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Layout, Text, Button, Divider } from '@ui-kitten/components';
import { editIcon, followIcon, unfollowIcon, logoutIcon } from '../auth/extra/icons';
import { connect } from 'react-redux';
import PostCard from './components/PostCard';
import Loading from '../Loading'
import firebase from 'firebase';
require('firebase/firestore')

const Profile = (props) => {
	const [userPosts, setUserPosts] = useState([])
	const [user, setUser] = useState(null)
	const [following, setFollowing] = useState(false)

	useEffect(() => {
		async function loaddata() {
			console.log(props.route.params.uid)
			const { currentUser, posts } = props;

			if (props.route.params.uid === firebase.auth().currentUser.uid) {
				console.log('its same')
				setUser(currentUser)
				setUserPosts(posts)
				console.log(user)
				console.log(userPosts)
			} else {
				console.log('its another user')
				await firebase.firestore()
					.collection('users')
					.doc(props.route.params.uid)
					.get()
					.then(async (snapshot) => {
						await setUser(snapshot.data())
					})
				await firebase.firestore()
					.collection('posts')
					.doc(props.route.params.uid)
					.collection("userPosts")
					.orderBy('date', 'asc')
					.get()
					.then(async (snapshot) => {
						let posts = snapshot.docs.map(doc => {
							const data = doc.data();
							const id = doc.id;
							return { id, ...data };
						})
						setUserPosts(posts)
						console.log(user)
						console.log(userPosts)
					})
			}
		}

		loaddata();

		if (props.following.indexOf(props.route.params.uid) > -1) {
			setFollowing(true)
		} else {
			setFollowing(false)
		}

	}, [props.route.params.uid, props.following])

	
	const onFollow = () => {
		console.log('followed')
		firebase.firestore()
		.collection('following')
		.doc(firebase.auth().currentUser.uid)
		.collection('userFollowing')
		.doc(props.route.params.uid)
		.set({})
	}
	
	const onUnFollow = () => {
		console.log('unfollod')
		firebase.firestore()
		.collection('following')
		.doc(firebase.auth().currentUser.uid)
		.collection('userFollowing')
		.doc(props.route.params.uid)
		.delete()
	}
	
	const onLogout = () => {
		firebase.auth().signOut();
	}

	if (user === null) {
		return <Loading />
	}
	
	return (
		<SafeAreaView>
			<Layout
				style={styles.container}
				level='2'>
				<Layout
					style={styles.header}
					level='1'>
					<View style={styles.profileContainer}>
						<Avatar
							style={styles.profileAvatar}
							size='giant'
							source={{ uri: user.avatar }}
						/>
						<View style={styles.profileDetailsContainer}>
							<Text category='h4'>
								{user.name}
							</Text>
							<Text
								appearance='hint'
								category='s1'>
								{user.location}
							</Text>
						</View>
					</View>
					<View style={styles.followBox}>
						<View style={styles.followTextBox}>
							<Text style={styles.textInFollow}>Followers</Text>
							<Text style={styles.textValue}>{user.followers}</Text>
						</View>
						<View style={styles.followTextBox}>
							<Text style={styles.textInFollow}>Following</Text>
							<Text style={styles.textValue}>{user.following}</Text>
						</View>
						<View style={styles.followTextBox}>
							<Text style={styles.textInFollow}>Posts</Text>
							<Text style={styles.textValue}>{user.posts}</Text>
						</View>
					</View>
					{props.route.params.uid !== firebase.auth().currentUser.uid ? (
						<View>
							{!following ? (
								<Button
									style={styles.followButton}
									status='info'
									onPress={onFollow}
									accessoryRight={followIcon}
								>
									FOLLOW
								</Button>
							) : (
								<Button
									style={onUnFollow}
									status="danger"
									onPress={onUnFollow}
									accessoryRight={unfollowIcon}
								>
									UNFOLLOW
								</Button>
							)}
						</View>
					) : (
						<View style={styles.flexrow}>
							<Button
								style={styles.button}
								status="info"
								onPress={onUnFollow}
								accessoryRight={editIcon}
							>
								EDIT
							</Button>
							<Button
								style={styles.button}
								status="danger"
								onPress={onLogout}
								accessoryRight={logoutIcon}
							>
								LOGOUT
							</Button>
						</View>
					)}

					<Divider />
					{
						userPosts.map((item) => {
							return <PostCard key={userPosts.indexOf(item)} data={item} />
						})
					}
				</Layout>
			</Layout>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		padding: 16,
	},
	profileContainer: {
		flexDirection: 'row',
	},
	profileAvatar: {
		marginHorizontal: 8,
	},
	profileDetailsContainer: {
		marginHorizontal: 8,
	},
	followButton: {
		marginTop: 24,
	},
	descriptionText: {
		marginTop: 24,
		marginBottom: 8,
	},
	profileSectionsDivider: {
		width: 1,
		height: '100%',
		marginHorizontal: 8,
	},
	followBox: {
		margin: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	followTextBox: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},
	textInFollow: {
		fontSize: 16
	},
	textValue: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	flexrow : {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	button : {
		width : (Dimensions.get('screen').width/100)*43
	}
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts,
	following: store.userState.following,
})

export default connect(mapStateToProps, null)(Profile)