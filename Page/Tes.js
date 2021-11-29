import React, {Component, useEffect, useState} from 'react';
import {ActivityIndicator, View, Button, Alert, Image} from 'react-native';
import {db, auth, abb, abbImage} from '../Config/Data';
import {utils} from '@react-native-firebase/app';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firebase from 'firebase';
export default function Tes() {
  const [urlImgs, seturlImgs] = useState('');
  // create bucket storage reference to not yet existing image
  const [selectedImage, setSelectedImage] = useState(null);
  const options = {
    title: 'Select Avatar',
    customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const puImage = ()=> {
    const {uri} = selectedImage;
    const fileName = selectedImage.substring(
      selectedImage.lastIndexOf('/') + 1,
    );
    const unLink = selectedImage;

    const k = fileName.split('.')[0];
    let l = 'Anh/' + fileName;
    // console.log('sau sắt:   ' + fileName);
    const ref = storage().ref('Anh/' + fileName);
    const task = ref.putFile(selectedImage);

    task.then(async () => {
      const url = await ref.getDownloadURL();
      // onSuccess(url)
      console.log('dương link :' + url)
    })
  };
  const puImages = async () => {
    //Alert.alert('dc anh: '+ selectedImage.substring(selectedImage.lastIndexOf('/') + 1))
    const {uri} = selectedImage;
    const fileName = selectedImage.substring(
      selectedImage.lastIndexOf('/') + 1,
    );
    const unLink = selectedImage;

    const k = fileName.split('.')[0];
    let l = 'Anh/' + fileName;
    // console.log('sau sắt:   ' + fileName);
    const ref = storage().ref('Anh/' + fileName);
    const task = ref.putFile(selectedImage);

    task.then(async () => {
      const url = await ref.getDownloadURL();
    });
    const pushImg = async fileName => {
      var limnk = '';
      await storage().ref('Anh/' + fileName);
      putFile(selectedImage).then(async () => {
        console.log('da push xong :' + fileName);
        const url = await storage()
          .ref('Anh/' + fileName)
          .getDownloadURL()
          .then(() => {
            let i = url + '234234';
            let x = Object.values(i);
            seturlImgs(url);
            console.log('ok lấy link  :' + i);
          });
      });
    };
    console.log('dương dan ang  :' + fileName);

    const getUrl = async fileName => {
      const url = await pushImg(fileName);
    };
    getUrl(fileName);

    // try {
    //   await up;
    //   link(fileName);
    //   // await storage().ref('Anh/rn_image_picker_lib_temp_e4a86d1c-f269-45d1-8962-78f8f7fca114.jpg').getDownloadURL();
    //   //   console.log('dường dân link: '+urll)

    //   Alert.alert('lấy link thành công: ');
    // } catch (e) {
    //   console.log('lội load ảnh');
    // }

    //storage().ref('gs://chat-479b1.appspot.com/text.jpg')
    //.putFile(selectedImage);
  };

  // const link = async name => {
  //   await storage()
  //     .ref(
  //       'Anh/rn_image_picker_lib_temp_e4a86d1c-f269-45d1-8962-78f8f7fca114.jpg',
  //     )
  //     .getDownloadURL();
  //   //   console.log('dường dân link: '+urll)
  // };
  const PickerUmageHandler = () => {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.assets) {
          const imageAssetsArray = response.assets[0].uri;

          setSelectedImage(imageAssetsArray);
          //Alert.alert('ll: '+ selectedImage)
        }
      }
    });
  };
  let img =
    selectedImage == null ? null : (
      <Image
        source={{uri: selectedImage}}
        style={{height: 200, width: 200}}></Image>
    );
  //gs://chat-479b1.appspot.com/
  //console.log("image: " +selectedImage)
  return (
    <View>
      <Button title="chịn hình" onPress={() => PickerUmageHandler()}></Button>
      {img}
      <Button title="put" onPress={() => puImage()}></Button>
    </View>
  );
}
