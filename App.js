import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Page/Login';
import Mes from './Page/Messenger';
import Home from './Page/Home';
import About from './Page/About';
import Love from './Page/YouLike';
import Tabs from './Page/TabNavigation';
import EditAbout from './Page/EditAbout';
import Singin from './Page/Singing';
import Chat from './Page/Chat';
import Tes from './Page/Tes';
import edit from './Page/edit';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Tes" component={Tes} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen
          name="EditAbout"
          component={EditAbout}
          options={({route}) => ({
            title: 'Thông tin',
          })}
        />
        <Stack.Screen name="Singin" component={Singin} />
        <Stack.Screen
          options={({route}) => ({
            title: route.params.userName,
            headerBackTitleVisible: false,
          })}
          name="Chat"
          component={Chat}
          options={({route}) => ({
            title: 'sdfsdfsdfsd',
          })}
        />
        <Stack.Screen name="Mes" component={Mes} />
        <Stack.Screen name="edit" component={edit} />
        <Stack.Screen name="About" component={About} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
