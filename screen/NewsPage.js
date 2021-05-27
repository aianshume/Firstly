import React, {useState} from 'react'
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const NewsPage = ({ route }) => {
    const [like, setLike] = useState({
        liked : false,
        color: 'black',
        icon : 'heart-outline',
        icon2 : 'ios-heart',
    })
    return (
        <View style={styles.fullBox}>
            <StatusBar style='dark' />
            <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.headerSection}>
                        <Ionicons onPress={() => navigation.goBack()} name="arrow-back-sharp" size={25} color="black" />
                        <Text style={{ fontWeight: 'bold', fontSize: 17 }}>{route.params.catagory}</Text>
                        <Text />
                    </View>
                    <Image source={{uri : route.params.image}} style={styles.image}/>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>{route.params.title}</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 30}}>
                        <Ionicons onPress={()=> {
                            if (like.liked === false){
                                setLike({
                                color: '#FF2400',
                                icon : 'ios-heart',
                                icon2 : 'heart-outline',
                                liked : true
                            })
                            } else if (like.liked === true){
                                setLike({
                                color: 'black',
                                icon : 'heart-outline',
                                icon2 : 'ios-heart',
                                liked : false
                            })
                            }
                        }} name={like.icon} size={24} color={like.color} />
                        <Ionicons name="md-chatbubbles-outline" size={24} color="black" />
                        <Ionicons name="bookmark-outline" size={24} color="black" />
                        <Ionicons name="share-social-outline" size={24} color="black" />
                    </View>
                        <Text style={{marginTop: 20, fontSize: 16}}>{route.params.fullArticle}</Text>
                    </View>
                    <View>
                    </View>
            </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    fullBox: {
        margin: 10,
    },
    headerSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image : {
        height: (Dimensions.get('window').height/100)*30,
        width: (Dimensions.get('window').width/100)*94,
        overflow: 'hidden',
        borderRadius: 10,
        marginTop: 15
    }
})

export default NewsPage;