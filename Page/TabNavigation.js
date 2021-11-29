import * as React from 'react';
import { Text, View, Alert, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../Page/Home';
import About from '../Page/About';
import Mes from '../Page/Messenger';
import Love from '../Page/YouLike';

const Tabs = createBottomTabNavigator();

export default function Tab({ navigation, route }) {
    const {id}=route.params;
    //Alert.alert("nhận r: "+ id)
    return (
        <Tabs.Navigator screenOptions={{ style:{height:300, width:300},headerShown: false,  tabBarStyle: {
            height: 70,
            alignItems:'center',
            justifyContent: 'center'
          },}} 
        >
            <Tabs.Screen
            
                name="Home"
                component={Home}
                options={{tabBarIcon:()=>
					<Image onPress={()=>alert('dsds')} source={require('../Image/Button/house.png')}
                    style={{height:30, width:30}}  /> 
                    
                        }}
                        initialParams={{id}}
            />
            <Tabs.Screen name="Love" component={Love} 
            options={{tabBarIcon:()=>
                <Image onPress={()=>alert('dsds')} source={require('../Image/Button/tinhyeu.png')}
                style={{height:50, width:50}}  /> 
                    ,style:{height:200, width:100}  }}
                    initialParams={{id}}
                />
            <Tabs.Screen name="Mes" component={Mes} 
            options={{tabBarIcon:()=>
                <Image onPress={()=>alert('dsds')} source={require('../Image/Button/mes.png')}
                style={{height:30, width:30}}  /> }}
                initialParams={{id}}
                    />
            <Tabs.Screen name="About" component={About} 
            options={{tabBarIcon:()=>
                <Image onPress={()=>alert('dsds')} source={require('../Image/Button/about.png')}
                style={{height:30, width:30}}  /> 
                    }}
                    initialParams={{id}}/>
        </Tabs.Navigator>
    );
}
