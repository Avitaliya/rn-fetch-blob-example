import React from 'react';
import { View, Image, PermissionsAndroid, StatusBar, ScrollView } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

let path = RNFetchBlob.fs.dirs.CacheDir + '/';

const imgPath = ['https://www.pixelstalk.net/wp-content/uploads/2016/05/HD-Wallpapers-1080p-Widescreen.jpg',
'https://www.hdwallpapersfreedownload.com/uploads/large/special-days/india-independence-day-flag-hd-image.jpg',
'http://s1.picswalls.com/wallpapers/2015/10/11/hd-sci-fi-wallpaper_010015384_283.jpg',
'http://iliketowastemytime.com/sites/default/files/wormhole-abstract-hd-wallpaper-iltwmt.png',
'https://images2.alphacoders.com/564/thumb-1920-564835.jpg',
'http://kb4images.com/images/games-wallpaper/37148084-games-wallpaper.jpg',
'http://hintergrundbild.org/wallpaper/full/2/f/f/39881-hintergrundbilder-fuers-pc-hd-1920x1080-phone.jpg',
'http://bdfjade.com/data/out/149/6514892-wallpaper-hd-pc.png',
'https://www.planwallpaper.com/static/images/dark_game_scene-HD-1080p1.jpg',
'http://wall2born.com/data/out/637/image-43691669-1080p-batman-wallpaper.jpg'];

let data = ['https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png', 'https://www.joomlatools.com/images/developer/ui/placeholder-16-9.png.pagespeed.ce.gT4LjHxoYL.png'];


export default class Fragment1 extends React.Component{

    state = {
        imagePath : data,
        filePath: imgPath      
    }

    componentDidMount()
    {
        console.log(this.state.imagePath);
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
        imgPath.map((img, index) => {
            const newImageURI = path + index + '.png';

            RNFetchBlob.fs.exists(newImageURI)
            .then((status) => {
                if(status === true){
                    let newPath = RNFetchBlob.wrap(newImageURI);
                    data[index] = newPath;
                    this.setState({
                        imagePath: data,
                    });
                }else{
                    RNFetchBlob.config({
                        path: newImageURI,
                    })
                    .fetch('GET', img)
                    .then((res)=>{
                        let newPath = RNFetchBlob.wrap(res.data);
                        data[index] = newPath;
                        this.setState({
                            imagePath: data,
                        });
                    });
                }
            })
            .catch((error) => {
                console.log('File Checking Exception : ' + error);
            });
        });
    }



    render(){
        return(
            <ScrollView style={{flex: 1, backgroundColor: '#2196f3'}}>
            <StatusBar backgroundColor="#2196f3" barStyle="light-content"/>
                {
                    this.state.imagePath.map((img) => 
                        <View style={{width: '100%', alignItems:'center'}}>
                            <Image source={{uri: img}} style={{width: '95%', height: 200, borderRadius: 5}} resizeMode="contain" />
                        </View>
                    )
                }
            </ScrollView>
        );
    }
}