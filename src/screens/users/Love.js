import * as React from 'react';
import {View, Text, Button} from 'react-native';


const Love = ({ navigation})=>{
    return (
        <View>
            <Text>
                Thi is pgage you like
            </Text>
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            
           
        </View>
       
    )
}
export default Love;