import React from 'react';
import { StatusBar } from 'expo-status-bar';
import * as firebase from 'firebase';
import Loading from './components/Loading'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/auth/Login';
import SignUpScreen from './components/auth/SignUp';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import MainScreen from './components/Main'
import AddScreen from './components/main/Add'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBS0onRNdFDkY0-V3IRzWkZKczbErX2kKk",
  authDomain: "firstly-codenanshu.firebaseapp.com",
  projectId: "firstly-codenanshu",
  storageBucket: "firstly-codenanshu.appspot.com",
  messagingSenderId: "990849444684",
  appId: "1:990849444684:web:94d833e0f4a2a2f4e1fde9",
  measurementId: "G-69X7S2PPD9"
};

if (firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  const [status, setStatus] = React.useState({
    loggedIn: null,
    loaded : null
  })

  React.useEffect(()=>{
      firebase.auth().onAuthStateChanged((user)=>{
        if (!user){
          setStatus({
            loggedIn : false,
            loaded : true
          })
        } else {
          setStatus({
            loggedIn : true,
            loaded : true
          })
        }
      })
  },[])

  if (!status.loaded){
    return (
      <Loading/>
    )
  }

  if (!status.loggedIn){
  return (
    <>
     <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{headerShown : false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown : false}} component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
    </>
  );
  } 

  return (
    <Provider store={store}>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <StatusBar style="dark"/>
    <NavigationContainer theme={{colors: {background : "#ffffff"}}}>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" options={{headerShown : false}} component={MainScreen} />
        <Stack.Screen name="mainAdd" component={AddScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ApplicationProvider>
    </Provider>
  )
}
