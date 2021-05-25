

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  Dimensions,
  NativeModules
} from 'react-native';
import RNRestart from 'react-native-restart';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import firebase from '../../database/firebase';
import { getUserId } from '../Login';
import { getUserLike } from '../Login';


const Love = (props) => {

  var userId = getUserId();
  var getLikeFormUser = getUserLike();
  //Get value of firebase
  const [food, setFood] = useState([]);
  const [foodLike, setFoodLike] = useState([]);
  const [user, setUser] = useState();
  const getUserById = async (id) => {
    const dbRef = firebase.db.collection('tusers').doc(id);
    const doc = await dbRef.get();
    const user = doc.data();

    setUser({
      ...user,
      id: doc.id
    })
  }
  useEffect(() => {
    firebase.db.collection('foods').onSnapshot(querySnapshot => {
      const food = [];
      querySnapshot.docs.forEach(doc => {
        const { name, linkImage, price, description, sold } = doc.data();
        food.push({
          id: doc.id,
          name,
          linkImage,
          price,
          description,
          sold
        })
      });
      setFood(food);
      getUserById(userId);
   
      var getItemIdLike = getLikeFormUser.split("-");
      //delete arr[0]
      let showArr = getItemIdLike.filter((item) => {
        return item != 'noData';
      })
      food.filter((item)=>{
        for(let i=0; i< showArr.length;i++){
           if(item.id===showArr[i]){
             foodLike.push(item);
           }
        }
       
      })
      setFoodLike(foodLike);
      setDataSouce(foodLike);
    })
  }, [])
  //Handle seacrch
  const [query, setQuery] = useState();
  const [dataSouce, setDataSouce] = useState([]);
  const _search = () => {
    if (query == '') {
      setDataSouce(foodLike);
  } else {
      // var toQuery = query.toLowerCase().toString();
      var toQuery = query;
      var newData = foodLike.filter(l => l.name.toLowerCase().match(toQuery));
      setDataSouce(newData);
  }
  };
  const separator = () => {
    return (
      <View style={{ height: 10, width: '100%', backgroundColor: '#e5e5e5' }} />
    );
  };
  //handle food user like



  return (
    <View style={styles.container}>
      <View style={styles.header}>

        <TextInput
          placeholder="Enter food name..."
          placeholderTextColor="gray"
          value={query}
          onChangeText={(query) => setQuery(query)}
          onChange={() => _search()}
          style={styles.input}
        />
        <TouchableOpacity onPress={()=>_search()}>
          <FontAwesome style={{ paddingHorizontal: 10 }} name='shopping-cart' size={28} color='black' />
        </TouchableOpacity>
      </View>
      <FlatList  
        data={dataSouce}
        ItemSeparatorComponent={() => separator()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity onPress={() => props.navigation.navigate('DetailProduct', { foodId: item.id })}>
              <View style={styles.bookContainer}>
                <Image style={styles.image} source={{ uri: (item.linkImage) }} />
                <View style={styles.dataContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.name}
                  </Text>
                  <Text numberOfLines={4} style={styles.description}>
                    Đã bán:  {item.sold}
                  </Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.author}>đ{item.price}</Text>
                    <TouchableOpacity style={{ marginRight: 30 }}>
                      <FontAwesome name='cart-plus' size={32} color='black' />
                    </TouchableOpacity>
                  </View>

                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    width: '100%',
    backgroundColor: '#ff5b77',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    height: 45,
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 10,
  },
  bookContainer: {
    flexDirection: 'row',

  },
  image: {
    height: 100,
    width: 120,
  },
  dataContainer: {
    padding: 10,
    paddingTop: 5,
    width: width - 100,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  author: {
    fontSize: 18,
    textAlign: 'left',
    paddingTop: 15,
    color: '#fe6132'
  },
});
export default Love;
