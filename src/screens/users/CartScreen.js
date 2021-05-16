import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../components/colors';

const CartScreen = ({ navigation }) => {

    const foods = [
        {
            id: '1',
            name: 'Meat Pizza',
            ingredients: 'Mixed Pizza',
            price: '8.30',
            image: require('../../images/ham.jpg'),
        },
        {
            id: '2',
            name: 'Cheese Pizza',
            ingredients: 'Cheese Pizza',
            price: '7.10',
            image: require('../../images/ham.jpg'),
        },
        {
            id: '3',
            name: 'Chicken Burger',
            ingredients: 'Fried Chicken',
            price: '5.10',
            image: require('../../images/ham.jpg'),
        },
        {
            id: '4',
            name: 'Sushi Makizushi',
            ingredients: 'Salmon Meat',
            price: '9.55',
            image: require('../../images/ham.jpg'),
        },
    ];
    const CartCard = ({ item }) => {
        return (
            <View style={style.cartCard}>
                <Image source={item.image} style={{ height: 80, width: 80 }} />
                <View
                    style={{
                        height: 100,
                        marginLeft: 10,
                        paddingVertical: 20,
                        flex: 1,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: COLORS.grey }}>
                        {item.ingredients}
                    </Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>${item.price}</Text>
                </View>
                <View style={{ marginRight: 20, alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>3</Text>
                    <View style={style.actionBtn}>
                        <Icon name="remove" size={25} color={COLORS.white} />
                        <Icon name="add" size={25} color={COLORS.white} />
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
                data={foods}
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
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                Tổng cộng
                             </Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>$50</Text>
                        </View>
                        <View style={{ marginHorizontal: 30 }}>
                            <TouchableOpacity activeOpacity={0.8} >
                                <View style={style.btnContainer}>
                                    <Text style={style.title}>ok chua</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
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
