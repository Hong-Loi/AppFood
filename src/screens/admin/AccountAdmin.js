import * as React from 'react';
import {View, Text, Button} from 'react-native';


const AccountAdmin = ({ navigation})=>{
    return (
        <View>
            <Text>
                Thi is Profile admin
            </Text>
           <View style={{backgroundColor: 'red'}}>
           <Button color='white' title='Đăng xuất' onPress={()=>navigation.navigate('Login')}/>
           </View>
            
           
        </View>
       
    )
}
export default AccountAdmin;