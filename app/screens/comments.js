import React from 'react'
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import  {f, auth, database, storage} from '../../config/config';

class upload extends React.Component {
constructor(props){
    super(props);
    this.state = {
        loggedin: false
    }
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
        <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
             {this.state.loggedin == true ? (
            // logged in
            <Text>Comments</Text>
        ): (
            //  not logged in
            <View>
            <Text>you're not logged in</Text>

            <Text>POST Comment</Text>
            </View>
        )}
        </View>
    )
}
}

export default upload;