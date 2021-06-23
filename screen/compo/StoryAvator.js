import React from 'react';
import {View, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';
import { Avatar } from 'react-native-paper';

export default function StoryAvator(props) {
    return (
      <View>
            <TouchableWithoutFeedback onPress={()=> 
            console.log('story clicked')
            }>
                      <Avatar.Image size={54} source={{uri: props.imageUrl}} style={styles.sotryImage} />
            </TouchableWithoutFeedback>
      </View>
    );
}

const styles = StyleSheet.create({
    sotryImage : {
      marginLeft: 7,
      marginRight: 7,
      marginTop : 10
    }

})