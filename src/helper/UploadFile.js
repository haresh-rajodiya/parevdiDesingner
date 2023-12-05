import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Platform,
  Modal
} from "react-native";

import { PermissionsAndroid } from "react-native";


const UploadFileModal = ({
  onPressCancel,
  onPressCamera,
  openGallary,
  opationsModal
}) => {
  // const [fileResponse, setFileResponse] = useState(selectedFile || []);

  // const onPressCamera = useCallback(async () => {
  //   const isReadGranted = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.CAMERA
  //   );

  //   if (Platform.OS === "ios" ? true : isReadGranted) {
  //     try {
  //       await launchCamera({
  //         mediaType: "photo",
  //         cameraType: "back",
  //         includeExtra: true,
  //         presentationStyle: "formSheet",
  //         maxHeight: '50%',
  //         maxWidth: '50%',
  //         saveToPhotos: true,
  //       }).then((res) => {
  //         setTimeout(() => {
  //           setOpationsModal(false);
  //           //  setVisible(true);
  //         }, 500);
  //         let tmp = res.assets.map((item) => {
  //           return {
  //             ...item,
  //             name: item?.fileName,
  //           };
  //         });
  //         setFileResponse([...fileResponse, ...tmp]);
  //         onPressSave([...fileResponse, ...tmp]);
  //       });
  //     } catch (err) {
  //       onPressCancel();
  //       setOpationsModal(false);
  //     }
  //   }
  // }, [fileResponse]);



  return (
    <>
      <Modal animationType="fade" transparent={true} visible={opationsModal}>
        <View style={[styles.centeredView]}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.selectionOpationModal}
              onPress={onPressCamera}
            >
              <Image
                source={require('../../assest/camera.png')}
                style={[styles.selectionIcons, selectionIcons]}
              />
              <Text style={[styles.lableSlecationModal, lableSlecationModal]}>
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.selectionOpationModal}
              onPress={openGallary}
            >
              <Image
                source={require('../../assest/galleryIcon.png')}
                style={[styles.selectionIcons, selectionIcons]}
              />
              <Text style={[styles.lableSlecationModal, lableSlecationModal]}>
                Choose From Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onPressCancel}
              style={[
                styles.selectionOpationModal,
                { borderBottomWidth: hp(0) },
              ]}
            >
              <Image
                source={require('../../assest/galleryIcon.png')}
                style={[
                  styles.selectionIcons,
                  selectionIcons,
                  { height: hp(3), width: hp(3), marginLeft: hp(2.5) },
                ]}
              />
              <Text style={[styles.lableSlecationModal, lableSlecationModal]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 10,
    width: '40%',
    backgroundColor: 'white',
    borderRadius: 20,

    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  hitSlop: {
    left: 5,
    right: 5,
    bottom: 5,
    top: 5,
  },
 
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
 


  confairmationButtonFont: {


  },
  confairmationButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    height: 20,
    width: 20,
    tintColor: 'gray',
  },
  selectionOpationModal: {
    height: 20,
    alignItems: "center",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderColor:'gray',
    marginVertical: 5,
  },
  selectionIcons: {
    height: 20,
    width: 20,
    marginLeft: 20,
    tintColor: 'orange',
    marginVertical: 5,
  },
  lableSlecationModal: {

    color: 'black',
    fontSize: 14,
    marginLeft:10,
  },
});

export default UploadFileModal;
