import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Image, Button, Keyboard } from "react-native";
import { Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../database/firebase';


const Register = ({ navigation, route }) => {
  //check user email valid
  const [user, setUser] = useState([])

  useEffect(() => {
    firebase.db.collection('tusers').onSnapshot(querySnapshot => {
      const user = [];
      querySnapshot.docs.forEach(doc => {
        const { email, password, phone, address } = doc.data();
        user.push({
          email,
        })
      });
      setUser(user);
      console.log(user);
    })
  }, [])
  //Handle register

  const [state, setState] = useState({
    email: '',
    password: '',
    rpassword: '',
    phone: '',
    address: '',
  })
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  }
  //check valid for email
  const checkEmailMatch = () => {
    var check = 0;
     user.filter((item) => {
      if (item.email === state.email) {
        check++;
      }
    })
    if(check>0){
      console.log(check);
      return false;
    }
    else{
      return true;
    }
  }

  const saveNewUser = async () => {
    if (state.email === '' || state.address === '' || state.password === ''
      || state.rpassword === '' || state.phone === '') {
      alert('Bạn không được để trống!');
    }
    else if (checkEmailMatch() == false) {
          alert('Email đã tồn tại')
    }
    else if (state.password.length < 6 || state.rpassword.length < 6) {
      alert('Mật khẩu phải lớn hơn 6 ký tự');
    }
    else if (state.password != state.rpassword) {
      alert('Xác nhận mật khẩu không trùng!');
    }
    else if (state.address.length < 10) {
      alert('Địa chỉ phải lớn hơn 10 ký tự');
    }
    else {
      try {
        await firebase.db.collection('tusers').add({
          email: state.email,
          password: state.password,
          phone: state.phone,
          address: state.address
        })
        alert('Bạn đã đăng ký thành công^^');
        navigation.navigate('Login');
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../images/main.jpg')} style={styles.image}>

        <View style={styles.body} onPress={() => Keyboard.dismiss()}>
          <Image style={styles.imageIcon} source={require('../images/ham.png')} />
        </View>
        <View style={styles.body2}>
          <Input style={styles.textIn} placeholder='Nhập email' placeholderTextColor="yellow" autoCorrect={false} leftIcon={<FontAwesome name='envelope' size={24} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('email', value)} />
          <Input style={styles.textIn} secureTextEntry={true} placeholder='Nhập mật khẩu ' autoCorrect={false} placeholderTextColor="yellow" leftIcon={<FontAwesome name='lock' size={30} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('password', value)} />
          <Input style={styles.textIn} secureTextEntry={true} placeholder='Xác nhận mật khẩu' autoCorrect={false} placeholderTextColor="yellow" leftIcon={<FontAwesome name='lock' size={30} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('rpassword', value)} />
          <Input style={styles.textIn} keyboardType='number-pad' placeholder='Số điện thoại' placeholderTextColor="yellow" autoCorrect={false} leftIcon={<FontAwesome name='phone' size={24} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('phone', value)} />
          <Input style={styles.textIn} placeholder='Địa chỉ' placeholderTextColor="yellow" autoCorrect={false} leftIcon={<FontAwesome name='map' size={24} color='red' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('address', value)} />
        </View>
        {/* Handle Button */}
        <View style={styles.sButton}>
          <Button color='white' title='Đăng ký' onPress={() => saveNewUser()} />
        </View>
        {/* Handle button register */}

      </ImageBackground>
    </View>
  )
};

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
  sButton: {
    backgroundColor: 'red',
    marginTop: 40,
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
    marginTop: 10,

  },
  image: {
    flex: 1,
    resizeMode: "cover",

    padding: 30,

  },
  imageIcon: {
    width: 180,
    height: 80,
    marginTop: 10
  },
  textIn: {
    borderBottomColor: 'orange',
    borderBottomWidth: 3,
    height: 40,
    color: 'white',
    fontSize: 20,
    marginTop: 5
  }
});

export default Register;