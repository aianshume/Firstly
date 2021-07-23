import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';
import SearchScreen from './main/Search';
import { Icon } from '@ui-kitten/components';
import firebase from 'firebase';

const Tab = createBottomTabNavigator();

const EmpityScreen = () => {
	return null;
}

function Main(props) {
	React.useEffect(() => {
		props.clearData();
		props.fetchUser();
		props.fetchUserPosts();
		props.fetchUserFollowing();
	}, [])

	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color }) => {
				let iconName;
				let iconSize;

				if (route.name === 'Feed') {
					iconName = focused
						? 'home'
						: 'home-outline';
					iconSize = 24;
				} else if (route.name === 'Search') {
					iconName = focused ? 'search' : 'search-outline';
					iconSize = 24;
				} else if (route.name === 'Like') {
					iconName = focused ? 'heart' : 'heart-outline';
					iconSize = 24;
				} else if (route.name === 'Profile') {
					iconName = focused ? 'person' : 'person-outline';
					iconSize = 24;
				} else if (route.name === 'Add') {
					iconName = focused ? 'plus-circle' : 'plus-circle-outline';
					iconSize = 24;
				} else if (route.name === 'Comment') {
					iconName = focused ? 'plus-circle' : 'plus-circle-outline';
					iconSize = 24;
				}

				// You can return any component that you like here!
				return <Icon {...props} name={iconName} fill={color} height={iconSize} width={iconSize} />
			},
		})} tabBarOptions={{
			activeTintColor: '#3366ff',
			inactiveTintColor: '#8f9bb3',
			showLabel: false,
			style: { backgroundColor: '#f5fff9' }
		}}>
			<Tab.Screen name="Feed" component={FeedScreen} navigation={props.navigation} />
			<Tab.Screen name="Search" component={SearchScreen} />
			<Tab.Screen name="Add" component={EmpityScreen}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate("mainAdd");
					}
				})}
			/>
			<Tab.Screen name="Like" component={ProfileScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen}
				listeners={({ navigation }) => ({
					tabPress: event => {
						event.preventDefault();
						navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid })
					}
				})}
			/>
		</Tab.Navigator>
	)
}


const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main)
