import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, TextInput, ImageBackground, Button, Alert } from 'react-native';
import firebase from '../../database/firebase';


const ManageDetailUsers = (props) => {
    const initialState = {
        id: '',
        email: '',
        phone: '',
        address: '',

    }
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true)
    // console.log(props.route.params.userId);

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('tusers').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();

        //   console.log(user);
        setUser({
            ...user,
            id: doc.id
        })
        setLoading(false);
    }
    useEffect(() => {
        getUserById(props.route.params.userId);
    }, [])
    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }
    const deleteUser = async () => {
        const dbRef = firebase.db.collection('tusers').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('HomeAdmin');
        alert('ok');
    }
    const openConfirmationAlert = () => {
        Alert.alert('Remove the user', 'Are you sure? ', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log(false) },
        ])
    }
    const updateUser = async () => {
        const dbRef = firebase.db.collection('tusers').doc(props.route.params.userId);
        await dbRef.set({
            password: user.password,
            email: user.email,
            phone: user.phone,
            address: user.address
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
            <View>
                <Text style={styles.tTitle}>Manage user</Text>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Email user" color='black' fontSize={19}
                    value={user.email}
                    onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Phone User" color='black' fontSize={19}
                    value={user.phone}
                    onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder="Address User" color='black' fontSize={19}
                    value={user.address}
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
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputGroup: {

        padding: 0,
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'red',

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


