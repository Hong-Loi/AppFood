import { useEffect, useState } from 'react';
import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Avatar, Card, Divider } from 'react-native-elements';
import firebase from '../../database/firebase';

const SettingUser = (props) => {
    const [user, setUser] = useState();
    //set result when user yes and no
    const [color,setColor]=useState();
    const [show, setShow] = useState();
    //Hanld firebase with data
    const [loading, setLoading] = useState(true)
    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }
    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('tusers').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();

        setUser({
            ...user,
            id: doc.id
        })
        setLoading(false);
    }
    useEffect(() => {
        getUserById(props.route.params.userId);
    }, [])
    //Update this user
    const openConfirmationAlert = () => {
        Alert.alert('Bạn có chắc muốn thay đổi thông tin không?', '（￣︶￣）↗　', [
            { text: 'Yes', onPress: () => updateUser() },
            { text: 'No', onPress: () => cancelUpdate() },
        ])
       
    }
    //Alert cancel of update
    const cancelUpdate = () =>{
        setShow('Bạn đã hủy bỏ');
        setColor('red');
    }
    const updateUser = async () => {
        try{
            setShow('Bạn đã thay đổi thông tin thành công');
            setColor('green');
            const dbRef = firebase.db.collection('tusers').doc(props.route.params.userId);
            await dbRef.set({ 
                email: user.email,
                phone: user.phone,
                address: user.address,
                password: user.password
            })
            setUser(initialState);
         
        }catch(error){
            console.log(console.error);
        }
       
        
    }
    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='Blue' />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.head}>
                <Avatar
                    rounded
                    source={require('../../images/user.jpg')}
                    style={styles.sAvatar}
                    size="large"
                />
                {/* Name  */}
                <View style={styles.vName}>
                    <Text style={styles.tName}>Infomation</Text>
                </View>
                <View style={{ backgroundColor: 'orange', paddingHorizontal: 5,alignItems: 'center', borderRadius: 40, marginLeft: 18 }}>
                    <Button style={{borderWidth: 2}} color='white' title='Đổi mật khẩu' onPress={()=>props.navigation.navigate('ChangePassword',{userId: user.id})}/>
                </View>
            </View>

            {/* body */}
            <View style={styles.body}>
                <Card>
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
                
                </Card>
            </View>
            {/* Footer */}
            <View style={{marginTop: 40}}><Text style={{textAlign: 'center', color: (color), fontSize: 16,fontWeight: 'bold'}}>{show}</Text>
                    </View>
            <View style={styles.footer}>
                <View style={{ flex: 0.5, backgroundColor: '#ff5b77', justifyContent: 'center', }}>
                    <Button color='white' title='Cập nhật thông tin' onPress={() => openConfirmationAlert()} />
                </View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    head: {
        flex: 1.5,
        backgroundColor: '#ff5b77',
        alignItems: 'center',
        padding: 21,
        flexDirection: 'row'
    },
    body: {
        flex: 5,
        marginTop: 40
    },
    footer: {
        flex: 2,
        padding: 25,
        paddingTop: 120
    },
    sAvatar: {

        width: 80,
        height: 80
    },
    tName: {
        color: 'white',
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 10
    },
    vName: {
        marginLeft: 20,
    },
    inputGroup: {

        padding: 0,
        marginBottom: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'red',

    },



})
export default SettingUser;