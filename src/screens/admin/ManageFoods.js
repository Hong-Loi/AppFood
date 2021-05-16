import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Image, Button, Alert } from 'react-native';
import firebase from '../../database/firebase';
import { Input, Avatar } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const ManageFoods = (props) => {
    const initialState = {
        id: '',
        name: '',
        linkImage: '',
        price: '',
        sold: '',
        description: ''

    }
    const [food, setFood] = useState();
    const [loading, setLoading] = useState(true)
    // console.log(props.route.params.userId);

    const getFoodById = async (id) => {
        const dbRef = firebase.db.collection('foods').doc(id);
        const doc = await dbRef.get();
        const food = doc.data();

        //   console.log(user);
        setFood({
            ...food,
            id: doc.id
        })
        setLoading(false);
    }
    useEffect(() => {
        getFoodById(props.route.params.foodId);
    }, [])
    const handleChangeText = (name, value) => {
        setFood({ ...food, [name]: value })
    }
    const deleteFood = async () => {
        const dbRef = firebase.db.collection('foods').doc(props.route.params.foodId);
        await dbRef.delete();
        props.navigation.navigate('FoodAdmin');
    }
    const openConfirmationAlert = () => {
        Alert.alert('Remove this food?', 'Are you sure? ', [
            { text: 'Yes', onPress: () => deleteFood() },
            { text: 'No', onPress: () => console.log(false) },
        ])
    }
    const updateFood = async () => {
        const dbRef = firebase.db.collection('foods').doc(props.route.params.foodId);
        await dbRef.set({
            name: food.name,
            linkImage: food.linkImage,
            price: food.price,
            sold: food.sold,
            description: food.description,
        })
        setFood(initialState);
        props.navigation.navigate('FoodAdmin');
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='Blue' />
            </View>
        )
    }
    return (
        <ScrollView>
            <View style={styles.container}>
            {/* Title */}
            <View style={styles.header}>
                 <Avatar rounded style={styles.sImage} source={{uri: (food.linkImage)}}/>
            </View>
            {/* body */}
            <View style={styles.body}>
            <Input style={styles.textIn} value={food.name} autoCorrect={false} placeholder='Tên món ăn' placeholderTextColor="gray" leftIcon={<FontAwesome name='file' size={24} color='black' errorStyle={{ color: 'gray' }} />} onChangeText={(value) => handleChangeText('name', value)} />
            <Input style={styles.textIn} value={food.linkImage} autoCorrect={false} placeholder='Link hình ảnh' placeholderTextColor="gray" leftIcon={<FontAwesome name='link' size={24} color='black' errorStyle={{ color: 'gray' }} />} onChangeText={(value) => handleChangeText('linkImage', value)} />
            <Input style={styles.textIn} value={food.price} autoCorrect={false} placeholder='Giá' placeholderTextColor="gray" leftIcon={<FontAwesome name='tag' size={24} color='black' errorStyle={{ color: 'gray' }} />} onChangeText={(value) => handleChangeText('price', value)} />
            <Input style={styles.textIn} value={food.sold} autoCorrect={false} placeholder='Đã bán' placeholderTextColor="gray" leftIcon={<FontAwesome name='certificate' size={24} color='black' errorStyle={{ color: 'gray' }} />} onChangeText={(value) => handleChangeText('sold', value)} />
            <Input style={styles.textIn} multiline numberOfLines={8} maxLength={500} value={food.description} autoCorrect={false} placeholder='Description' placeholderTextColor="gray" leftIcon={<FontAwesome name='buysellads' size={24} color='black' errorStyle={{ color: 'gray' }} />} onChangeText={(value) => handleChangeText('desctiption', value)} />
            </View>
            {/* footer */}
            <View style={styles.footer}>
            <View style={{flexDirection: 'row',  justifyContent: 'space-around',marginTop: 20, marginBottom: 35}}>
           <View style={styles.vUpdate}> 
               <Button color='white' title='Update food' onPress={()=> updateFood()}/>
               </View>
           <View style={styles.vDetele}>
           <Button color='white' title='Delete food' onPress={()=> openConfirmationAlert()}/>
           </View>
        </View>  
            </View>
        </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 3,
        alignItems: 'center'
    },
    body: {
        flex: 5,
    },
    footer: {
        flex: 1
    },
    sImage:{
        resizeMode: 'stretch',
        width: 230,
        height: 140
    },
    vUpdate:{
        backgroundColor: 'green',
        borderRadius: 20
  },
  vDetele: {
    backgroundColor: 'red',
    borderRadius: 20
  }
})
export default ManageFoods;


