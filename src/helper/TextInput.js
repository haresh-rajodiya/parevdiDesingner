// import liraries
import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';

// create a component
const PrimaryTextInput = ({
  placeholder,
  value,
  onChangeText,
  textInputStyle,
  multiline,
  textInputContainerStyle,
  showCameraButton,
  onCameraButtonPress,
  autoCapitalize,
  autoCorrect
}) => {
  return (
    <View style={[styles.container, textInputContainerStyle]}>
      <TextInput
        placeholderTextColor={'gray'}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, textInputStyle]}
        placeholder={placeholder}
        multiline={multiline}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
      />
      {showCameraButton && (
        <TouchableOpacity onPress={onCameraButtonPress} style={styles.cameraButton}>
         <Image
              source={require('../../assest/camera.png')}
              style={styles.icons}
            />
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  textInput: {
    flex: 1,
    margin: 5,
    color: 'black',
  },
  cameraButton: {
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  cameraButtonText: {
    fontSize: 20,
  },
  icons:{
    height: 20,
    width: 20,
    tintColor: 'black',
    marginHorizontal: 5,
    alignSelf:'center',
    resizeMode:'contain'
  }
});

// make this component available to the app
export default PrimaryTextInput;
