import React from 'react'
import {TouchableOpacity, FlatList, StyleSheet, Text, View, Image} from 'react-native';
import  {f, auth, database, storage} from '../../config/config';
import {Permissions, ImagePicker} from 'expo';

class upload extends React.Component {
constructor(props){
    super(props);
    this.state = {
        loggedin: false,
        imageId: this.uniqueId()
    }
 
}

_checkPermissions = async () => {
 const {status} = await Permissions.askAsync(Permissions.CAMERA);
 this.setState({camera:status})
  
 const {statusRoll} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
 this.setState({cameraRoll:statusRoll})
}

s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

uniqueId = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' 
    + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
}

findNewImage = async () => {
    this._checkPermissions();

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: true,
        quality: 1

    });

    console.log(result);

    if(!result.cancelled){
    console.log('upload image')  
    this.uploadImage(result.uri);   
    }else{
        console.log('cancel')
    }
}

uploadImage = async () => {
    
//     var that = this;
//     var userid = f.auth().currentUser.uid;
//     var imageId = this.state.imageId;

//     var re = /(?:\.([^.]+))?$/;
//     var ext = re.exec(uri)[1];
//     this.setState({
//       currentFileType: ext});

//     const response = await fetch(uri);
//     const blob = await response.blob();

//     var FilePath = imageId + "." + that.state.currentFileType;

//    const ref = storage.ref('user/'+userid+'/img').child(FilePath);

//    var snapshot = ref.put(blob).on('state_changed', snapshot =>{
//        console.log('Progress', snapshot.bytesTransferred, snapshot.totalBytes);
//    });
}

componentDidMount = () => {
    var that = this;
    f.auth().onAuthStateChanged(function(user){
        if(user){
            // logged in
            that.setState({
                loggedin: true
            });
        }else{
            // not logged in
            that.setState({
                loggedin: false
            });
        }
    });
}

render(){
    return(
        <View style={{flex:1}}>
             {this.state.loggedin == true ? (
            // logged in
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <Text style={{fontSize:28, paddingBottom: 15}}>Upload</Text>
            <TouchableOpacity
            onPress={() => this.findNewImage()}
            style={{paddingVertical: 10, paddingHorizontal:20, backgroundColor: 'blue', borderRadius:5}}>
            <Text style={{color: 'white'}}>Select Photo</Text>
            </TouchableOpacity>
            </View>
        ): (
            //  not logged in
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <Text>you're not logged in</Text>
            <Text>please log in to upload a photo</Text>
            </View>
        )}
        </View>
    )
}
}

export default upload;