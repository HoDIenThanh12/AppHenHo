import React, { useState, useEffect } from 'react'
import {View,  Text, Alert,ToastAndroid,TouchableOpacity, Image,ImageBackground,ScrollView} from "react-native"
import { Button ,TextInput,} from 'react-native-paper';
import {db, auth,abb} from '../Config/Data';
import firebase from 'firebase'
import firestore from '@react-native-firebase/firestore';
const Login =({ navigation , route})=>{
    const [email, setEmail] = useState('t12@gmail.com');
    const [password, setPassword] = useState('12345678');
    
    const ref = firestore().collection('nhantin');
    async function adds() {
        await ref.add({
          title: "3212312",
          complete: false,
        });
      }

    const Nhan = () => { 
        //const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            ToastAndroid.show('Đăng nhập thành công!',ToastAndroid.SHORT);
            // Alert.alert("Đăng nhập thành công");
            navigation.navigate("Tabs", {id:user.uid});
        })
        .catch((error) => {
            ToastAndroid.show('Sài tài khoản hoặc mật khẩu?',ToastAndroid.SHORT);
        });
        //navigation.navigate("Tabs",)
    }
    const ll=()=>{
        abb.ref('/users/')
        .set(
            {
                ten:'ôppop',
                yy: '3345'
            }
        );
    }
    const Singin = () => {
        navigation.navigate("Singin")
        //Alert.alert("Đăng ký");
    }
    return (
        <View style={{flex:1}}>
            
                    <ScrollView style={{flex:1, height:'100%' }}>
                    <ImageBackground 
                style={{flex:1, width:'100%',height:760}}
                source={require('../Image/Backgroud/bacgroundDN.png')}    >
                        <View style={{ height:'35%', }}>
                        </View>
                        <View style={{ alignItems:'center', height:300, paddingTop:10}} >
                            <Text style={{ color:'black',fontWeight: "bold", fontSize:40}} >Đăng nhập</Text>
                            <TextInput 
                                style={{backgroundColor:'#ffdead',overflow:'hidden', width:'80%', marginTop:30,borderTopRightRadius:20, borderBottomLeftRadius:20, borderColor:'red', borderWidth:2}}
                                left={
                                    <TextInput.Icon
                                        name={() => <Image source={require('../Image/Input/username.png')} style={{height:30, width:30}}></Image>}
                                    />
                                }
                                label='Nhập email...'
                                value={email}
                                onChangeText={text => setEmail(text)}  />
                            <TextInput
                                style={{backgroundColor:'#ffdead',overflow:'hidden', width:'80%', marginTop:10, marginBottom:30,borderTopRightRadius:20, borderBottomLeftRadius:20, borderColor:'red', borderWidth:2}} 
                                left={
                                    <TextInput.Icon
                                        name={() => <Image source={require('../Image/Input/pass.png')} style={{height:30, width:30}}></Image>}
                                    />
                                }
                                value={password}
                                label='Nhập tài khoản...'
                                onChangeText={text => setPassword(text)} />
                            <TouchableOpacity 
                            style={{flexDirection:'row'}}
                                onPress={Nhan}
                            >
                                <Image style={{height:50, width:90}} source={require('../Image/Input/icons8-login-64.png')}/>
                              
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection:'row', }}>
                                <Text >Bạn chưa có tài khoản? </Text>
                                <Text style={{color:'red',fontWeight: "bold"}} onPress={Singin}>Đăng ký </Text>
                            </TouchableOpacity>   
                        </View>
                        
                        </ImageBackground>
                    </ScrollView>
            
        </View>
    )
}
export default Login