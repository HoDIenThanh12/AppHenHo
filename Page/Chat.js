import React, {useState, useEffect, useCallback,useLayoutEffect,useRef} from 'react'
import {FlatList,View, Text, Image, Alert, StyleSheet,ScrollView,TouchableOpacity,ToastAndroid} from 'react-native'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import { Button ,TextInput,} from 'react-native-paper';
import {height, width} from '../Page/StyleAll';
import  {db, auth,abb} from '../Config/Data';
import firestore from '@react-native-firebase/firestore';

// YellowBox.ignoreWarnings(["Warning: componentWill"]);
const Chat =({navigtion,route})=>{
    const scrollViewRef = useRef();
    const {userId, avatarUser,nameUser,tuoiUser,items}=route.params;
    console.log(''+userId+': '+avatarUser+ ': '+nameUser)
    console.log(''+items.id+': '+items.avatar+ ': '+items.ten)
    const [messages, setMessages] = useState([])
    const [content,setContent]=useState('')
    const fire = firestore().collection('nhantin')
    let d = new  Date().getTime();
  useEffect( () => {
            abb
            .ref('/Chats/' )
            .orderByChild("ngaygio")
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(i => {
                   console.log('ngayuf gở'+new Date(i.val().times).getDate() )
                   let temp ={
                    idSend:i.val().idSend,
                    idReceive:i.val().idReceive,
                    text:i.val().text,
                    avaSend:i.val().avaSend,
                    avaReceive: i.val().avaReceive,
                    ngaygio: i.val().ngaygio, 
                    nameSend: i.val().nameSend,
                    nameRecevi: i.val().nameRecevi, 
                   }
                    arr.push(temp)
                })
                setMessages(arr);
            });


    //  fire.get()
    // .then(querySnapshot => {
    //     let arr=[]
    //     querySnapshot.forEach(documentSnapshot => {
    //         var datas = documentSnapshot.data();
    //         console.log(datas['text'])
    //         let temp={
    //             idSend:datas['text'],
    //             idReceive:datas['idReceive'],
    //             text:datas['text'],
    //             avaSend: datas['avaSend'],
    //             avaReceive: datas['avaReceive'],
    //             times: datas['times'],
    //         }
            
    //         arr.push(datas);
    //     });
    //     console.log(arr);
    //      setMessages(arr);
    // });
  }, [])
    const renderItem= ({ item }) => {
        const {id}=item
        return (
          <View style={styles.containerMess} >
            {
              item.idReceive === userId ? (
                <View style={styles.messSend}>
                  <View>
                    <Image style={{height:30, width:30,borderRadius: 80}} source={{uri:item.avaReceive}}/>
                  </View>
                  <View style={{backgroundColor:'#e0ffff', borderRadius:20, padding:5}}>
                    <Text style={styles.contentDetail,{color:'red'}} > {item.ngaygio} nhận </Text>
                    <Text style={styles.contentDetail}> {item.text} người nhận </Text>
                  </View>
                  
                </View>
              ) : (
                <View style={styles.messReceive}>
                  <View style={{flexDirection: 'row',}}>
                  <View style={{backgroundColor:'#fffaf0',borderRadius:20, padding:5}}>
                    <Text style={styles.contentDetail,{color:'red'}}> {item.ngaygio} </Text>
                    <Text style={styles.contentDetail}> {item.text} người gửi </Text>
                  </View>
                  <View >
                    <Image style={{height:30, width:30,borderRadius: 80}} source={{uri:item.avaSend}}/>
                  </View>
                  </View>
                 
                </View>
              )
            }
    
          </View>
        )
      }
      const flatList = React.useRef(null);
      const sub=async()=>{
        if(content==''){
          ToastAndroid.show('Chưa nhập nội dung?',ToastAndroid.SHORT)
        }
        else{
          //Alert.alert(content)
          let d = new  Date();
          let mdate = d.getHours()+':'+d.getMinutes() + ' ' + d.getDate()+'/'+Number(d.getMonth()+1) +'/'+d.getFullYear();

            
            await abb.ref('/Chats/').push({
              ngaygio: mdate,
              idSend:userId,
              idReceive:items.id,
              text:content,
              avaSend: avatarUser,
              avaReceive: items.avatar,
              nameSend:nameUser,
              nameRecevi: items.ten,
                    
            });
            setContent('')

          //   await fire.add({
          //        idSend:userId,
          //        idReceive:items.id,
          //        text:content,
          //        avaSend: avatarUser,
          //        avaReceive: items.avatar,
          //        times: new Date(),
          //   })
        }
          
      }
    return (
        <View style={{flex: 1}}>
            <View style={{height:50, justifyContent:'center',flexDirection:'row', alignItems: 'center', backgroundColor:'#dcdcdc'}}>
                <View style={{ borderRadius:80, backgroundColor:'#f8f8ff'}}>
                  <Image style={{height:40, width:40,borderRadius: 80}} source={{uri:items.avatar}}/>
                </View>
                <Text>  </Text>
                <Text style={{fontSize:20,}} >{ items.ten} </Text>
            </View>
            <View style={{flex: 6, backgroundColor:'#f0f2f5'}}>
            
                {/* <ScrollView
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled = { true } 
              showsVerticalScrollIndicator={false}
              ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}> */}
                <FlatList
                    renderItem={renderItem}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    ref={flatList}
                    onContentSizeChange= {()=> flatList.current.scrollToEnd()}
                />
                <View style={{flexDirection:'row', justifyContent: 'space-between',backgroundColor:'white',}}>
                <TextInput
                 style={{width:'80%', backgroundColor:'white'}}
                    placeholder='nhập tin nhắn...'
                    value={content}
                    onChangeText={text=>setContent(text)}
                >
                    
                </TextInput>
                <TouchableOpacity
                    style={{alignItems:'center'}}
                      onPress={() =>sub()}
                >
                <Image source={require('../Image/Input/send-message.png')} style={{height:30, width:30, marginTop:15, marginRight:15}}
                            
                            ></Image>               
                </TouchableOpacity>
                
                </View>
                
            {/* </ScrollView> */}
            </View>
            
        </View>
    )
}
export default Chat

const styles = StyleSheet.create({
    containerMess:{

    },
    messSend: {
      width:height(35),
      flexDirection: 'row',
        marginTop: height(1.5),
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        alignItems: 'flex-start',
        
      },
      contentDetail: {
        color: 'black',
      },
      messReceive: {
        
        width:height(35),
        marginTop: height(1.5),
        alignSelf: 'flex-end',
        padding: 0,
        borderRadius: 10,
        alignItems: 'flex-end',
      },
      containerGitChat: {
        marginTop: height(10),
        width: width(90),
        backgroundColor: 'green',
        height: height(40),
        padding: 10
      },
})