import React, { useState, useEffect } from "react";
import { ImageBackground, StyleSheet, Text, View, Image, Keyboard } from "react-native";
import { Input, Button } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../database/firebase';
import { FancyAlert } from 'react-native-expo-fancy-alerts';

const Register = ({ navigation, route }) => {
  //check user email valid
  const [visible, setVisible] = React.useState(false);
  const toggleAlert = React.useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  //set notification
  const [nIcon, setnIcon] = useState();
  const [title, setTitle] = useState();
  const [color, setColor] = useState();
  const [user, setUser] = useState([])
  const _closeApp = () => {
    setVisible(!visible);
  }
  useEffect(() => {
    let isMounted = true;
    firebase.db.collection('users').onSnapshot(querySnapshot => {
      const user = [];
      querySnapshot.docs.forEach(doc => {
        const { email, password, phone, address } = doc.data();
        user.push({
          email,
        })
      });
      setUser(user);
    })
    return () => { isMounted = false };
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
    if (check > 0) {
      return false;
    }
    else {
      return true;
    }
  }

  const saveNewUser = async () => {
    if (state.email === '' || state.address === '' || state.password === ''
      || state.rpassword === '' || state.phone === '') {
      setTitle('Bạn không được để trống!');
      setnIcon('✖');
      setColor('red');
      toggleAlert();
    }
    else if (checkEmailMatch() == false) {
      setTitle('Email đã tồn tại!');
      setnIcon('✖');
      setColor('red');
      toggleAlert();
    }
    else if (state.password.length < 6 || state.rpassword.length < 6) {
      setTitle('Mật khẩu phải lớn hơn 6 ký tự!');
      setnIcon('✖');
      setColor('red');
      toggleAlert();
    }
    else if (state.password != state.rpassword) {
      setTitle('Xác nhận mật khẩu không giống nhau!');
      setnIcon('✖');
      setColor('red');
      toggleAlert();
    }
    else if (state.address.length < 10) {
      setTitle('Địa chỉ phải lớn hơn 10!');
      setnIcon('✖');
      setColor('red');
      toggleAlert();
    }
    else {
      try {
        await firebase.db.collection('users').add({
          email: state.email,
          password: state.password,
          phone: state.phone,
          address: state.address,
          role: 0,
          imageUser: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
          userLike: 'noData',
          userCart: 'noData',
        })

        setTitle('Bạn đã đăng ký tài khoản thành công!');
        setnIcon('✔');
        setColor('green');
        toggleAlert();
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
          <Button color='white' backgroundColor='orange' title='Đăng ký' onPress={() => saveNewUser()} />
        </View>
        {/* Handle button register */}

      </ImageBackground>
      {/* show dialog */}
      <FancyAlert
        visible={visible}
        icon={<View style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: (color),
          borderRadius: 80,
          width: '100%',
        }}><Text>{nIcon}</Text></View>}
        style={{ backgroundColor: 'white' }}
      >
        <Text style={{ marginTop: -16, marginBottom: 32, }}>{title}</Text>
        <View style={{ paddingHorizontal: 30 }}>
          <Button style={{ paddingHorizontal: 40 }} title='Đóng' onPress={() => _closeApp()} />
        </View>
      </FancyAlert>
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