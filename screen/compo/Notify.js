import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const Notify = (props) => {
    return (
        <View style={styles.box}>
        <Image source={{uri: props.avatorImg}} style={styles.avator}/>
        <View style={{flexDirection: 'column', marginLeft: 10, }}>
        <Text style={{fontWeight: 'bold'}}>{props.channelName}</Text>
        <Text>{props.title}</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    box : {
        flexDirection: 'row',
        justifyContent : 'flex-start',
        marginBottom: 20
    },
    avator : {
        height : 52,
        width : 52,
        overflow : 'hidden',
        borderRadius : 50,
    }
})

export default Notify;