import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

export default class Love extends React.Component {
    _getId(){        
        console.log(this.props.route.params.userId);
        return this.props.route.params.userId;
    }
    render() {
      return (
        <View>
            <Button title='Click me' onPress={()=>this._getId()}/>

        </View>
      );
    }
  }