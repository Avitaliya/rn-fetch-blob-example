import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity, TextInput, Button, ToastAndroid
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'

var path = RNFetchBlob.fs.dirs.SDCardDir + '/Documents/test.txt';
export default class App extends Component {

  constructor()
  {
    super()
    this.state = {
      text: '',
    }
  }

  componentDidMount()
  {
    console.log(RNFetchBlob.fs.dirs.SDCardDir);
    

  }

  render() {
    return (
      <View style={{flex:1, padding: 5}}>

        <View>
          <TextInput editable = {true} underlineColorAndroid='transparent' style={{borderWidth: 0.5, marginBottom: 10}} onChangeText={(text) => this.setState({text})}/>
          <Button title="Save File" onPress={() => this.SaveTextFile()} />
        </View>



      </View>
    );
  }

  SaveTextFile()
  {
    let path = RNFetchBlob.fs.dirs.SDCardDir + '/Documents/default.txt';
    RNFetchBlob.fs.createFile(RNFetchBlob.fs.dirs.SDCardDir + '/Documents/default.txt', this.state.text, 'utf8');
    

    RNFetchBlob.fs.exists(path)
    .then((status) => {

        if(status == true){
          console.log('File Exist!');
          RNFetchBlob.fs.unlink(path)
          .then(() => {
            RNFetchBlob.fs.exists(path)
            .then((unlinkstatus) => {
              if(unlinkstatus === false){
                RNFetchBlob.fs.createFile(path, this.state.text, 'utf8');
                ToastAndroid.show('File Updated Success!', ToastAndroid.LONG);
                return true;
              }
            })
            .catch((err) => { 
              console.log(err);
              return true;
            })
           })
          .catch((err) => { 
            console.log(err);
            return true;
          })
        }else{
          RNFetchBlob.fs.createFile(path, this.state.text, 'utf8');
          ToastAndroid.show('File Created Success!', ToastAndroid.LONG);
          return true;
        }

    })
    .catch((error) => { 
      console.log(error);
    });

  }




}