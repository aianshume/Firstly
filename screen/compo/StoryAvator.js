import React from 'react';
import {View, TouchableWithoutFeedback, Image, StyleSheet} from 'react-native';

export default function StoryAvator(props) {
    return (
      <View>
            <TouchableWithoutFeedback onPress={()=> 
            console.log('story clicked')
            }>
                    <Image source={{uri: props.imageUrl}} style={styles.sotryImage}/>
            </TouchableWithoutFeedback>
      </View>
    );
}

const styles = StyleSheet.create({
    sotryImage : {
      width: 70,
      height: 70,
      overflow: 'hidden',
      borderRadius: 10,
      marginLeft: 7,
      marginRight: 7,
      marginTop : 10
    }

})