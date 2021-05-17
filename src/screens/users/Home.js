import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, FlatList, SafeAreaView, ScrollView, LogBox, Dimensions } from 'react-native';
import { Divider, Card } from 'react-native-elements';
import firebase from '../../database/firebase';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
const Home = (props) => {
    var i = 0;
    const [food, setFood] = useState([])
    const [foodOne, setFoodOne] = useState([])
    const [foodTwo, setFoodTwo] = useState([])
    const [foodThree, setFoodThree] = useState([])
    const [fQuery, setfQuery] = useState()
    const _searchItem = () => {
        props.navigation.navigate('List');
    }
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        firebase.db.collection('foods').onSnapshot(querySnapshot => {
            const food = [];
            querySnapshot.docs.forEach(doc => {

                const { name, linkImage, price, sold, description } = doc.data();
                food.push({
                    id: doc.id,
                    name,
                    linkImage,
                    price,
                    sold,
                    description,
                })
            });
            //get data form firebase
            setFood(food);
            //sort by sold <<
            const f = food.sort(function(x,y){
                    return y.sold - x.sold;
             })
             
             //sort by sold >>
             //get value random
             const fOne = food.filter((item)=>{
                return food.length=8;
             })
            setFoodOne(fOne);
             //get top 10 sold
             const getTop10 = f.filter((item)=>{
                 return f.length=10;
             })
             setFoodTwo(getTop10);
             //get top 10 sold after
             const getTop10_20 = f.filter((item)=>{
                return item.length=10&&item.sold<50;
            })
              setFoodThree(getTop10_20);
        })
    }, [])


    return (
        <View style={styles.container}>
              <TouchableOpacity onPress={() => _searchItem()}>
            <View style={styles.header}>
              
                    <TextInput
                        placeholder="Bạn muốn tìm gì..."
                        placeholderTextColor="gray"
                        value={fQuery}
                        style={styles.input}
                    />

                    <FontAwesome style={{ paddingHorizontal: 10 }} name='search' size={24} color='black' />
               
            </View>
            </TouchableOpacity>
            {/* body here */}

            <ScrollView>
                <TouchableOpacity>
                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: 'https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-food-festival-cute-food-girl-cartoon-food-banner-image_210127.jpg',
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.fText}>Gợi ý hôm nay</Text>
                <Card>
                    <View>


                        <SafeAreaView style={{ flex: 1 }}>
                            <FlatList showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                // keyExtractor={food => food.id}
                                data={foodOne}
                                renderItem={({ item }) => {
                                    return (
                                        <View>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('DetailProduct', { foodId: item.id })}>
                                                <Image source={{ uri: (item.linkImage) }} style={{ width: 100, height: 100, marginLeft: 20, resizeMode: 'stretch' }} />
                                                <Text style={{ textAlign: 'center' }}>đ{item.price}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}

                            />
                        </SafeAreaView>



                    </View>
                </Card>
                <Text style={styles.fText}>Các món ăn nổi bật</Text>
                {/* Product hot */}

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* 5 product hot */}
                    <View style={{ flex: 1, }}>
                        <SafeAreaView  >
                            <FlatList
                                // keyExtractor={food => food.id}
                                data={foodTwo}
                                renderItem={({ item }) => {

                                    return (

                                        <View style={styles.item}>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('DetailProduct', { foodId: item.id })}>
                                                <Image source={{ uri: (item.linkImage) }} style={{ width: 165, height: 180, marginLeft: 0, resizeMode: 'stretch' }} />
                                                <Divider style={{ backgroundColor: 'white' }} />
                                                <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.name}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Text style={{ color: 'red', fontSize: 12 }}>đ{item.price}</Text>
                                                    <Text style={{ marginLeft: 60, fontSize: 12 }}>Đã bán {item.sold}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>

                                    )
                                }}

                            />
                        </SafeAreaView>
                    </View>
                    {/* 5 product hot after */}
                    <View style={{ flex: 1 }}>
                        <SafeAreaView >
                            <FlatList
                                // keyExtractor={food => food.id}
                                data={foodThree}
                                renderItem={({ item }) => {

                                    return (
                                        <View style={styles.item}>
                                            <TouchableOpacity onPress={() => props.navigation.navigate('DetailProduct', { foodId: item.id })}>
                                                <Image source={{ uri: (item.linkImage) }} style={{ width: 165, height: 180, marginLeft: 0, resizeMode: 'stretch' }} />
                                                <Divider style={{ backgroundColor: 'white' }} />
                                                <Text style={{ textAlign: 'center', fontSize: 17 }}>{item.name}</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    <Text style={{ color: 'red', fontSize: 12 }}>đ{item.price}</Text>
                                                    <Text style={{ marginLeft: 60, fontSize: 12 }}>Đã bán {item.sold}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }}

                            />
                        </SafeAreaView>
                    </View>
                </View>

            </ScrollView>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tinyLogo: {
        width: 377,
        height: 120,
    },
    fText: {
        color: '#EE0000',
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 16,
        marginBottom: 5,
        marginLeft: 8

    },
    item: {
        borderWidth: 1,
        margin: 10
    },
    input: {
        height: 45,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
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
});
export default Home;