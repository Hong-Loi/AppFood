import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList, Image, Linking,Alert } from 'react-native';
import firebase from '../../database/firebase';
import { Card } from 'react-native-elements';
import color from 'color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Tab } from 'react-native-elements';
import {getUserId} from '../Login';

const DetailProduct2 = (props) => {
    var i = 0;
    var userId = getUserId();
    const [foodOne, setFoodOne] = useState([])
    const [foodTwo, setFoodTwo] = useState([])
    const [color, setColor] = useState()
    useEffect(() => {
        firebase.db.collection('foods').onSnapshot(querySnapshot => {
            const food = [];
            querySnapshot.docs.forEach(doc => {

                const { name, linkImage, price, sold, description } = doc.data();
                if (i >= 0 && i <= 5) {
                    foodOne.push({
                        id: doc.id,
                        name,
                        linkImage,
                        price,
                        sold,
                        description,
                    })
                }
                if (i >= 5 && i <= 10) {
                    foodTwo.push({
                        id: doc.id,
                        name,
                        linkImage,
                        price,
                        sold,
                        description,
                    })
                }
                i++;
            });
            setFoodOne(foodOne);
            setFoodTwo(foodTwo);
        })
    }, [])
    const initialState = {
        id: '',
        name: '',
        linkImage: '',
        price: '',
        sold: '',
        description: '',

    }
    const [food, setFood] = useState();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    //get user id
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('tusers').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();

          console.log(user);
        setUser({
            ...user,
            id: doc.id
        })
        setLoading(false);
    }
    //get food id
    const getFoodById = async (id) => {
        const dbRef = firebase.db.collection('foods').doc(id);
        const doc = await dbRef.get();
        const food = doc.data();

        //   console.log(food);
        setFood({
            ...food,
            id: doc.id
        })
        setLoading(false);
    }
    useEffect(() => {
        getFoodById(props.route.params.foodId);
        getUserById(userId);
    }, [])
    const _checkFoodThisUserLike=()=>{
        
    }
    //when user want add it in list like
    const _deleteFoodUserLike = async () =>{
        setColor('black');
        const dbRef = firebase.db.collection('tusers').doc(userId);
        var strLike = food.id;
        //if user is not like this food
        var getItemIdLike = user.userLike.split("-");
        let deleteThisFood = getItemIdLike.filter((item)=>{
            return item!=strLike;
        })
        var newStr = deleteThisFood.join('-');
        console.log(newStr);
        await dbRef.set({
            password: user.password,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: 0,
            imageUser: user.imageUser,
            userLike: newStr
        })

    }
    const updateLike = async () => {
        const dbRef = firebase.db.collection('tusers').doc(userId);
        var strLike = food.id;
        //if user is not like this food
        var getItemIdLike = user.userLike.split("-");
        let showArr = getItemIdLike.filter((item)=>{
            return item!='undefined';
        })
        //Check food vaild in list 
        let check=false;
        for(let i=0;i < showArr.length;i++){
            if(showArr[i]==strLike){
                check=true;
            }
        }
        if(check==true){
            setColor('red');
            Alert.alert('Bạn muốn xoá món ăn ra khỏi danh sách yêu thích?', '[]~(￣▽￣)~*', [
                { text: 'Có', onPress: () => _deleteFoodUserLike() },
                { text: 'Không', onPress: () => console.log(false) },
            ])
        }
        else{
            setColor('red');
             await dbRef.set({
                password: user.password,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: 0,
                imageUser: user.imageUser,
                userLike: user.userLike + '-' + strLike
            })
        }
        
     
           
        
    }
    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='Blue' />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Image source={{ uri: (food.linkImage) }} style={{ width: 377, height: 200, marginLeft: 0, resizeMode: 'stretch' }} />
                </View>
                <View style={styles.cont}>
                    <Text style={styles.sTitle}>{food.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.sPrice}>Giá: {food.price} vnđ</Text>
                        <TouchableOpacity onPress={()=>updateLike()} style={{marginRight: 14}}>
                            <FontAwesome name='heart' size={30} color={color} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.sPrice}>Đã bán: {food.sold} </Text>
                        <Text style={styles.sPrice}>Số lượng: {food.amount}</Text>
                    </View>
                </View>
                <Divider style={{ backgroundColor: 'black' }} />
                <View style={styles.vFoody}>
                    <Text style={styles.tDescription1}>Mô tả</Text>
                </View>
                <Card>
                    <View style={styles.vFood}>

                        <Text style={styles.tDescription2}>{food.description}</Text>
                    </View>
                </Card>
                <View style={{ paddingLeft: 17, paddingTop: 30 }}>
                    <Text style={styles.tDescription1}>Có thể bạn cũng thích</Text>
                </View>
                <Card>
                    <View style={styles.vFoodx}>


                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {/* 5 product hot */}
                            <View style={{ flex: 1, }}>
                                <SafeAreaView >
                                    <FlatList
                                        keyExtractor={food => food.description}
                                        data={foodOne}
                                        renderItem={({ item }) => {

                                            return (
                                                <TouchableOpacity onPress={() => props.navigation.replace('DetailProduct', { foodId: item.id })}>
                                                    <View style={styles.item}>
                                                        <Image source={{ uri: (item.linkImage) }} style={{ width: 133, height: 160, marginLeft: 0, resizeMode: 'stretch' }} />
                                                        <Divider style={{ backgroundColor: 'white' }} />
                                                        <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.name}</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                            <Text style={{ color: 'red', fontSize: 12 }}>{item.price}</Text>
                                                            <Text style={{ marginLeft: 33, fontSize: 12 }}>Đã bán {item.sold}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />
                                </SafeAreaView>
                            </View>
                            {/* 5 product hot after */}
                            <View style={{ flex: 1 }}>
                                <SafeAreaView >
                                    <FlatList
                                        keyExtractor={food => food.description}
                                        data={foodTwo}
                                        renderItem={({ item }) => {

                                            return (
                                                <TouchableOpacity onPress={() => props.navigation.replace('DetailProduct', { foodId: item.id })}>
                                                    <View style={styles.item}>
                                                        <Image source={{ uri: (item.linkImage) }} style={{ width: 133, height: 160, marginLeft: 0, resizeMode: 'stretch' }} />
                                                        <Divider style={{ backgroundColor: 'white' }} />
                                                        <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.name}</Text>
                                                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                            <Text style={{ color: 'red', fontSize: 12 }}>{item.price}</Text>
                                                            <Text style={{ marginLeft: 33, fontSize: 12 }}>Đã bán {item.sold}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        }}

                                    />
                                </SafeAreaView>
                            </View>
                        </View>

                    </View>
                </Card>

            </ScrollView>
            <Tab>
                <View style={{ flexDirection: 'row', flex: 1.6 }}>
                    <View style={{ flex: 1, backgroundColor: '#259d55' }}>
                        <Button type="clear" onPress={() => { Linking.openURL('tel:056 8442815'); }} icon={<FontAwesome name='phone' size={31} color='white' />} />
                    </View>
                    <Divider />
                    <Divider style={{ backgroundColor: 'blue' }} />
                    <TouchableOpacity style={{ flex: 1, backgroundColor: '#259d55', borderRightWidth: 1, borderLeftWidth: 1 }}>
                        <Button onPress={()=>_deleteFoodUserLike()}  type="clear" icon={<FontAwesome name='comment' size={31} color='white' />} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1.5, backgroundColor: 'red', color: 'red', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 22, color: 'white', }}>Mua ngay</Text>
                    </TouchableOpacity>

                </View>
            </Tab>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cont: {
        padding: 15
    },
    sTitle: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'green',
        marginTop: 10
    },
    sPrice: {
        fontSize: 16,
        color: 'black',
        marginTop: 30
    },
    sAmount: {
        fontSize: 16,
        color: 'black',
        marginTop: 30,
    
    },
    vFood: {
        padding: 0,
    },
    vFoodx: {
        padding: 0,
    },
    vFoody: {
        paddingTop: 26,
        paddingLeft: 17
    },
    tDescription1: {
        fontWeight: 'bold',
        fontSize: 18
    },
    tDescription2: {
        marginTop: 15,
        fontSize: 18
    },
    item: {
        borderWidth: 1,
        margin: 10
    }

})
export default DetailProduct2;


