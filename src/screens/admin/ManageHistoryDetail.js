import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import firebase from '../../database/firebase';
import { Input, Avatar, Button, Card } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loading from '../Loading';
import ManageDetailUsers from './ManageDetailUsers';

const ManageHistoryDetail = (props) => {

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.top}>
                <Avatar rounded source={{ uri: 'https://dbk.vn/uploads/ckfinder/images/tranh-anh/anh-buon-3.jpg' }} size="large" />
                <Text style={styles.email}>Email: hongloi12123@gmail.com</Text>
            </View>
            {/* Head Information user */}
            <View style={styles.body}>
                <Text style={styles.phone}>SDT: 056 8442 815</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View>
                        <Text style={styles.phone}>Address: 44 le van chi</Text>
                        <Text style={styles.phone}>Tổng hoá đơn: <Text style={styles.price}>9000đ</Text></Text>
                        <Text style={styles.phone}>Thời gian: 18/02/2021</Text>
                    </View>
                    <View>
                        <Button title= "Cập nhật"/>
                    </View>
                </View>
                <Text style={styles.phone}>Trạng thái: Đang chờ</Text>
            </View>
            {/* Bottom */}
            <View style={styles.bottom}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1.2,
    },
    email: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        flex: 2
    },
    phone: {
        fontSize: 16,
        marginTop: 18
    },
    price: {
        color: 'red',
        fontWeight: 'bold'
    },
    bottom: {
        flex: 6
    }


})
export default ManageHistoryDetail;


