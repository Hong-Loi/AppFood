import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../components/colors';
import firebase from '../../database/firebase';
import Loading from '../Loading';
import { Button, Avatar } from 'react-native-elements';
import { getUserId } from '../Login';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');

const ManageCart = ({ navigation }) => {
    var userId = getUserId();
    const [foodCart, setFoodCart] = useState([]);
    useEffect(() => {
        firebase.db.collection('invoice')
            .orderBy('createdAt', 'desc')
            .onSnapshot(querySnapshot => {
                const foodCart = [];
                querySnapshot.docs.forEach(doc => {

                    const { createdAt, status, idUser, total, } = doc.data();
                    foodCart.push({
                        id: doc.id,
                        createdAt,
                        status,
                        idUser,
                        total,
                    })
                });

                setFoodCart(foodCart);
            })
    }, [])
    return (
        <View style={styles.container}>
            <FlatList style={{ padding: 15 }}
                data={foodCart}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity  onPress={() => navigation.navigate('ManageDetailHistory', { key: item.key })}>
                            <View style={styles.bookContainer}>
                                <View style={styles.dataContainer}>
                                    <Text numberOfLines={1} style={styles.title}>
                                        Trạng thái: {item.status}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={styles.author}>đ{item.total}</Text>
                                        <View style={{ marginLeft: 120 }} >
                                            <Text style={{ fontSize: 18 }}>{item.createdAt}</Text>
                                        </View>
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
        backgroundColor: '#FFFFCC',
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
        paddingTop: 20,
        color: 'red'
    },
});


export default ManageCart;
