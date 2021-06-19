import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, ImageBackground, Button, Alert } from 'react-native';
import firebase from '../../database/firebase';
import {  Input } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ManageDetailUsers = (props) => {
    const initialState = {
        id: '',
        email: '',
        phone: '',
        address: '',

    }
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)

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
        getUserById(props.route.params.userId);
        return () => { isMounted = false };
    },
    
    [])
    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }
    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('HomeAdmin');
    }
    const openConfirmationAlert = () => {
        Alert.alert('Remove the user', 'Are you sure? ', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log(false) },
        ])
    }
    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.set({
            password: user.password,
            email: user.email,
            phone: user.phone,
            address: user.address,
            role: 0,
           imageUser: user.imageUser,
           userLike: user.userLike
        })
        setUser(initialState);
        props.navigation.navigate('HomeAdmin');
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='Blue' />
            </View>
        )
    }
    return (
        <ImageBackground source={require('../../images/be.jpg')} style={styles.image}>
            <KeyboardAwareScrollView>
            <View>
                <Text style={styles.tTitle}>Manage user</Text>
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Email user" color='black' fontSize={19}
                    value={user.email} leftIcon={<FontAwesome name='envelope' size={24} color='black' errorStyle={{ color: 'red' }} />}
                    onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Phone User" color='black' fontSize={19}
                    value={user.phone} leftIcon={<FontAwesome name='phone' size={24} color='black' errorStyle={{ color: 'red' }} />}
                    onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View style={styles.inputGroup}>
                <Input placeholder="Address User" color='black' fontSize={19}
                    value={user.address} leftIcon={<FontAwesome name='map' size={24} color='black' errorStyle={{ color: 'red' }} />}
                    onChangeText={(value) => handleChangeText('address', value)} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                <View style={styles.vUpdate}>
                    <Button color='white' title='Update User' onPress={() => updateUser()} />
                </View>
                <View style={styles.vDetele}>
                    <Button color='white' title='Delete User' onPress={() => openConfirmationAlert()} />
                </View>
            </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    )
}
    const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGroup: {

        padding: 0,
        marginBottom: 5,
       

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        padding: 30
    },
    tTitle: {
        fontWeight: 'bold',
        color: 'green',
        fontSize: 27,
        textAlign: 'center',
        marginBottom: 35
    },
    vUpdate: {
        backgroundColor: 'green',
        borderRadius: 20
    },
    vDetele: {
        backgroundColor: 'red',
        borderRadius: 20
    }
})
export default ManageDetailUsers;


