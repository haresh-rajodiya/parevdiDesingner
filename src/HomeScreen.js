import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  BackHandler,
} from 'react-native';
import { load, save } from './helper/storage';
import { useFocusEffect } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';
import PrimaryTextInput from './helper/TextInput';
import { RNCamera } from 'react-native-camera';

const HomeScreen = ({ navigation, route }) => {
  const [responce, setResponce] = useState([]);
  const [userData, setUserData] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  useFocusEffect(
    React.useCallback(async () => {
      var data1 = await load('dummyData');
      setSearchText('');
      setResponce(JSON.parse(data1));
      setUserData(JSON.parse(data1));
     
    }, []),
  );

  const searchProjectItem = async (text) => {
    const searchList = responce?.filter((item) => {
      return (
        item?.name?.toLowerCase()?.includes(text?.toLocaleLowerCase()) ||
        item?.date?.includes(text?.toLocaleLowerCase()) ||
        item?.comment?.toLowerCase()?.includes(text?.toLocaleLowerCase())
      );
    });

    if (text === '') {
      setResponce(userData);
    } else if (!isEmpty(searchList)) {
      setResponce(searchList);
    }

    setSearchText(text);
  };

  const deleteItem = async (index) => {
    Alert.alert('Are you sure?', 'If you pick yes, then your selected file will be removed from the file list.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          let UpdateArr = responce;
          UpdateArr.splice(index, 1);
          setResponce(UpdateArr);
          setUpdateState(!updateState);
          await save('dummyData', JSON.stringify(UpdateArr));
        },
      },
    ]);
  };

  const onBarcodeScan = (event) => {
    if (event?.data !== '') {
      setSearchText(event?.data);
      searchProjectItem(event?.data)
      setIsCameraOpen(false);
    }
  };
  const renderCamera = () => {
    return (
        <RNCamera
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={onBarcodeScan}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr, RNCamera.Constants.BarCodeType.code128]}
          captureAudio={false}
        />
    );
  };

  useEffect(() => {
    setIsCameraOpen(false)
    if (isCameraOpen) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [isCameraOpen]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 70,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <PrimaryTextInput
            placeholderTextColor={'gray'}
            textInputContainerStyle={{
              width: '90%',
              color: 'black',
              paddingHorizontal: 5,
              borderRadius: 10,
              backgroundColor: '#cfcdc8',
            }}
            value={searchText}
            onChangeText={(text) => {
              searchProjectItem(text);
            }}
            showCameraButton
            placeholder="Search"
            onCameraButtonPress={() => setIsCameraOpen(true)}
          />
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('Dashboard')}>
            <Image
              source={require('../assest/add.png')}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
        </View>

        {isCameraOpen ? (
          renderCamera()
        ) : (
          <FlatList
            data={responce}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.container}>
                  <TouchableOpacity
                    style={{ width: '75%', flexDirection: 'row' }}
                    onPress={() => {
                      const data = {
                        item: item,
                        index: index,
                      };
                      navigation.navigate('UserData', { userData: data });
                    }}>
                    <View style={{ justifyContent: 'center' }}>
                      {item?.images[0]?.uri == undefined ? (
                        <Image
                          source={require('../assest/no-pictures.png')}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            borderRadius: 10,
                          }}
                        />
                      ) : (
                        <FastImage
                          source={{ uri: item?.images[0]?.uri }}
                          style={{
                            height: 40,
                            width: 40,
                            resizeMode: 'contain',
                            borderRadius: 10,
                          }}
                        />
                      )}
                    </View>
                    <View style={{ marginHorizontal: 15, width: '90%' }}>
                      <Text style={styles.fontStyle}>{item.name}</Text>
                      <Text style={styles.fontStyle}>{item.date}</Text>
                      <Text style={styles.fontStyle} numberOfLines={1}>
                        {item.comment}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      deleteItem(index);
                    }}>
                    <Image
                      source={require('../assest/trash.png')}
                      style={{ height: 25, width: 25, margin: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#cfcfcf',

  },
  fontStyle: {
    color: 'black',
  },
  camera: {
    flex: 1,
  },
});

export default HomeScreen;