import React from 'react'
import { TouchableOpacity, TextInput, KeyboardAvoidingView, StyleSheet, Text, View} from 'react-native';
import  {f, auth, database, storage} from '../../config/config';


class UserAuth extends React.Component {
constructor(props){
    super(props);
    this.state = {
      authStep:0,
      email: "",
      pass: "",
      moveScreen: false
    }
}

componentDidMount = () => {

}

render(){
    return(
        <View style={{flex:1}}>
            <Text>you're not logged in</Text>
            <Text>POST Comment</Text>
        
        </View>
    )
}
}

export default UserAuth;