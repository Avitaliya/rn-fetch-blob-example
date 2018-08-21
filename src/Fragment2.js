import React from 'react';
import { View, Text, ToastAndroid, StatusBar, Image, FlatList } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

let path = RNFetchBlob.fs.dirs.CacheDir + '/';

const imgURI = ['http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png', 'http://chandra.harvard.edu/photo/2009/rcw86/rcw86_lg.jpg', 'https://stmed.net/sites/default/files/galaxy-wallpapers-30826-7118934.jpg', 'https://www.incomediary.com/wp-content/uploads/2014/12/non-scaled-image-width-1200.jpg', '947', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWonWgUirc_fCPHh3Gk2S208s9LAtjj_pdC7FyeSlwKlXEchZ1iQ', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTwUfr-SDoZjizY4irOYGmGm9WJpgCKBXcbcEjj4mFyzQnjp0V', 'http://iliketowastemytime.com/sites/default/files/imagecache/blog_image/switzerland-river-matt-loiacono-hd-wallpaper.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT42x5MtSZp6y7tS129qts1HuiILxilJdcA9FGWUjj0qgIDYB_1', 'https://images.unsplash.com/photo-1519414119614-31e82ec0cce7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ad0fa0ebca0c58b22d6bf098c974810c&w=1000&q=80'];

export default class Fragment2 extends React.Component{

    state = {
        imagePath : [{key: '1', path: 'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png'}, {key: '2', path: 'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png'}, {key: '3', path: 'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png'}, {key: '4', path: 'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png'}, {key: '5', path: 'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png'}],
        filePath: []
        
    }

    componentWillMount() {

        for(let i=0; i < imgURI.length ; i++){
            const img = path + i + '.png';
            RNFetchBlob.fs.exists(img)
            .then((status) => {
                if(status === true){
                    if(i === imgURI.length -1){
                        ToastAndroid.show('Image is Downloaded!',ToastAndroid.LONG);
                    }
                    let data = this.state.filePath;
                    data = data.push(RNFetchBlob.wrap(img));
                }else{
                    if(i === 0){
                        ToastAndroid.show('Image Downloading...!', ToastAndroid.SHORT);
                    }
                    RNFetchBlob.config({
                        fileCache : true,
                        path: img,
                    })
                    .fetch('GET', imgURI[i])
                    .then((res)=>{
                        ToastAndroid.show('Image Downloaded!', ToastAndroid.LONG);
                        let newPath = RNFetchBlob.wrap(res.data);
                        let data = this.state.filePath;
                        data = data.push(newPath);
                    });
                }
            })
            .catch((error) => {
                console.log('File Checking Exception : ' + error);
            });
        }
    }

   

    render(){
        return(
            <View style={{backgroundColor:'#2196f3', paddingHorizontal: 5, flex: 1}}>
                <StatusBar backgroundColor="#2196f3" barStyle="light-content"/>
                <FlatList
                    data={this.state.filePath}
                    extraData={this.state}
                    renderItem={({item}) => 
                        <View style={{width: '100%', paddingTop: 3}}>
                            <Image source={{uri: item}} style={{width: '100%', height: 200, borderRadius: 5}} resizeMode="contain" />
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

}