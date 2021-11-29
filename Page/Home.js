import React, { Component, useState, useEffect} from "react";
import {View, TextInput, Text, Button, Image,ToastAndroid,FlatList,TouchableOpacity,StyleSheet, Alert, ImageBackground } from "react-native"
import {db, auth,abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';
const Home =({navigation,route})=>{
    const {id}=route.params;
    const [data, setData]=useState([]);
    const [nameUser,setNameUser]= useState('')
    const [tuoiUser,setTuoiUser]= useState('')
    const [avatarUser,setAvatarUser]= useState('')
    const [tongthich, setTongthich]= useState('')
    const [adres,setAdres]= useState('')
    const getData =  () => {
            abb
            .ref('/users/' )
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(i => {
                    if(i.key==id){
                        setNameUser(i.val().ten);
                        setTuoiUser(i.val().tuoi);
                        setAvatarUser(i.val().avatar);
                        setAdres(i.val().diachi);
                    }
                    else{
                        let t = {
                            id: i.key,
                            ten: i.val().ten,
                            tuoi: i.val().tuoi,
                            ghichu: i.val().ghichu,
                            diachi: i.val().diachi,
                            gioitinh: i.val().gioitinh,
                            nghe : i.val().nghe,
                            quanhe: i.val().quanhe,
                            chieucao: i.val().chieucao,
                            sothich: i.val().sothich,
                            tthai: i.val().tthai,
                            avatar: i.val().avatar,
                            luotthich: i.val().luotthich,
                        }
                        arr.push(t);
                    }
                    
                    //console.log('User data: ', t.id);
                })
                setData(arr);
            });
    }
    useEffect(getData, []);
    const chat=(item)=>{
        //Alert.alert(id+ " | " + item.id)

        navigation.navigate('Chat',{userId:id,avatarUser:avatarUser,nameUser:nameUser,tuoiUser:tuoiUser, items:item})
    }
    const LikeImage=async(item)=>{
        //Alert.alert('/users/'+id+'/myLikeImage')
        let lke=1;
        console.log('/users/'+id+'/myLikeImage/ "| ')
        // Alert.alert('nhấn like')
       
        abb
           .ref('/users/'+id+'/myLikeImage/' )
           .on('value', snapshot =>{
               snapshot.forEach(bienn=>{

                   if(item.id==bienn.val().idduoclike){
                       lke=0;
                   }
                   console.log(bienn.key +'iddclike: '+bienn.val().idduoclike)
               })
           })
        if(lke==0){
            ToastAndroid.show('Bạn đã like rồi!',ToastAndroid.SHORT)
            //return true
        }
        else{
            Mylike(item);
            let count= parseInt(item.luotthich)+1
            const newReference = abb.ref('/users/'+ item.id).update({
                luotthich:count
            })
            ToastAndroid.show('Bạn đã like thành công!',ToastAndroid.SHORT)
            //return false
        }
    }
    
    const Mylike= async  (item)=>{
        //Alert.alert(''+item.luotthich)
        const newReference = abb
            .ref('/users/'+ id+'/myLikeImage').push()
        await newReference.set({
                idduoclike:item.id,
                tenduoclike: item.ten,
                avatarduoclike: item.avatar,
                tuoiduoclike: item.tuoi,
                diachiduoclike: item.diachi,
            })
         PeopleLike(item.id)
    }
    const PeopleLike= async (idu)=>{
        const newReference = abb
        .ref('/users/'+ idu+'/peopleLikeImage').push();
        await newReference.set({
            iduserlike:id,
            tenuserlike: nameUser,
            avataruserlike: avatarUser,
            tuoiuserlike: tuoiUser,
            diachiuserlike: adres,
        })
        
    }
    const CountLike= async  (item)=>{
        let count= parseInt(item.luotthich)+1
        Alert.alert(''+count)
        const newReference = abb.ref('/users/'+ item.id).update({
            luotthich:count
            })
        // PeopleLike(item.id)
    }
    const abouteUser=(item)=>{
        //Alert.alert("xem thông tin")
        navigation.navigate('EditAbout',{items:item})
    }
    const renderItem=({item})=>{
        return(
            <View style={{borderRadius:10,elevation: 10, width:width(90),borderColor:'#ffe4e1',borderWidth: 1, marginTop:20,backgroundColor:'#fffff0'}} >
                <View style={{backgroundColor:'#ffe4e1',borderTopRightRadius:10, borderTopLeftRadius:10}}>
                    <Text style={{ marginLeft:10, fontSize:20,fontWeight: "bold",}}>{item.ten}</Text>
                </View>
                <ImageBackground  >
                    <TouchableOpacity onPress={()=>abouteUser(item)} style={{}}>
                        <Image style={{height:height(30), width:width(90),borderWidth: 1,marginLeft:width(2),}} 
                        source={ {uri:item.avatar}} />
                        <Text style={{marginTop:height(23), position:'absolute',fontWeight: "bold",backgroundColor:'#f8f8ff',  marginLeft:20}}>{item.tuoi} tuổi</Text>
                        <Text style={{marginTop:height(26), position:'absolute',fontWeight: "bold", backgroundColor:'#f8f8ff', marginLeft:20}} > {item.adres}</Text>
                        {/* <Text style={{marginTop:height(27), position:'absolute', backgroundColor:'black', marginLeft:10}} > </Text> */}
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', padding:10, borderBottomRightRadius:10, borderBottomLeftRadius:10, borderTopWidth:2,borderTopColor:'#800000' }} >
                        <TouchableOpacity style={{marginLeft:20}}
                            onPress={()=>LikeImage(item)}
                        >
                            <Text>
                                Thích
                            </Text>
                        </TouchableOpacity>
                        <Text style={{marginLeft:10}} >{item.luotthich}</Text>
                        <TouchableOpacity style={{marginLeft:30}} 
                            onPress={()=>chat(item) }>
                            <Text>Nhắn tin</Text>
                        </TouchableOpacity> 
                    </View>
                   
                    {/* source={{uri:item.avatar}} style={{flex: 1, width:'100%', height:'100%'}} */}
                </ImageBackground>
            </View>
        )
    }

    return (
        <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
             <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default Home;