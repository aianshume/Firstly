import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Dimensions } from 'react-native'
import { Avatar, Text, Input, Button, Layout } from '@ui-kitten/components'

import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersDataForComment } from '../../redux/actions/index'

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")
    const urlOfImage = 'https://user-images.githubusercontent.com/68537640/126213945-ce70d4ae-d88b-4093-8acb-950343f0164e.png';

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                console.log(comments.length, "is the lenght of comments")
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                console.log('user', user)
                if (user == undefined) {
                   let user = props.fetchUsersDataForComment(comments[i].creator, false)
                   comments[i].user = user
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }


        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])


    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View>
                        <Layout style={styles.profileCard}>
                            <Avatar source={{ uri: urlOfImage }} size='small' />
                            <Layout>
                                <Text style={{ marginLeft: 20 }}  >{item.text}</Text>
                                {console.log("these are the items", item)}
                                {/* <Text style={{ marginLeft: 20 }}  >{item.user.name}</Text> */}
                            </Layout>
                        </Layout>
                    </View>
                )}
            />

            <View style={{ bottom: 0 }}>
                <Input
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)} />
                <Button
                    onPress={onCommentSend}
                >Send</Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    }
})


const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersDataForComment }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);