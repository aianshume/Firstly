import React, {useEffect} from 'react'
import {Text} from 'react-native'
import firebase from '../firebaseConfig'
import Loading from './compo/LoadingScr'
const CheckTheUser = ({navigation}) => {

    useEffect(()=> {
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                navigation.navigate('Home');
            } else if (!user) {
                navigation.navigate('Login')
            }
        })
    })

    return(
        <Loading/>
    )
}

export default CheckTheUser