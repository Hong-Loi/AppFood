import React, { useState } from "react";
import { ImageBackground, StyleSheet, TextInput, View, Image, Button, TouchableOpacity } from "react-native";
import { Input, Avatar } from 'react-native-elements';
import { ScrollView } from "react-native-gesture-handler";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../../database/firebase';


const CreateFood = ({ navigation }) => {
  const [state, setState] = useState({
    name: '',
    linkImage: '',
    price: '',
    sold: '',
    description: '',
  })
  const handleChangeText = (name, value) => {
    setState({ ...state, [name]: value })
  }
  const saveNewFood = async () => {
    if (state.name === '' || state.linkImage === '' || state.price === ''
      || state.sold === '' || state.description === '') {
      alert('Bạn không được để trống!');
    }
    else {
      try {
        await firebase.db.collection('foods').add({
          name: state.name,
          linkImage: state.linkImage,
          price: state.price,
          sold: state.sold,
          description: state.description
        })
        navigation.navigate('FoodAdmin');
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <ScrollView>
      <View style={styles.container}>


          <View style={styles.body2}>
            <Input style={styles.textIn} placeholder='Tên món ăn' placeholderTextColor="gray" autoCorrect={false} leftIcon={<FontAwesome name='file' size={24} color='orange' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('name', value)} />
            <Input style={styles.textIn} placeholder='Đường dẫn ' autoCorrect={false} placeholderTextColor="gray" leftIcon={<FontAwesome name='link' size={30} color='orange' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('linkImage', value)} />
            <Input style={styles.textIn} placeholder='Giá' autoCorrect={false} placeholderTextColor="gray" leftIcon={<FontAwesome name='tag' size={30} color='orange' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('price', value)} />
            <Input style={styles.textIn} placeholder='Số lượng đã bán' placeholderTextColor="gray" autoCorrect={false} leftIcon={<FontAwesome name='certificate' size={24} color='orange' errorStyle={{ color: 'red' }} />} onChangeText={(value) => handleChangeText('sold', value)} />
           <View style={{marginTop: 5,}}>
           <Input style={styles.textIn} multiline numberOfLines={10} maxLength={500} autoCorrect={false} placeholder='Description' placeholderTextColor="gray" leftIcon={<FontAwesome name='buysellads' size={24} color='orange' errorStyle={{ color: 'gray' }} />} onChangeText={(value) => handleChangeText('desctiption', value)} />
           </View>

          </View>
          {/* Handle Button */}
          <View style={styles.sButton}>
            <Button color='red' title='Thêm món ăn' onPress={() => saveNewFood()} />
          </View>
          {/* Handle button register */}

      </View>
    </ScrollView>
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
    backgroundColor: '#66FF66',
    marginTop: 40,
    fontSize: 20,
    borderRadius: 50
  },
  container: {
    flex: 1,
    flexDirection: "column",

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
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    height: 40,
    color: 'black',
    fontSize: 20,
    marginTop: 5
  },
  textIn2: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
   
  }
});

export default CreateFood;