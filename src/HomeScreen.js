import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList, 
  Alert,

} from 'react-native';
import { load, save } from './helper/storage';
import { useFocusEffect } from '@react-navigation/native';
import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';
import PrimaryTextInput from './helper/TextInput';
import { RNCamera } from 'react-native-camera';

const HomeScreen = ({ navigation }) => {

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
    const searchList = userData?.filter((item) => {
      return (
        item?.name?.toLowerCase()?.includes(text?.toLocaleLowerCase()) ||
        item?.date?.includes(text?.toLocaleLowerCase()) ||
        item?.comment?.toLowerCase()?.includes(text?.toLocaleLowerCase())
      );
    });

    if (isEmpty(searchList)) {
      setResponce(responce);
    } else if (!isEmpty(searchList)) {
      setResponce(searchList);
    }

    setSearchText(text);
  };

  const deleteItem = async (items) => {
    Alert.alert('Are you sure?', 'If you pick yes, then your selected file will be removed from the file list.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          let tmp = userData?.filter((item) => item?.name !== items?.name)
          setResponce(tmp);
          setUserData(tmp);
          setUpdateState(!updateState);
          await save('dummyData', JSON.stringify(tmp));
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

      <>
        <TouchableOpacity
          style={{ alignSelf: 'flex-end', margin: 20 }}
          onPress={() => { setIsCameraOpen(false) }}
        >
          <Image
            source={require('../assest/close.png')}
            style={{ height: 20, width: 20, tintColor: 'black', resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <RNCamera
          style={styles.camera}
          type={'back'}
          onBarCodeRead={onBarcodeScan}
          barCodeTypes={['code128','qr','code39']}
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
                      deleteItem(item,index);
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