import React from "react";
import { Layout, Text, Input, Avatar } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchIcon } from "../auth/extra/icons";
import firebase from "firebase";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
require('firebase/firestore')

const Search = (props) => {
    const [users, setUsers] = React.useState([]);

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection("users")
            .where('name', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                })
                setUsers(users);
            })
    }
    return (
        <SafeAreaView style={styles.container}>
            <Input
                placeholder='Search'
                onChangeText={fetchUsers}
                accessoryRight={SearchIcon}
                style={styles.textInputArea}
            />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> props.navigation.navigate('Profile', {uid : item.id})} >
                    <Layout style={styles.profileCard}>
                        <Avatar source={{ uri: item.avatar }} size='large' />
                            <Text style={{marginLeft : 20}}  >{item.name}</Text>
                    </Layout>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInputArea: {
        marginTop: 5,
        marginBottom: 5
    },
    container: {
        margin: 10
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        marginTop : 10,
        marginLeft : 10,
        marginRight : 10,
        backgroundColor : '#f5f5f5',
        borderRadius : 2
    }
})

export default Search;