import React from 'react';
import {Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Search(){
    return (
       <>
       <StatusBar style="dark"/>
       <SafeAreaView>
           <Text>its search Bar</Text>
       </SafeAreaView>
       </>
    )
}