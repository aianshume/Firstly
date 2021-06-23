import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Searchbar } from 'react-native-paper';
import firebase from 'firebase';
import { Avatar, Card } from 'react-native-paper';

var db = firebase.firestore();
var userTempData = [];

export default function Search() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [dataToPrint, setDataToPrint] = React.useState([]);
    const onChangeSearch = async (query) => {
        setSearchQuery(query)
        await db.collection("Accounts").where("name", "==", query)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    userTempData.push(doc.data())
                    await setDataToPrint(...dataToPrint, userTempData);
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    };

    return (
        <SafeAreaView>
            <StatusBar style='dark' />
            <View style={styles.searchBar}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            {
                dataToPrint.map((item) => {
                    return (
                        <Card.Title
                            title={item.name}
                            subtitle={item.username}
                            key = {dataToPrint.indexOf(item)}
                            left={(props) => <Avatar.Image {...props} size={36} source={{ uri: item.image }} />
                            }
                        />
                    )
                })
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        padding: 10
    }
})