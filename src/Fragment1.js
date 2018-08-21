import React from 'react';
import { View, Text, Image, ToastAndroid, StatusBar } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

let path = RNFetchBlob.fs.dirs.CacheDir + '/';

export default class Fragment1 extends React.PureComponent{

    state = {
        imagePath : 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png',
        filePath: ''
        
    }

    componentWillMount()
    {
        const img = path + 'Android_robot.png';
        RNFetchBlob.fs.exists(img)
        .then((status) => {
            console.log(status);
            if(status === true){
                ToastAndroid.show('Image is Exist!',ToastAndroid.LONG);
                this.setState({
                    imagePath: RNFetchBlob.wrap(img),
                    filePath: RNFetchBlob.wrap(img)
                });
                return true;
            }else{
                ToastAndroid.show('Image Downloading...!', ToastAndroid.SHORT);
                RNFetchBlob.config({
                    fileCache : true,
                    path: img,
                })
                .fetch('GET', 'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png')
                .then((res)=>{
                    ToastAndroid.show('Image Downloaded!', ToastAndroid.LONG);
                    let newPath = RNFetchBlob.wrap(res.data);
                    console.log(newPath);
                    this.setState({
                        imagePath: newPath,
                        filePath: newPath
                    });
                    return true;
                });
            }
        })
        .catch((error) => {
            console.log('File Checking Exception : ' + error);
        });
        return true;
    }
    
    render(){
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2196f3'}}>
            <StatusBar backgroundColor="#2196f3" barStyle="light-content"/>
                <Image source={{uri: this.state.imagePath}} style={{width: '95%', height: 500, borderRadius: 5}} resizeMode="contain" />
                <Text style={{paddingHorizontal: 15, color: '#FFF'}}>{this.state.filePath}</Text>
            </View>
        );
    }
    
}