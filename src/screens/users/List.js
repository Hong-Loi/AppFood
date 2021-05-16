

import React, {  useState, useEffect} from 'react';
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



const List = (props) => {
    //Get value of firebase
    const [food, setFood] = useState([])

    useEffect(() => {
        firebase.db.collection('foods').onSnapshot(querySnapshot => {
            const food = [];
            querySnapshot.docs.forEach(doc => {
                const { name, linkImage, price,description } = doc.data();
                food.push({
                    id: doc.id,
                    name,
                    linkImage,
                    price,
                    description
                })
            });
            setFood(food);
            setDataSouce(food);
        })
    }, [])
    //Handle seacrch
    const [query, setQuery] = useState();
    const [dataSouce, setDataSouce] = useState([]);
    
    const _search = () => {
        if (query == '') {
            setDataSouce(food);
        } else {
            // var toQuery  = query.toLowerCase();
            var toQuery  = query;
            var  newData = food.filter(l => l.name.toLowerCase().match(toQuery));
            setDataSouce(newData);
        }
    };
    const separator = () => {
        return (
            <View style={{ height: 10, width: '100%', backgroundColor: '#e5e5e5' }} />
        );
    };

   
    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <TextInput
                    placeholder="Enter food name..."
                    placeholderTextColor="gray"
                    value={query}
                    onChangeText={(query) => setQuery(query)}
                    onChange={()=>_search()}
                    style={styles.input}
                />
               <TouchableOpacity  onPress={()=>_search()}>
               <FontAwesome style={{paddingHorizontal: 10}} name='search' size={24} color='black' />
               </TouchableOpacity>
            </View>
            <FlatList
                data={dataSouce}
                ItemSeparatorComponent={() => separator()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate('DetailProduct', { foodId: item.id })}>
                        <View style={styles.bookContainer}>
                            <Image style={styles.image} source={{uri:(item.linkImage)}} />
                            <View style={styles.dataContainer}>
                                <Text numberOfLines={1} style={styles.title}>
                                    {item.name}
                                </Text>
                                <Text numberOfLines={4} style={styles.description}>
                                    {item.description}
                                </Text>
                                <Text style={styles.author}>đ{item.price}</Text>
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
        padding: 5,
    },
    image: {
        height: 140,
        width: 95,
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
        fontSize: 16,
        textAlign: 'right',
        paddingTop: 10,
        color: '#fe6132'
    },
});
export default List;
