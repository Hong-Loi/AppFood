

import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import firebase from '../../database/firebase';
import {getUserId} from '../Login';


const List = (props) => {
    var userId = getUserId();
    //Get value of firebase
    const [food, setFood] = useState([]);
    const [color, setColor] = useState();
    const [user, setUser] = useState();
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('tusers').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();

          console.log(user);
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
            setDataSouce(food);
        })
    }, [])
    //Handle seacrch
    const [query, setQuery] = useState();
    const [dataSouce, setDataSouce] = useState([]);
    const nonAccentVietnamese = (str) => {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
    }
    const _search = () => {
        if (query == '') {
            setDataSouce(food);
        } else {
            // var toQuery = tQuery.toLowerCase();
            var toQuery = query;
            var newData = food.filter(l => l.name.toLowerCase().match(toQuery));
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
                <TouchableOpacity onPress={() => _search()}>
                    <FontAwesome style={{ paddingHorizontal: 10 }} name='search' size={24} color='black' />
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
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.author}>đ{item.price}</Text>
                                        <TouchableOpacity  style={{ marginRight: 30 }}>
                                            <FontAwesome name='cart-plus' size={35} color={color} />
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
export default List;
