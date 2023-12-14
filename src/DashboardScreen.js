//import liraries
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import PrimaryTextInput from './helper/TextInput';
import DateAndTimePicker from './helper/DateAndTimePicker';

import { load, save } from './helper/storage';
import { showMessage } from 'react-native-flash-message';
import FastImage from 'react-native-fast-image';
import * as ImagePicker from 'react-native-image-picker';
import ImagePickerModal from './helper/ImagePicker';
import { RNCamera } from 'react-native-camera';

export var isOpenDocumentPressed = false;
// create a component
const DashboardScreen = ({ navigation }) => {
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [fileResponse, setFileResponse] = useState([]);
  const [visible, setVisible] = useState(false)
  const [isCameraOpen, setIsCameraOpen] = useState(false);


  useEffect(() => {
    getDate();
  }, []);

  const getDate = async () => {
    const date = moment(new Date()).format('DD-MM-YYYY');
    setDate(date);
  };



  const onPressDataSave = async () => {
    if (!name || !comment) {
      showMessage({
        message: 'Please fill in all the details',
        type: 'danger',
        icon: 'warning',
      });
    } else {
      const data1 = await load('dummyData');
      const newData = {
        date: date,
        name: name,
        comment: comment,
        images: fileResponse,
      };
  
      if (data1 !== null) {
        const data2 = JSON.parse(data1);

        console.log('data2',data2)
        const existingItem = data2.find(item => item.name === name);
  
        if (existingItem) {
          showMessage({
            message: 'Name or ID already exists. Please try another ID or Name.',
            type: 'danger',
            icon: 'warning',
          });
          setName('')
        } else {
          const updatedData = [...data2, newData];
          await save('dummyData', JSON.stringify(updatedData));
          navigation.goBack();
        }
      } else {
        await save('dummyData', JSON.stringify([newData]));
        navigation.goBack();
      }
    }
  };
  

  const openDocument = async () => {
    setVisible(true)
    isOpenDocumentPressed = true;
    await ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 100,quality:1 })
      .then(res => {
        console.log(res)
        isOpenDocumentPressed = false;
        if (fileResponse?.length) {
          let tmp = [...fileResponse, ...res?.assets];

          const uniqueData = tmp.filter((item, index, self) => {
            return self.findIndex(obj => obj.fileName === item.fileName) === index;
          });

          setFileResponse(uniqueData);
          setVisible(false)
        } else {
          setFileResponse(res?.assets);
          setVisible(false)
        }
      })
      .catch(() => {
        isOpenDocumentPressed = false;
      });
  };


  const onPressCamera = async () => {
    const isReadGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (Platform.OS === "ios" ? true : isReadGranted) {
      try {
        await ImagePicker.launchCamera({
          mediaType: "photo",
          cameraType: "back",
          includeExtra: true,
          presentationStyle: "formSheet",
          maxHeight: 500,
          maxWidth: 500,
          saveToPhotos: true,
          quality: 1,
        }).then((res) => {
          if (fileResponse?.length) {
            let tmp = [...fileResponse, ...res?.assets];

            const uniqueData = tmp.filter((item, index, self) => {
              return self.findIndex(obj => obj.fileName === item.fileName) === index;
            });

            setFileResponse(uniqueData);
            setVisible(false)
          } else {
            setFileResponse(res?.assets);
            setVisible(false)
          }
          setVisible(false)
        })
      } catch (error) {
        console.log('error', error)
      }
    }

  }

  const onPressDeleteImage = item => {
    Alert.alert(
      'Are you sure?',
      'If you pick yes, then your selected file will be removed from file list.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            let tmp = fileResponse?.filter(items => {
              if (items?.fileName !== item?.fileName) {
                return item;
              }
            });
            setFileResponse(tmp);
          },
        },
      ],
    );
  };

  const onPreesImage = item => {
    navigation.navigate('Preview', { image: item });
  };


  const onBarcodeScan = (event) => {
    if (event?.data !== '') {
      setName(event?.data);
      setIsCameraOpen(false);
    }
  };

  const renderCamera = () => {
    return (

<>
        <TouchableOpacity
          style={{alignSelf: 'flex-end', margin: 20 }}
          onPress={()=>{setIsCameraOpen(false)}}
        >
          <Image
            source={require('../assest/close.png')}
            style={{ height: 20, width: 20 ,tintColor:'black',resizeMode:'contain'}}
          />
        </TouchableOpacity>
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={onBarcodeScan}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.code128]}
          captureAudio={false}
        />
</>

    );
  };

  useEffect(() => {
    if (isCameraOpen) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [isCameraOpen]);



 

  return (
    <View style={styles.container}>
      {isCameraOpen ?
        renderCamera()
        :
        <>
          <TouchableOpacity
            style={{
              height: 50,
              justifyContent: 'center',
              alignSelf: 'flex-end',
              marginHorizontal: 15,
            }}
            onPress={() => {
              Alert.alert(
                'Are you sure?',
                'If you pick yes, You get back Screen.',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.goBack();
                    },
                  },
                ],
              );
            }}>
            <Image
              source={require('../assest/close.png')}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <View style={{ margin: 10 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center' }}
              onPress={() => {
                setDateModal(true);
              }}>
              <Image
                source={require('../assest/calendar.png')}
                style={{ height: 25, width: 25 }}
              />
              <Text
                style={{ color: 'black', marginHorizontal: 10, fontWeight: '500' }}>
                {date}
              </Text>
            </TouchableOpacity>
          </View>
          <DateAndTimePicker
            visibility={dateModal}
            onPressClose={() => setDateModal(false)}
            mode={'calendar'}
            onPressSave={() => setDateModal(false)}
            current={moment(new Date()).format('YYYY-MM-DD')}
            selected={moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')}
            onSelectedChange={date => {
              setDate(moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY'));
            }}
          />
          <PrimaryTextInput
            value={name}
            placeholder={'Enter a name'}
            onChangeText={value => {
              setName(value);
            }}
            showCameraButton
            onCameraButtonPress={() => setIsCameraOpen(true)}
          />
          <PrimaryTextInput
            placeholder={'Comment'}
            value={comment}
            multiline={true}
            onChangeText={value => {
              setComment(value);
            }}
            textInputContainerStyle={{ height: 100 }}
          />
          <View style={[styles.container1]}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setVisible(true)}>
              <Image
                source={require('../assest/photo.png')}
                style={{ height: 25, width: 25, margin: 5 }}
              />
              <Text
                style={{
                  textAlignVertical: 'center',
                  color: 'black',
                  fontWeight: '500',
                  marginLeft: 15,
                  width: '70%',
                }}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            {fileResponse?.length !== 0 && (
              <View style={[styles.container1]}>
                <FlatList
                  data={fileResponse}
                  renderItem={({ item }) => {
                    console.log(item?.fileName)
                    setTimeout(() => {

                    }, 1000);
                    return (
                      <View
                        style={[
                          styles.container1,
                          {
                            borderWidth: 0,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingVertical: 5,
                            backgroundColor: 'rgba(214, 214, 214, 0.8)',
                          },
                        ]}>
                        <TouchableOpacity
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                          onPress={() => onPreesImage(item?.uri)}>
                          <View
                            style={{
                              marginHorizontal: 10,
                              height: 35,
                              width: 35,
                              borderRadius: 10,
                              alignItems: 'center',
                            }}>
                            <FastImage
                              onLoad={() => {
                                console.log(item?.uri)
                              }}
                              source={{ uri: item?.uri }}
                              style={{
                                height: 35,
                                width: 35,
                                resizeMode: 'contain',
                                borderRadius: 10,
                              }}
                            />
                          </View>
                          <Text
                            numberOfLines={1}
                            style={{ width: '70%', color: 'black' }}>
                            {item?.fileName}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onPressDeleteImage(item)}>
                          <Image
                            source={require('../assest/trash.png')}
                            style={{ height: 25, width: 25, margin: 5 }}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
            )}
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              height: 40,
              width: 100,
              backgroundColor: '#F4722B',
              justifyContent: 'center',
              borderRadius: 10,
              margin: 10,
            }}
            onPress={onPressDataSave}>
            <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
          </TouchableOpacity>
          <ImagePickerModal isVisible={visible} onPressClose={() => { setVisible(false) }} onPressgallery={openDocument} handleOpenCamera={onPressCamera} />
        </>
      }
    </View>

  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  container1: {
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  camera: {
    flex: 1,
  },
});

//make this component available to the app
export default DashboardScreen;
