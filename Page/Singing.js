import React, { useState, useEffect } from 'react'
import {View, TextInput, Text, Button, Alert,TouchableOpacity,ToastAndroid,StyleSheet} from "react-native"
import {db, auth,abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';

const Singin =({ navigation , route})=>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [name, setName] = useState('');
    const [tuoi,setTuoi] = useState('');
    const [gtinh,setGtinh] = useState(1);
    const anhnam ='https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/User_icon-cp.svg/1200px-User_icon-cp.svg.png'
    const anhnu ='https://cdn-icons-png.flaticon.com/512/186/186037.png'

    let temp={
        avatar:gtinh==1?anhnam:anhnu,
        ten: name,
        tuoi: tuoi,
        gioitinh: gtinh,
        ghichu: '',
        chieucao: '',
        diachi: '',
        nghe : '',
        quanhe: '',
        sothich: '',
        dulich: '',
        tinhcach:'',
        tthai: '0',
        luotthich:0,
    }

    const signin = () =>{
        if(email=='' || password=='' || password1=='' || name=='' || tuoi==''){
            ToastAndroid.show('Bạn chưa đầy đủ nhập thông tin?',ToastAndroid.SHORT)
        }
        else{
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if(reg.test(email) === true){
                if(password === password1){
                    auth.createUserWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        var user =userCredential.user
                        newUser(user.uid)
                        //user.updateProfile({
                        //     displayName:'thành',
                        //     photoUrl:  "https://gravatar.com/avatar/94d45dbdba988afacf30d916e7aaad69?s=200&d=mp&r=x",
                        // })
                        Alert.alert("Đăng ký thành công", "Bạn có thể đăng nhập bây giờ");

                        // firebaseApp.database().ref('post/' + postId).set({
                        //     title: title,
                        //     content: content
                        //   })
                        navigation.replace("Login");
                    })
                    .catch((error) => {
                        Alert.alert("Đăng ký thất bại", error.message+"");
                    });
                }
                
            }
            else{
                Alert.alert("sai định dạng email")
            }
            
        }
    }
    
    const newUser = (uid)=>{
            const newReference = abb
                .ref('/users/'+ uid)
            //     .push();

            // console.log('Auto generated key: ', newReference.key);

            // newReference
                .set(temp)
                .then(() => console.log('Data new.'));
    }

    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <View style={{flex:1, width:width(80) , paddingTop:30}}>
            <Text style={{padding:30 ,fontSize:17, fontWeight:'bold'}}>Điền các thông tin cần thiết</Text>
            <TextInput style={styles.textIn} placeholder="Họ và tên..." onChangeText={text =>setName(text)} />
            <TextInput style={styles.textIn} keyboardType='numeric' placeholder="Tuổi..." onChangeText={text =>setTuoi(text)} />
            <View style={{flexDirection:'row', paddingTop:20, paddingLeft:10}}>
                <Text>Chọn giới tính: </Text>
                <TouchableOpacity
                    style={{backgroundColor:gtinh==1?'red':'white', borderRadius:40}}
                    onPress={() =>{setGtinh(1)}}
                >
                    <Text> Nam  </Text>        
                </TouchableOpacity>
                <TouchableOpacity
                    style={{backgroundColor:gtinh==0?'red':'white',borderRadius:40, marginLeft:20}}
                    onPress={() =>{setGtinh(0)}}
                >
                    <Text>  Nữ  </Text>
                </TouchableOpacity>
            </View>
            <TextInput style={styles.textIn} placeholder="Email..." onChangeText={text =>setEmail(text)} />
            <TextInput style={styles.textIn}  placeholder="Password..." onChangeText={text =>setPassword(text)} />
            <TextInput style={styles.textIn} placeholder="Config Password..." onChangeText={text =>setPassword1(text)} />
            <View style={{alignItems:'center',}}>
                <TouchableOpacity 
                style={{borderColor:'#800000', borderWidth:2, padding:5 ,marginTop:30, borderRadius:20}} 
                onPress={signin}>
                    <Text style={{fontWeight:'bold'}}>Đăng ký tài khoản</Text>
                </TouchableOpacity>
            </View>

           
            </View>
            
        </View>
    )
}
export default Singin

const styles = StyleSheet.create({
    textIn:{
        borderRadius:10,
        borderWidth:1,
        borderColor:'red', 
        marginTop:20
    }
})