import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  AppState,
} from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import { load, save } from './helper/storage';
import { useFocusEffect} from '@react-navigation/native';
import { isEmpty } from 'lodash';
import FastImage from 'react-native-fast-image';

const HomeScreen = ({ navigation, route }) => {
  const [responce, setResponce] = useState([]);
  const [userData, setUserData] = useState([]);
  const [updateState, setUpdateState] = useState(false);

  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    React.useCallback(async () => {
      var data1 = await load('dummyData');
      setSearchText('');
      setResponce(JSON.parse(data1));
      setUserData(JSON.parse(data1));
    }, []),
  );

  const searchProjectItem = async text => {
    const searchList = responce?.filter((item) => {
      console.log('iteem', item)
      return item?.name?.toLowerCase()?.match(text?.toLocaleLowerCase()) || item?.date?.includes(text?.toLocaleLowerCase()) || item?.comment?.match(text)
    });
    if (!isEmpty(searchList)) {
      setResponce(searchList);
    }
    if (text == '') {
      setResponce(userData);
    }
    setSearchText(text);
  };

  const deleteItem = async index => {
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
          onPress: async () => {
            let UpdateArr = responce;
            UpdateArr.splice(index, 1);
            setResponce(UpdateArr);
            setUpdateState(!updateState);
            await save('dummyData', JSON.stringify(UpdateArr));
          },
        },
      ],
    );
  };

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
            <TextInput
              placeholderTextColor={'gray'}
              style={{ width: '90%', color: 'black',paddingHorizontal:5,borderRadius:10,backgroundColor:'#cfcdc8'}}
              value={searchText}
              onChangeText={text => {
                searchProjectItem(text);
              }}
              placeholder="Search"
            />
            <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
              <Image
                source={require('../assest/add.png')}
                style={{ height: 20, width: 20 }}
              />
            </TouchableOpacity>
          </View>

          {responce?.length == 0 || responce == null ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'gray', textAlign: 'center' }}>
                No Data Found
              </Text>
            </View>
          ) : (
            <FlatList
              data={responce}
              renderItem={({ item, index }) => {
                console.log('item', item?.images[0]?.uri)
                setTimeout(() => {
                  
                }, 1000);
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
                        {item?.images[0]?.uri == undefined ?
                          <Image source={require('../assest/no-pictures.png')} style={{ height: 40, width: 40, resizeMode: 'contain', borderRadius: 10 }} />
                          :
                          <FastImage 
                          onLoad={()=>{
                            console.log(item?.images[0]?.uri)
                          }}
                          source={{ uri: item?.images[0]?.uri }} style={{ height: 40, width: 40, resizeMode: 'contain', borderRadius: 10 }} />
                        }
                      </View>
                      <View style={{ marginHorizontal: 15, width: '90%' }}>
                        <Text style={styles.fontStyle}>
                          {item.name}
                        </Text>
                        <Text style={styles.fontStyle}>{item.date}</Text>
                        <Text style={styles.fontStyle} numberOfLines={1} >{item.comment}</Text>
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
  }
});

export default HomeScreen;
