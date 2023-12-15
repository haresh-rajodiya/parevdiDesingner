//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import FastImage from 'react-native-fast-image';

// create a component
const PreviewImageScreen = ({navigation,route}) => {
const image = route?.params?.image
    return (
        <View style={styles.container}>
             <TouchableOpacity
              style={{alignSelf: 'flex-end', margin: 20}}
              onPress={()=>{navigation.goBack()}}>
              <Image
                source={require('../assest/close.png')}
                style={{height: 20, width: 20}}
                tintColor={'white'}
              />
            </TouchableOpacity>
            <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'black',alignItems:'center'}}>
            <FastImage
            source={{uri:image}} style={{width:'100%',height:'100%',resizeMode:"contain"}} />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});

//make this component available to the app
export default PreviewImageScreen;
