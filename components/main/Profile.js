import React, { lazy } from 'react'
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Layout, Text, Button, Divider } from '@ui-kitten/components';
import { connect } from 'react-redux';
import Card from './components/Card'

const Profile = (props) => {
	const { currentUser, posts } = props;
	console.log({ currentUser, posts })
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
							source={{ uri: currentUser.avatar }}
						/>
						<View style={styles.profileDetailsContainer}>
							<Text category='h4'>
								{currentUser.name}
							</Text>
							<Text
								appearance='hint'
								category='s1'>
								{currentUser.location}
							</Text>
						</View>
					</View>
					<View style={styles.followBox}>
						<View style={styles.followTextBox}>
							<Text style={styles.textInFollow}>Followers</Text>
							<Text style={styles.textValue}>{currentUser.followers}</Text>
						</View>
						<View style={styles.followTextBox}>
							<Text style={styles.textInFollow}>Following</Text>
							<Text style={styles.textValue}>{currentUser.following}</Text>
						</View>
						<View style={styles.followTextBox}>
							<Text style={styles.textInFollow}>Posts</Text>
							<Text style={styles.textValue}>{currentUser.posts}</Text>
						</View>
					</View>
					<Button
						style={styles.followButton}
						onPress={() => console.log("clicked")}>
						FOLLOW
					</Button>
				<Card/>
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
});

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
	posts: store.userState.posts
})

export default connect(mapStateToProps, null)(Profile)