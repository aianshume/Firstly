import React from 'react'
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const EmpityScreen = () => {
	return null;
}

function Main(props){
	React.useEffect(()=> {
		props.fetchUser();
	},[])

	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color }) => {
			  let iconName;
			  let iconSize;
	  
			  if (route.name === 'Feed') {
				iconName = focused
				  ? 'ios-home'
				  : 'ios-home-outline';
				iconSize = 24;
			  } else if (route.name === 'Search') {
				iconName = focused ? 'md-search-sharp' : 'md-search-outline';
				iconSize = 24;
			  } else if (route.name === 'Like') {
				iconName = focused ? 'heart-sharp' : 'heart-outline';
				iconSize = 24;
			  } else if (route.name === 'Profile') {
				iconName = focused ? 'person-circle' : 'person-circle-outline';
				iconSize = 24;
			  } else if (route.name === 'Add') {
				iconName = focused ? 'add-circle' : 'add-circle-outline';
				iconSize = 24;
			  }
	  
			  // You can return any component that you like here!
			  return <Ionicons name={iconName} size={iconSize} color={color} />;
			},
		  })} tabBarOptions={{
			activeTintColor: '#3366ff',
			inactiveTintColor: '#8f9bb3',
			showLabel: false,
			style: { backgroundColor: '#f1f1f1' }
		  }}>
		      <Tab.Screen name="Feed" component={FeedScreen} />
			  <Tab.Screen name="Search" component={ProfileScreen} />
		      <Tab.Screen name="Add" component={EmpityScreen} 
			  	listeners={({navigation})=>({
					  tabPress : event => {
						  event.preventDefault();
						  navigation.navigate("mainAdd")
					  }
				  })}
			  />
		      <Tab.Screen name="Like" component={ProfileScreen} />
		      <Tab.Screen name="Profile" component={ProfileScreen} />
    	</Tab.Navigator>
	)
}


const mapStateToProps = (store) => ({
	currentUser : store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main)
