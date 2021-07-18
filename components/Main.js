import React from 'react'
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './main/Feed'
import {Icon} from '@ui-kitten/components'

const Tab = createBottomTabNavigator();

function Main(props){
	React.useEffect(()=> {
		props.fetchUser();
	},[])

	return (
		<Tab.Navigator>
		      <Tab.Screen name="Feed" component={FeedScreen} options={{
		      	tabBarIcon : ({ color, size }) => (
		      			<Icon name="facebook-outline" color="black" size={26} />
		      		)
		      }}/>
    	</Tab.Navigator>
	)
}


const mapStateToProps = (store) => ({
	currentUser : store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)
export default connect(mapStateToProps, mapDispatchProps)(Main)
