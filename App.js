import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/users/Home';
import List from './src/screens/users/List';
import Love from './src/screens/users/Love';
import Loading from './src/screens/Loading';
import HomeAdmin from './src/screens/admin/HomeAdmin';
import AccountAdmin from './src/screens/admin/AccountAdmin';
import FoodAdmin from './src/screens/admin/FoodAdmin';
import YourAccount from './src/screens/users/YourAccount';
import ManageDetailUsers from './src/screens/admin/ManageDetailUsers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DetailProduct from './src/screens/users/DetailProduct';
import DetailProduct2 from './src/screens/users/DetailProduct2';
import DetailProduct3 from './src/screens/users/DetailProduct3';
import CartScreen from './src/screens/users/CartScreen';
import ManageFoods from './src/screens/admin/ManageFoods';
import SettingUser from './src/screens/users/SettingUser';
import ChangePassword from './src/screens/users/ChangePassword';
import CreateFood from './src/screens/admin/CreateFood';


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

//Tab bar of user
function MyStackOfUser(){
  return (
    <Tab.Navigator tabBarOptions={{labelStyle:{ fontSize: 14}, activeTintColor: '#FF0000', inactiveTintColor: 'black'}}>
      <Tab.Screen  name="Home" component={Home} initialParams={{idUser: 'Không truy cập được thông tin'}} options={{tabBarLabel: 'Trang chủ', fontSize: 1, tabBarIcon: ({color}) => <Ionicons name='home' size={22} color={color} />}}/>
      <Tab.Screen name="List" component={List} options={{tabBarLabel: 'Danh mục', tabBarIcon: ({color}) => <FontAwesome name='list' size={23} color={color} />}} />
      <Tab.Screen name="Love" component={Love} options={{tabBarLabel: 'Yêu thích', tabBarIcon: ({color}) => <FontAwesome name='heart' size={23} color={color} />}} />
      <Tab.Screen name="YourAccount" component={YourAccount} options={{tabBarLabel: 'Tôi', tabBarIcon: ({color}) => <FontAwesome name='user' size={23} color={color} />}} />
    </Tab.Navigator>
  )
}
//Tab bar of admin
function MyStackOfAdmin(){
  return (
    <Tab.Navigator tabBarOptions={{labelStyle:{ fontSize: 14}, activeTintColor: '#FF0000', inactiveTintColor: 'black'}}>
      <Tab.Screen  name="HomeAdmin" component={HomeAdmin} options={{tabBarLabel: 'Manage users', fontSize: 1, tabBarIcon: ({color}) => <FontAwesome name='users' size={23} color={color} />}}/>
      <Tab.Screen name="FoodAdmin" component={FoodAdmin} options={{tabBarLabel: 'Manage food', tabBarIcon: ({color}) => <FontAwesome name='cutlery' size={23} color={color} />}} />
      <Tab.Screen name="AccountAdmin" component={AccountAdmin} options={{tabBarLabel: 'Yêu thích', tabBarIcon: ({color}) => <FontAwesome name='heart' size={23} color={color} />}} />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="CartScreen" screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
   
      <Stack.Screen name="Login"  component={Login} options={{title: 'Đăng nhập', headerShown: true}} />
      <Stack.Screen name="Register" component={Register} options={{title: 'Đăng ký', headerShown: true}} />
      {/* Using this when login user successfull */}
      <Stack.Screen name="Home" component={MyStackOfUser}  options={{title: 'Home', headerShown: false}} />
      <Stack.Screen name="DetailProduct" component={DetailProduct} options={{title: 'Chi tiết sản phẩm'}} />
      <Stack.Screen name="DetailProduct2" component={DetailProduct2} options={{title: 'Chi tiết sản phẩm'}} />
      <Stack.Screen name="DetailProduct3" component={DetailProduct3} options={{title: 'Chi tiết sản phẩm'}} />
      <Stack.Screen name="SettingUser" component={SettingUser} options={{title: 'Cài đặt tài khoản'}} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{title: 'Đổi mật khẩu'}} />
      <Stack.Screen name="CartScreen" component={CartScreen} options={{title: 'Giỏ hàng'}} />
       {/* Using this when login admin successfull */}
       <Stack.Screen name="HomeAdmin" component={MyStackOfAdmin} options={{title: 'Home', headerShown: false}} />
       <Stack.Screen name="ManageDetailUsers" component={ManageDetailUsers} options={{title: 'Manage user'}} />
       <Stack.Screen name="ManageFoods" component={ManageFoods} options={{title: 'Chi tiết món ăn'}} />
       <Stack.Screen name="CreateFood" component={CreateFood} options={{title: 'New food'}} />

    </Stack.Navigator>
  
  </NavigationContainer>
  );
}


