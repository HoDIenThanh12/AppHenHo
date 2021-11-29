import React, { useState, useEffect } from 'react'
import {View, TextInput, Text, Button,ScrollView,TouchableOpacity, Alert,ToastAndroid,Image, StyleSheet} from "react-native"
import {firebaseApp} from '../Config/Data';
import {db, auth,abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';
import * as ImagePicker  from 'react-native-image-picker'

const edit =({navigation,route})=>{
    const [selectedImage,setSelectedImage]= useState(null)
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }; 
    const PickerUmageHandler=() =>{

        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            if (response.assets) {
              const imageAssetsArray = response.assets[0].uri
             
              setSelectedImage(imageAssetsArray)
              //Alert.alert('ll: '+ selectedImage)
            }
          }
        });
          
        
      }
    const {ids}=route.params;
    //Alert.alert("id: "+ids)

    const [anhDD, setAnhDD]=useState('')
    const [name,setName] = useState('')
    const [tuoi,setTuoi] = useState('')
    const [note,setNote] = useState('')
    const [adress,setAddress] = useState('')
    const [sex,setSex] = useState('Nam')
    const [job,setjob] = useState('')
    const [relationship,setRelationship] = useState('')
    const [heights,setHeights] = useState('')
    const [interests,setInterests] = useState('')
    const [travel,setTravel] = useState('')
    const [personality, setPersonality] = useState('')
    //Alert.alert(items.id)
    const getData = ()=>{

        //ToastAndroid.show('vô?: '+items.id,ToastAndroid.SHORT)
        abb
            .ref('/users/'  )
            .on('value', snapshot => {
                snapshot.forEach(i => {
                    if(i.key==ids)
                    {
                        //Alert.alert(i.val().avatar)
                        let t={
                            ava:i.val().avatar,
                            ten: i.val().ten,
                            tuoi: i.val().tuoi,
                            ghichu: i.val().ghichu,
                            diachi: i.val().diachi,
                            gioitinh: i.val().gioitinh,
                            nghe : i.val().nghe,
                            quanhe: i.val().quanhe,
                            chieucao: i.val().chieucao,
                            sothich: i.val().sothich,
                            dulich: i.val().dulich,
                            tinhcach: i.val().tinhcach,
                        }
                        setSelectedImage(t.ava)
                        setAnhDD(t.ava)
                        setName(t.ten)
                        setTuoi(t.tuoi)
                        setjob(t.nghe)
                        setNote(t.ghichu)
                        setAddress(t.diachi)
                        if(t.gioitinh==0){
                            setSex('Nữ')
                        }
                        
                        setRelationship(t.quanhe)
                        setHeights(t.chieucao)
                        setInterests(t.sothich)
                        setTravel(t.dulich)
                        setPersonality(t.tinhcach)
                    }
                    
                    
                })

            });
    }
    useEffect(getData,[]);
    //Alert.alert(ids)
    const capnhat= async()=>{
        Alert.alert(adress)
        await abb.ref('/users/'+ids).update({
            avatar:anhDD,
            ten: name,
             tuoi: tuoi,
            ghichu: note,
            diachi: adress,
            nghe : job,
            quanhe: relationship,
             chieucao: heights,
            sothich: interests,
            dulich: travel,
            tinhcach: personality,
        })
    }
    return (
        <View style={{flex:1, justifyContent:"center", alignItems: "center", backgroundColor:'#f5f5f5'}}>
            <ScrollView style={{flex:1, width:'90%' }}>
                <View style={{ padding:30, alignItems: "center",backgroundColor:'white', height:380,elevation: 10, borderBottomEndRadius:20,borderBottomLeftRadius:20 }}>
                    
                    <Image style={{height:height(28), width:width(55), borderRadius:200, backgroundColor:'red' }} source={{uri:selectedImage+''}} />
                    <TouchableOpacity
                        onPress={PickerUmageHandler} 
                    >
                    <Image style={{ height:height(5), width:width(10), marginTop:-height(6),marginLeft:width(31)}} source source={require('../Image/Button/photo.png')} />
                    </TouchableOpacity>
                    <View style={{alignItems: "center", marginTop:10, width:300}}>
                        <View style={{display: 'flex',flexDirection:'row',}}>
                            <Text style={{fontSize:17, marginTop:10 }}>Tên: </Text>
                            <TextInput  placeholder='NHập nội dung...' value={name} onChangeText={text=>setName(text)} />
                        </View>
                        <View style={{display: 'flex',flexDirection:'row',}}>
                            <Text style={{fontSize:17, marginTop:10 }}>Ghi chú: </Text>
                            <TextInput  placeholder='NHập nội dung...' value={note} onChangeText={text=>setNote(text)} />
                        </View>
                    </View>
                    {/* <View style={{display: 'flex',flexDirection:'row',justifyContent:'space-between', padding:5, marginTop:20}} >
                        <TouchableOpacity style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10}}>
                            <Text>CHỉnh sữa thông itn</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10}}>
                            <Text>CHỉnh sữa thông itn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{justifyContent:"center",alignItems: "center",width:100, backgroundColor:'pink', margin:10}}>
                            <Text>CHỉnh sữa thông itn</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={{ padding:30, backgroundColor:'white',elevation: 10, width:'100%', height:500, marginTop:30, fontSize:200, borderRadius:20}}>
                    <Text style={{fontSize:20 }}>Miêu tả bản thân</Text>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17 , marginTop:10}}>Tuổi: </Text>
                        <TextInput style={styles.input}  placeholder='NHập nội dung...' value={tuoi} onChangeText={text=>setTuoi(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17 , marginTop:10}}>Giưới tính: {sex}</Text>
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17 , marginTop:10}}>Nghệ nghiệp: </Text>
                        <TextInput style={styles.input} placeholder='NHập nội dung...' value={job} onChangeText={text=>setjob(text)} />
                        
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Địa chỉ: </Text>
                        <TextInput  placeholder='NHập nội dung...' value={adress} onChangeText={text=>setAddress(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Quan hệ: </Text>
                        <TextInput style={styles.input}  placeholder='NHập nội dung...' value={relationship} onChangeText={text=>setRelationship(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Chiều cao: </Text>
                        <TextInput style={styles.input} placeholder='NHập nội dung...' value={heights} onChangeText={text=>setHeights(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Sở thích: </Text>
                        
                        <TextInput style={styles.input} placeholder='NHập nội dung...' 
                        value={interests} 
                        onChangeText={text=>setInterests(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Tính cách: </Text>
                        <TextInput style={styles.input} placeholder='NHập nội dung...' value={personality} onChangeText={text=>setPersonality(text)} />
                    </View>
                    <View style={{display: 'flex',flexDirection:'row',}}>
                        <Text style={{fontSize:17, marginTop:10 }}>Du lịch: </Text>
                        <TextInput style={styles.input} placeholder='NHập nội dung...' value={travel} onChangeText={text=>setTravel(text)} />
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent:"center", alignItems: "center",backgroundColor:'#fafad2',  marginTop:30, width:'90%', marginLeft:15, borderRadius:20,elevation: 10, }}>
                    <TouchableOpacity 
                    style={{flexDirection:'row',justifyContent:"center",padding:10,alignItems: "center",width:120, backgroundColor:'pink', margin:10,borderRadius:20,elevation: 10, }}
                    onPress={()=>capnhat()}>
                    <Image style={{height:30, width:30}} source={require('../Image/Button/image.png')}
                        />
                        <Text>Cập nhật hồ sơ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        
                        style={{flexDirection:'row',justifyContent:"center",alignSelf:'flex-end',width:120, backgroundColor:'pink',padding:10, margin:10,borderRadius:20,elevation: 10,}}>
                        <Image style={{height:30, width:30}} source={require('../Image/Button/image.png')}/>
                        <View style={{justifyContent:"center", alignItems:'center'}}>
                            <Text style={{width:80, }} >Hủy cập nhật</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{height:50}}></View>
            </ScrollView>
            
        </View>
    )
}
export default edit
const styles= StyleSheet.create({
    input:{
        fontSize:15, 
    }
})