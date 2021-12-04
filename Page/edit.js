import React, { useState, useEffect } from 'react'
import {Modal,Pressable,View, TextInput, Text, Button,ScrollView,TouchableOpacity, Alert,ToastAndroid,Image, StyleSheet, FlatList} from "react-native"
import {firebaseApp} from '../Config/Data';
import {db, auth,abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';
import * as ImagePicker  from 'react-native-image-picker'
import storage from '@react-native-firebase/storage';

const edit =({navigation,route})=>{
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage,setSelectedImage]= useState(null)
    const [selectedImage1,setSelectedImage1]= useState(null)
    const [urlI,setUrLi] = useState(null)
    const [urlI1,setUrLi1] = useState(null)
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }; 
    const PickerUmageHandler=(p) =>{
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
              p==1?setSelectedImage(imageAssetsArray)
              :setSelectedImage1(imageAssetsArray)
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
    const [urlImgs, seturlImgs] = useState('');
    const [lImage,setLImage]= useState([])
    //Alert.alert(items.id)
    const getImage=async()=>{
      abb
            .ref('/users/' +ids+'/anh/' )
            .on('value', snapshot => {
                let l=[]
                snapshot.forEach(i => {
                  l.push(i.val().link)
                  console.log('link: '+i.val().link)
                })
                console.log('sádf  '+ l)
                setLImage(l)
            });
            console.log('sádf  '+ lImage.indexOf(1))
    }
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
                getImage();
                console.log('jkj:   '+lImage[0])
            });
            
    }
    useEffect(getData,[]);
    //Alert.alert(ids)
    //lưu lên database và lấy link
    const puImage = (t)=> {
        const {uri} = t==1?selectedImage:selectedImage1;
        const fileName = t==1? selectedImage.substring(
          selectedImage.lastIndexOf('/') + 1,
        ):selectedImage1.substring(
          selectedImage1.lastIndexOf('/') + 1,
        ) 
        const unLink = t==1? selectedImage:selectedImage1;
    
        const k = fileName.split('.')[0];
        let l = 'Anh/' + fileName;
        // console.log('sau sắt:   ' + fileName);
        const ref = storage().ref('Anh/' + fileName);
        const task =  ref.putFile(t==1?selectedImage:selectedImage1);
    
        task.then(async () => {
          const url = await ref.getDownloadURL()
          // onSuccess(url)
          t===1? setUrLi(url) : setUrLi1(url)
          let y=url;
          t==1? Insert(y):Post(y)
          console.log('dương link :' + y)
          //Alert.alert(url)
        })
      };
    //thay đổia nhr đại diện và lấy link ảnh
    const capnhat= async()=>{
      let t=1
        puImage(t);
    }
    //Cập nhật ảnh đại diện với các nội dung
    const Insert= async(y)=>{ 
      console.log('Cập nhật:  '+selectedImage)   
       // Alert.alert('Cập nhật hồ sơ: '+y)
        await abb.ref('/users/'+ids).update({
            avatar: y==null?anhDD:y,
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
        ToastAndroid.show('Cập  nhật thành công!',ToastAndroid.SHORT)
    }
    //đăng hình ảnh lên tài khoản
    const Danghinh= async(y)=>{
      let t=2
      selectedImage1==null?Alert.alert('Bạn chưa chọn hình ảnh?'):
      puImage(t);
    }
    //post ảnh đăng
    const Post=async(y)=>{
      //Alert.alert('đã đăn hình: '+y)
      console.log('Đăng hình: '+selectedImage)
      selectedImage==null?Alert.alert('Bạn chưa chọn hình?')
      : abb.ref('/users/'+ids+'/anh/').push().set({
        link:y
      })
      ToastAndroid.show('Đăng hình thành công',ToastAndroid.SHORT)
    }
    return (
        <View style={{flex:1, justifyContent:"center", alignItems: "center", backgroundColor:'#f5f5f5'}}>
            <ScrollView style={{flex:1, width:'90%' }}>
              <View>
                {lImage.map((link)=>{
                    <Image style={{height:200, width:200}} source={{uri: link}} />
                })}
              </View>
              
                <View style={{ padding:30, alignItems: "center",backgroundColor:'white', height:380,elevation: 10, borderBottomEndRadius:20,borderBottomLeftRadius:20 }}>
                    
                    <Image style={{height:height(28), width:width(55), borderRadius:200, backgroundColor:'red' }} source={{uri:selectedImage+''}} />
                    <TouchableOpacity
                        onPress={()=>PickerUmageHandler(1) }
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
                <View style={{ padding:30, backgroundColor:'white',elevation: 10, width:'100%', height:600, marginTop:30, fontSize:200, borderRadius:20}}>
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
                <View style={{ paddingTop:10, backgroundColor:'white',elevation: 10, width:'100%',  marginTop:30, fontSize:200, borderRadius:20}}>
                <TouchableOpacity 
                        
                        style={{flexDirection:'row',justifyContent:"center",alignSelf:'center',width:120, backgroundColor:'pink',padding:10, margin:10,borderRadius:20,elevation: 10,}}
                        onPress={() =>setModalVisible(true)}>
                        <Image style={{height:30, width:30}} source={require('../Image/Button/image.png')}/>
                        <View style={{justifyContent:"center", alignItems:'center'}}>
                            <Text style={{width:80, }} >Đăng hình</Text>
                        </View>
                    </TouchableOpacity>
                    
                    {/* <FlatList
                          data={lImage}
                          renderItem={renderItem}
                          keyExtractor={item => item.id}
                      /> */}
                    <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{flexDirection:'row',}}>
                                <Text style={styles.modalText}>Chọn hình ảnh </Text>
                                <TouchableOpacity
                                    onPress={()=>PickerUmageHandler(2)} 
                                >
                                <Image style={{ height:height(5), width:width(10), marginTop:-height(1)}} source source={require('../Image/Button/photo.png')} />
                                </TouchableOpacity>
                            </View>
                            
                            <Image style={{height:height(20), width:width(60), backgroundColor:'#dcdcdc', borderRadius:20}}
                             source={{uri: selectedImage1}}/>
                            <View style={{flexDirection:'row', padding:10 }}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => Danghinh()}
                                >
                                    <Text style={styles.textStyle}>Hoàn tất</Text>
                                </TouchableOpacity>
                                <Text>   </Text>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {setSelectedImage1(null),setModalVisible(!modalVisible)}}
                                >
                                    <Text style={styles.textStyle}>Thoát</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "#f0fff0",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})