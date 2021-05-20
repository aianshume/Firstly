import React from 'react';
import {View, Text, StyleSheet ,TouchableOpacity, Image, ScrollView} from 'react-native';
// import LoadingScr from './compo/LoadingScr'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import faker from 'faker';
import StoryAvator from './compo/StoryAvator';
import NewBigBox from './compo/NewsBigBox'


export default function HomeScreen({ navigation }) {
    console.log(faker.company.companyName())
        return (
            <View style={{backgroundColor: '#f1f1f1'}}>
            <SafeAreaView>
            <StatusBar style='dark'/>
            <View style={styles.HeaderPart}>
                <Text style={styles.homeheading}>Home</Text>
                <Ionicons name="search-outline" size={24} color="black" />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* story view */}
            <View style={styles.storyLine}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                <StoryAvator imageUrl={faker.image.avatar()}/>
                </ScrollView>
            </View>
            {/* news card view */}
            <View style={styles.newsCardBoxList}>
            <NewBigBox
            username={faker.name.firstName()}
            avatorImg={faker.image.avatar()}
            channelNews={faker.company.companyName()}
            newsImage={faker.image.imageUrl()}
            newsHeading={faker.lorem.lines(2)}
            catagory = {faker.commerce.department()}
            nav = {navigation}
            />
            <NewBigBox
            username={faker.name.firstName()}
            avatorImg={faker.image.avatar()}
            channelNews={faker.company.companyName()}
            newsImage={faker.image.imageUrl()}
            newsHeading={faker.lorem.lines(2)}
            catagory = {faker.commerce.department()}
            />
            <NewBigBox
            username={faker.name.firstName()}
            avatorImg={faker.image.avatar()}
            channelNews={faker.company.companyName()}
            newsImage={faker.image.imageUrl()}
            newsHeading={faker.lorem.lines(2)}
            catagory = {faker.commerce.department()}
            />
            <NewBigBox
            username={faker.name.firstName()}
            avatorImg={faker.image.avatar()}
            channelNews={faker.company.companyName()}
            newsImage={faker.image.imageUrl()}
            newsHeading={faker.lorem.lines(2)}
            catagory = {faker.commerce.department()}
            />
            <NewBigBox
            username={faker.name.firstName()}
            avatorImg={faker.image.avatar()}
            channelNews={faker.company.companyName()}
            newsImage={faker.image.imageUrl()}
            newsHeading={faker.lorem.lines(2)}
            catagory = {faker.commerce.department()}
            />
            </View>
            </ScrollView>
            </SafeAreaView>
            </View>
        )
}

const styles = StyleSheet.create({
    HeaderPart : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft : 10,
        marginRight : 10,
        marginTop : 20,
        marginBottom: 10
    },
    homeheading :{
        fontSize : 22,
        fontWeight : 'bold',
    },
    storyLine : {
        flexDirection : 'row',
    },
    newsCardBoxList : {
        flexDirection : 'column',
        justifyContent: 'space-between',
        marginTop : 25,
        marginLeft : 10,
        marginRight : 10,
        marginBottom : 80,
    }
})