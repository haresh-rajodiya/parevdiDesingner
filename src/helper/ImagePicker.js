//import liraries
import React, { Component, useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DocumentPicker from "react-native-document-picker";
// create a component


const ImagePickerModal = ({onPressImagePicker,onPressDelete,selectedFile}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={onPressImagePicker}>
            <Image source={require('../../assest/photo.png')} style={{height:25,width:25,margin:5}}/>
            <Text style={{textAlignVertical:'center',color:'white',fontWeight:'600',marginLeft:15,width:'70%'}}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDelete}>
            <Image source={require('../../assest/trash.png')} style={{height:25,width:25,margin:5}}/>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        borderWidth:1,
        borderRadius:10,
        margin:5,
        padding:2,
        flexDirection:'row',
        justifyContent:'space-between'
      },
});

//make this component available to the app
export default ImagePickerModal;
