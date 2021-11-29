import React , {useEffect, useState} from "react";
import {View, TextInput, Text, Button, FlatList, ToastAndroid, Alert} from "react-native"
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

    const getData = async  () => {
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
                    //console.log('User data: ', i.val().user  );
                })
                setData(arr)
            });
    }
    useEffect(getData,[])


    const renderItem = ({ item }) => (
        <View>
            <Text>
                {item.tenuserlike}
            </Text>
            <Text>{item.tuoiuserlike}</Text>
        </View>
       
      );
    return (
        <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
            <Text>màn hình Love</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    )
}
export default Love