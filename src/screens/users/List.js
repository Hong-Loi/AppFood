

import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Image,
    FlatList,
    Dimensions,
    RefreshControl

} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import firebase from '../../database/firebase';
import { getUserId } from '../Login';
import Loading from '../Loading';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
import { Button, Divider, Avatar } from 'react-native-elements';
const List = (props) => {
    const [index, setIndex] = useState(0);

    //dialog
    const [visible, setVisible] = React.useState(false);
    const toggleAlert = React.useCallback(() => {
        setVisible(!visible);
    }, [visible]);
    const _closeApp = () => {
        setVisible(!visible);
    }
    //set notification
    const [nIcon, setnIcon] = useState();
    const [title, setTitle] = useState();
    const [color, setColor] = useState();
    var userId = getUserId();

    // var userCart = getUserCart();
    // alert(getUserCar());
    //Get value of firebase
    const [loading, setLoading] = useState(true);
    const [food, setFood] = useState([]);
    const [user, setUser] = useState();
    const [data, setData] = useState();
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
    useEffect(() => {
        let isMounted = true;
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
            setDataSouce(food);
        })
        return () => { isMounted = false };
    }, [])
    // update cart of user
    const updateCartForUser = async (idFood) => {
        const dbRef = firebase.db.collection('users').doc(userId);
        var strCart = idFood;
        //if user is not like this food
        var getItemIdFoodInSort = user.userCart.split("-");
        let showArr = getItemIdFoodInSort.filter((item) => {
            return item != 'noData';
        })
        //Check food vaild in list 
        let check = false;
        for (let i = 0; i < showArr.length; i++) {
            if (showArr[i] == strCart) {
                check = true;
            }
        }
        if (check == true) {
            setTitle('Bạn đã thêm món ăn này vào giỏ hàng rồi');
            setnIcon('✔');
            setColor('green');
            toggleAlert();
        }
        else {
            setTitle('Thêm thành công vào giỏ hàng');
            setnIcon('✔');
            setColor('green');
            toggleAlert();
            setData(user.userCart);
            await dbRef.set({
                password: user.password,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: 0,
                imageUser: user.imageUser,
                userLike: user.userLike,
                userCart: data + '-' + strCart
            })

        }

    }
    //Handle seacrch
    const [query, setQuery] = useState();
    const [dataSouce, setDataSouce] = useState([]);

    const _search = () => {
        if (query == '') {
            setDataSouce(food);
        } else {
            // var toQuery = query.toLowerCase().toString();
            var toQuery = query;
            var newData = food.filter(l => l.name.toLowerCase().match(toQuery));
            setDataSouce(newData);
        }
    };
    if (loading) {
        <Loading />
    }
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
                    onSubmitEditing={() => {
                        _search();
                    }}
                />
                <TouchableOpacity onPress={() => _search()}>
                    <FontAwesome style={{ paddingHorizontal: 10 }} name='shopping-cart' size={28} color='black' />
                </TouchableOpacity>
            </View>
 
            <FlatList style={{ padding: 15 }}
                data={dataSouce}

                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetailProduct', { foodId: item.id })}>
                            <View style={styles.bookContainer}>
                                <Avatar rounded style={styles.image} source={{ uri: (item.linkImage) }} />
                                <View style={styles.dataContainer}>
                                    <Text numberOfLines={1} style={styles.title}>
                                        {item.name}
                                    </Text>
                                    <Text numberOfLines={4} style={styles.description}>
                                        Đã bán:  {item.sold}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.author}>đ{item.price}</Text>
                                        <TouchableOpacity onPress={() => updateCartForUser(item.id)} style={{ marginRight: 60 }} >
                                            <FontAwesome name='cart-plus' size={32} color='black' />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
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
                }}>
                    <Divider /><Text>{nIcon}</Text></View>}
                style={{ backgroundColor: 'white' }}
            >
                <Text style={{ marginTop: -16, marginBottom: 32, }}>{title}</Text>
                <View style={{ paddingHorizontal: 30 }}>
                    <Button style={{ paddingHorizontal: 40 }} title='Đóng' onPress={() => _closeApp()} />
                </View>
            </FancyAlert>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFCC',
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
        borderWidth: 2,
        borderColor: '#99FF99',
        borderRadius: 20,
        marginBottom: 15
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
export default List;
