import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {db, auth, abb} from '../Config/Data';
const Mes = ({navigation, route}) => {
  const {id} = route.params;
  const [nameUser, setNameUser] = useState('');
  const [tuoiUser, setTuoiUser] = useState('');
  const [avatarUser, setAvatarUser] = useState('');

  const [namePeople, setNamePeople] = useState('');
  const [tuoiPeople, setTuoiPeople] = useState('');
  const [avatarPeople, setAvatarPeople] = useState('');

  const [mes, setMet] = useState([]);
  const getListMes = () => {
    let list = [];
    let dkAdd = 0;
    abb.ref('/Chats/').on('value', snapshot => {
      let ar = [];
      snapshot.forEach(i => {
        //Alert.alert(id+'tên đã lấy' +bienn.key)
        if (i.val().idSend == id) {
          if (list.length < 1) {
            let t = {
              idSend: i.val().idSend,
              idReceive: i.val().idReceive,
              text: i.val().text,
              avaSend: i.val().avaSend,
              avaReceive: i.val().avaReceive,
              ngaygio: i.val().ngaygio,
              nameSend: i.val().nameSend,
              nameRecevi: i.val().nameRecevi,
            };
            ar.push(t);
          } else {
            list.forEach(item => {
              if (item.idReceive == i.val().idReceive) {
                dkAdd = 1;
              }
            });
            if (dkAdd == 0) {
              let temp = {
                idSend: i.val().idSend,
                idReceive: i.val().idReceive,
                text: i.val().text,
                avaSend: i.val().avaSend,
                avaReceive: i.val().avaReceive,
                ngaygio: i.val().ngaygio,
                nameSend: i.val().nameSend,
                nameRecevi: i.val().nameRecevi,
              };
              ar.push(temp);
            } 
            else dkAdd = 0;
          }
        }
        // if (i.val().idReceive == id) {
        //     if (list.length < 1) {
        //       let t = {
        //         idSend: i.val().idSend,
        //         idReceive: i.val().idReceive,
        //         text: i.val().text,
        //         avaSend: i.val().avaSend,
        //         avaReceive: i.val().avaReceive,
        //         ngaygio: i.val().ngaygio,
        //         nameSend: i.val().nameSend,
        //         nameRecevi: i.val().nameRecevi,
        //       };
        //       ar.push(t);
        //     } else {
        //       list.forEach(item => {
        //         if (item.idReceive == i.val().idReceive) {
        //           dkAdd = 1;
        //         }
        //       });
        //       if (dkAdd == 0) {
        //         let temp = {
        //           idSend: i.val().idSend,
        //           idReceive: i.val().idReceive,
        //           text: i.val().text,
        //           avaSend: i.val().avaSend,
        //           avaReceive: i.val().avaReceive,
        //           ngaygio: i.val().ngaygio,
        //           nameSend: i.val().nameSend,
        //           nameRecevi: i.val().nameRecevi,
        //         };
        //         ar.push(temp);
        //       } else dkAdd = 0;
        //     }
        //   }
        
          ar.forEach(item=>console.log(item.idReceive))
      });
      setMet(ar);
    });
  };

  const getUser = async () => {
    var a, n, t;
    abb.ref('/users/').on('value', snapshot => {
      snapshot.forEach(bienn => {
        //Alert.alert(id+'tên đã lấy' +bienn.key)
        if (bienn.key == id) {
          (n = bienn.val().ten),
            (t = bienn.val().tuoi),
            (a = bienn.val().avatar);
          //  console.log('user: '+id +': '+a+': '+n+': '+t)
        }
        setTuoiUser(t), setNameUser(n), setAvatarUser(a);
      });
      getListMes();
    });
  };
  useEffect(getUser, []);
  //console.log('user: '+id+': '+avatarUser+': '+nameUser+': '+tuoiUser)
  const dataMes = [
    {
      id: '1',
      userName: 'cong',
      userImage: require('../Image/Button/note.png'),
      messageTime: '4 giwof trước',
      messageText: 'hôm nay đã làm được gì chưa',
    },
    {
      id: '2',
      userName: 'cong',
      userImage: require('../Image/Button/note.png'),
      messageTime: '4 giwof trước',
      messageText: 'hôm nay đã làm được gì chưa',
    },
    {
      id: '3',
      userName: 'cong',
      userImage: require('../Image/Button/note.png'),
      messageTime: '4 giwof trước',
      messageText: 'hôm nay đã làm được gì chưa',
    },
    {
      id: '4',
      userName: 'cong',
      userImage: require('../Image/Button/note.png'),
      messageTime: '4 giwof trước',
      messageText: 'hôm nay đã làm được gì chưa',
    },
    {
      id: '5',
      userName: 'cong',
      userImage: require('../Image/Button/note.png'),
      messageTime: '4 giwof trước',
      messageText: 'hôm nay đã làm được gì chưa',
    },
    {
      id: '6',
      userName: 'cong',
      userImage: require('../Image/Button/note.png'),
      messageTime: '4 giwof trước',
      messageText: 'hôm nay đã làm được gì chưa',
    },
  ];

  //const {id}=route.params
  //Alert.alert("tràn mes: "+ id)

  const chat = item => {
    navigation.navigate('Chat', {
      userId: id,
      avatarUser: avatarUser,
      nameUser: nameUser,
      tuoiUser: tuoiUser,
      items: item,
    });
  };
  const renderItems = ({item}) => {
    return (
      <View style={{width: '100%'}}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => chat(item)}>
          <Image
            source={item.userImage}
            style={{height: 60, width: 60, borderRadius: 50}}></Image>
          <View>
            <Text>{item.id}</Text>
            <Text>{item.userName}</Text>
            <Text>oo</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'yellow',
        }}>
        <Text>màn hình mes Mes {id}</Text>
      </View>
      <View style={{flex: 10, alignItems: 'center', backgroundColor: 'red'}}>
        <FlatList
          data={dataMes}
          keyExtractor={item => item.id}
          renderItem={renderItems}
        />
      </View>
    </View>
  );
};
export default Mes;
