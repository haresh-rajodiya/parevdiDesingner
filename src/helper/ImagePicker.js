import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const ImagePickerModal = ({
  isVisible,
  handleOpenCamera,
  onPressgallery,
  onPressClose
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'rgba(26, 23, 24, 0.7)'}}>
        <View
          style={{
            width: '80%',
            padding:5,
          }}>
          <TouchableOpacity
            onPress={handleOpenCamera}
            style={styles.buttonContianer}>
            <Image
              source={require('../../assest/camera.png')}
              style={styles.icons}
            />
            <Text style={styles.font}>Open Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressgallery}
            style={styles.buttonContianer}>
            <Image
              source={require('../../assest/galleryIcon.png')}
              style={styles.icons}
            />
            <Text style={styles.font}>select from Gallary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressClose}
            style={styles.buttonContianer}>
            <Image
              source={require('../../assest/close.png')}
              style={[styles.icons,{height:15,width:15}]}
            />
            <Text style={[styles.font,{marginLeft:3}]}>Close</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  font: {
    textAlignVertical: 'center',
    color: 'black',
    fontWeight: '400',
    width: '70%',
  },
  buttonContianer: {
    marginTop: 10,
    height: 40,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:10,
    backgroundColor: 'white',
    borderRadius:10
  },
  icons:{
    height: 20,
    width: 20,
    tintColor: 'orange',
    marginHorizontal: 10,
    alignSelf:'center'
  }
});
export default ImagePickerModal;
