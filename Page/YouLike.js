import React , {useEffect, useState} from "react";
import {View, TextInput, Text, Button, FlatList,ImageBackground, ToastAndroid, Alert,Image} from "react-native"
import {db, auth,abb} from '../Config/Data';
import {height, width} from '../Page/StyleAll';

const Love =({native, route})=>{
    const {id}=route.params
    const [data,setData] = useState([]);

    // useEffect(async () => {
    //     const  getData =   () => {
    //         let arr=[]
    //           abb.ref('/users/' + id +'/peopleLikeImage/')
    //             .on('value', snapshot => {
    //                 let arr = [];
    //                 snapshot.forEach(i => {
    //                     let t = {
    //                         id:i.key,
    //                         avataruserlike:i.val().avataruserlike,
    //                         diachiuserlike: i.val().diachiuserlike,
    //                         iduserlike: i.val().iduserlike,
    //                         tenuserlike: i.val().tenuserlike,
    //                         tuoiuserlike: i.val().tuoiuserlike,
    //                     }
    //                     arr.push(t)
    //                     // if(i.key=='-MpPcFopSdCyBMRqUj1h')
    //                     //console.log('User data: ', i.val().user  );
    //                 })
    //                 setData(arr)
    //         });
    //     }
    // },[])

    const getData =   () => {
        let arr=[]
          abb.ref('/users/' + id +'/peopleLikeImage/')
            .on('value', snapshot => {
                let arr = [];
                snapshot.forEach(i => {
                    let t = {
                        id:i.key,
                        avataruserlike:i.val().avataruserlike,
                        diachiuserlike: i.val().diachiuserlike,
                        iduserlike: i.val().iduserlike,
                        tenuserlike: i.val().tenuserlike,
                        tuoiuserlike: i.val().tuoiuserlike,
                    }
                    arr.push(t)
                    // if(i.key=='-MpPcFopSdCyBMRqUj1h')
                    console.log('ava data: '+ i.val().avataruserlike  );
                })
                setData(arr)
            });
    }
    useEffect(getData,[])


    const renderItem = ({ item }) => (
        <View style={{flexDirection:'row',padding:20, justifyContent: 'center'}}>
            <View style={{borderColor:'#ffd700', borderWidth:2, borderRadius:20}} > 
            <Image
            style={{height:height(23), width:width(40), borderRadius:20}}
            source={{uri: item.avataruserlike}}
            
            >
                 </Image>
                
                <View style={{position:'absolute', marginTop:height(17)}}>
                    <Text style={{backgroundColor:'#dcdcdc', borderRadius:5}}>
                            {item.tenuserlike}
                    </Text>
                    <Text style={{backgroundColor:'#dcdcdc', borderRadius:5}}>
                        {item.tuoiuserlike}
                    </Text>
                </View>
            </View>
           
            
            
        </View>
       
      );
    return (
        <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
            <Text>Những người đã thích bạn</Text>
            <FlatList
             numColumns={2}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default Love