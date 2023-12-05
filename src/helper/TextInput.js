//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

// create a component
const PrimaryTextInput = ({placeholder, value, onChangeText,textInputStyle,multiline,textInputContainerStyle}) => {
  return (
    <View style={[styles.container,textInputContainerStyle]}>
      <TextInput
        placeholderTextColor={'gray'}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput,textInputStyle]}
        placeholder={placeholder}
        multiline={multiline}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  textInput:{
    width: '80%', margin: 5, color: 'black'
}
});

//make this component available to the app
export default PrimaryTextInput;
