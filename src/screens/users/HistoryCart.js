import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../components/colors';
import firebase from '../../database/firebase';
import Loading from '../Loading';
import { Button, Avatar } from 'react-native-elements';
import { getUserId } from '../Login';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FancyAlert } from 'react-native-expo-fancy-alerts';
const { width, height } = Dimensions.get('window');

const HistoryCart = ({ navigation }) => {
    const [foodCart, setFoodCart] = useState([]);
    const DATA = [
        {
            created_at: '17:06 17/6/2021',
            status: 'Item 1',
            total: '500000',
        },
        {
            created_at: '17:06 17/6/2021',
            status: 'Item 2',
            total: '500000',
        },
        {
            created_at: '17:06 17/6/2021',
            status: 'Item 3',
            total: '500000',
        },
        {
            created_at: '17:06 17/6/2021',
            status: 'First Item',
            total: '500000',
        },
        {
            created_at: '17:06 17/6/2021',
            status: 'First Item',
            total: '500000',
        },
    ];
    return (
        <View style={styles.container}>
            <FlatList style={{ padding: 15 }}
                data={DATA}
                renderItem={({ item, index }) => {
                    return (

                        <View style={styles.bookContainer}>
                            <View style={styles.dataContainer}>
                                <Text numberOfLines={1} style={styles.title}>
                                  Trạng thái: {item.status}
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.author}>đ{item.total}</Text>
                                    <View  style={{marginLeft: 100 }} >
                                        <Text style={{fontSize: 18}}>{item.created_at}</Text>
                                    </View>
                                </View>

                            </View>
                        </View>

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


export default HistoryCart;
