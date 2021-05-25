import React, { useState } from "react";
import { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, Image, Button, TouchableOpacity } from "react-native";
import { Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../database/firebase';

let getId = '';
const Login = (props) => {
  //user
  const [user, setUser] = useState([])
  useEffect(() => {
    let isMounted = true;
    firebase.db.collection('tusers').onSnapshot(querySnapshot => {
      const user = [];
      querySnapshot.docs.forEach(doc => {
        console.log(doc.data())
        const { email, password, role } = doc.data();
        user.push({
          id: doc.id,
          email,
          password,
          role
        })

      });
      setUser(user);
      return () => { isMounted = false }; 
    })
  }, [])
  //Check login
  const checkLogin = async () => {
    if (state.email === '' || state.password === '') {
      alert('Bạn không được để trống!');
    }
    else if (state.email == 'admin' && state.password == 'admin') {
      alert('Bạn đã đăng nhập vào trang quản trị');
      props.navigation.navigate('HomeAdmin');
    }
    else {
      var x = -1;
      user.forEach((item) => {    
        if (state.email == item.email && state.password == item.password) {
          getId=item.id;
          //IF role = 0  then to admin
          if(item.role===1){
            props.navigation.navigate('HomeAdmin',{
              screen: 'HomeAdmin',
              params: {userId: item.id}
            } ,
            );
            x=0;
          
          }
          else {
            props.navigation.navigate('Home',{
              screen: 'Home',
              params: {userId: item.id}
            } ,
            );
            x = 1;
          }
        
        }
      })
      // Alert for success
      if (x == 0) {
        alert('Bạn đã đăng nhập với tư cách quản trị viên');
      }
      else if(x==-1){
        alert('Tài khoản hoặc mật khẩu của bạn không chính xác');
      }

    }
  }
  const [state, setState] = useState({
    email: '',
    password: '',
  })
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  }
  const _onChagePageRegister = () => {
    props.navigation.navigate('Register',{namexxx: 'hello wolrd'});
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/main.jpg')} style={styles.image}>

        <View style={styles.body}>
          <Image style={styles.imageIcon} source={require('../images/ham.png')} />
        </View>
        <View style={styles.body2}>
          <Input style={styles.textIn} autoCorrect={false} placeholder='Nhập email' placeholderTextColor="yellow" leftIcon={<FontAwesome name='envelope' size={24} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('email', value)} />
          <Input style={styles.textIn} autoCorrect={false} secureTextEntry={true} placeholder='Nhập mật khẩu' placeholderTextColor="yellow" leftIcon={<FontAwesome name='lock' size={30} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('password', value)} />
        </View>

        {/* Handle Button */}
        <View style={styles.sButton}>
          <Button color='white' title='Đăng nhập' onPress={() => checkLogin()} />
        </View>
        {/* Handle button register */}
        <View style={styles.bRegis}>
          <Text style={styles.sT1}>Nếu bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => _onChagePageRegister()}><Text style={styles.sT2}>Nhấn vào đây</Text></TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  )
};
export const getUserId = () =>{
  return getId;
}
const styles = StyleSheet.create({
  sT1: {
    color: 'white',
    fontSize: 17
  },
  sT2: {
    color: 'green',
    fontSize: 17,
    fontWeight: 'bold'
  },
  bRegis: {
    flexDirection: 'row',
    marginTop: 150,
    textAlign: 'center'
  },
  sButton: {
    backgroundColor: 'red',
    marginTop: 50,
    fontSize: 20,

  },
  container: {
    flex: 1,
    flexDirection: "column",

  },
  body: {
    alignItems: 'center'
  },
  body2: {
    marginTop: 50,

  },
  image: {
    flex: 1,
    resizeMode: "cover",

    padding: 30,

  },
  imageIcon: {
    width: 180,
    height: 80,
    marginTop: 20
  },
  textIn: {
    borderBottomColor: 'orange',
    borderBottomWidth: 3,
    height: 40,
    color: 'white',
    fontSize: 20,
    marginTop: 15
  }
});

export default Login;