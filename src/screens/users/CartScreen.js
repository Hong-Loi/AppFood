import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../components/colors';
import firebase from '../../database/firebase';
import Loading from '../Loading';
import { getUserId, getUserCart } from '../Login';

const CartScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    var userId = getUserId();
    const [dataCart, setDataCart] = useState(getUserCart());
    //Get value of firebase
    const [food, setFood] = useState([]);
    const [foodCart, setFoodCart] = useState([]);
    const [user, setUser] = useState();
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();

        setUser({
            ...user,
            id: doc.id
        })
        setLoading(false);
    }
    if (loading) {
        return (
            <Loading />
        )
    }
    useEffect(() => {
        let mounted = true;
        firebase.db.collection('foods').onSnapshot(querySnapshot => {
            const food = [];
            querySnapshot.docs.forEach(doc => {
                const { name, linkImage, price, amount } = doc.data();
                food.push({
                    id: doc.id,
                    name,
                    linkImage,
                    price,
                    amount,
                    count: 1
                })
            });
            setFood(food);
            getUserById(userId);
         
            var getItemIdCart = dataCart.split("-");
            //delete arr[0]
            let showArr = getItemIdCart.filter((item) => {
                return item != 'noData';
            })
            food.filter((item) => {
                for (let i = 0; i < showArr.length; i++) {
                    if (item.id === showArr[i]) {
                        foodCart.push(item);
                    }
                }

            })
            setFoodCart(foodCart);
            _theBill();
        })
        return () => { mounted = false };
    }, [])
    //caculator bill
    const [bill, setBil] = useState(0);
    const _theBill = () => {
        let theRuslt = 0;
        for (let i = 0; i < foodCart.length; i++) {
            var toInt = parseInt(foodCart[i].price);
            theRuslt += toInt;
        }
        setBil(theRuslt);
    }
    //Change pay the bill
    const _activeTheBill=()=>{
           setDataCart(user.userCart);
            alert(user.userCart);
    }
    //set food Count
    const [itemCart, setItemCart] = useState([]);
    const _addValue = (id) => {
         //find id
         let getFood = foodCart.filter((item)=>{
             return item.id == id;
         })
         setItemCart(getFood);

    }
    const _subtractionValue = (count) => {
        count = count - 5;
    }
    const CartCard = ({ item }) => {
        return (
            <View style={style.cartCard}>
                <Image source={{ uri: (item.linkImage) }} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        Còn lại: {item.amount}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>đ{item.price}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.count}</Text>
                    <View style={style.actionBtn}>
                        <TouchableOpacity onPress={() => { _subtractionValue(item.id) }}><Icon name="remove" size={28} color={COLORS.white} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => { _addValue(item.id)  }}><Icon name="add" size={28} color={COLORS.white} /></TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={foodCart}
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (
                    <View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginVertical: 15,
                            }}>

                        </View>
                    </View>
                )}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={()=>{_activeTheBill()}}>
                <View style={style.btnContainer}>
                    <Text style={style.title}>{bill}đ - Thanh toán</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};
const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    cartCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    title:
    {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 18
    },
    btnContainer: {
        backgroundColor: COLORS.primary,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CartScreen;
