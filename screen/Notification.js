import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Notify from './compo/Notify'
import faker from 'faker'
const Notification = () => {
    return (
        <>
        <View style={{backgroundColor: '#f1f1f1'}}>
        <SafeAreaView >
        <ScrollView>
            <StatusBar style="dark"/>
            <Image source={require('../assets/notfication.png')} style={styles.backImage}/>
            <View style={styles.safearea}>
            <Text style={styles.heading}>Notifications</Text>
            </View>
            <View style={styles.notifyCard}>
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
                <Notify channelName={faker.company.companyName()} avatorImg={faker.image.avatar()} title={faker.lorem.lines(1)} />
            </View>
            </ScrollView>
        </SafeAreaView>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    heading : {
        fontSize : 22,
        fontWeight : 'bold',
        color : '#111820'
    },
    safearea : {
        margin : 10
    },
    backImage : {
        height: (Dimensions.get('window').height/100)*40,
        width: Dimensions.get('window').width,
    },
    notifyCard : {
        marginRight: 40,
        marginLeft: 10,
        marginTop : 10,
        marginBottom: 50
    }
})

export default Notification;