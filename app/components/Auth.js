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

login = async()=>{

    var email = this.state.email;
    var pass = this.state.pass;
    if(email != '' && pass != ''){
        try{
        let user = await auth.signInWithEmailAndPassword(email, pass); 
        // ('test@user.com', 'password');
        }catch(error){
        console.log(error);
            alert(error);
        }
        }else{
            alert('email or password is empty..')
        }
  }  

  createUserObj= (userObj, email) =>{
    console.log(userObj, email, userObj.uid);
    var uObj = {
        name: 'enter name',
        username: '@name',
        avatar: 'http://www.gravatar.com/avatar',
        email: email
    };
    database.ref('users').child(userObj.uid).set(uObj);
  }

  singup = async()=>{

    var email = this.state.email;
    var pass = this.state.pass;
    if(email != '' && pass != ''){
        try{
        let user = await auth.createUserWithEmailAndPassword(email, pass)
        .then((userObj)=> this.createUserObj(userObj.user, email))
        .catch((error) => alert(error));
        
        // ('test@user.com', 'password');
        }catch(error){
        console.log(error);
            alert(error);
        }
        }else{
            alert('email or password is empty..')
        }
  } 

componentDidMount = () => {

}

render(){
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>you're not logged in</Text>
            <Text>{this.props.message}</Text>
            {this.state.authStep == 0 ?(
                <View style={{marginVertical: 20, flexDirection: 'row'}}>

                    <TouchableOpacity onPress={()=> this.setState({authStep:1})}>
                        <Text style={{fontWeight:'bold', color:'green'}}>Login</Text>
                    </TouchableOpacity>
                    <Text style={{marginHorizontal:10}}>Or</Text>
                    <TouchableOpacity onPress={()=> this.setState({authStep:2})}>
                        <Text style={{fontWeight:'bold', color:'blue'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{marginVertical:20}}>
                    {this.state.authStep == 1 ? (
                        //  log in
                        <View>
                            <TouchableOpacity 
                            onPress={()=> this.setState({authStep:0})}
                            style={{borderBottomWidth:1, paddingVertical:5, marginBottom:10, borderBottomColor:'black'}}>
                                <Text style={{fontWeight:'bold'}}> ⬅️CANCEL</Text>
                            </TouchableOpacity>
                            <Text style={{fontWeight:'bold', marginBottom: 20}}>Login</Text>
                            <Text>E-mail Address:</Text>
                            <TextInput
                            editable={true}
                            keyboardType={'email-address'}
                            placeholder={'enter your e-mail address'}
                            onChangeText={(text)=> this.setState({email: text})}
                            value={this.state.email}
                            style={{width:250, marginVertical: 10, borderWidth:1, padding:5, borderColor: 'grey', borderRadius:3}}
                            />

                            <Text>Password:</Text>
                            <TextInput
                            editable={true}
                            secureTextEntry={true}
                            placeholder={'enter your password'}
                            onChangeText={(text)=> this.setState({pass: text})}
                            value={this.state.pass}
                            style={{width:250, marginVertical: 10, borderWidth:1, padding:5, borderColor: 'grey', borderRadius:3}}
                            />
                        <TouchableOpacity 
                        style={{backgroundColor:'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                        onPress={()=> this.login()}
                        >
                            <Text style={{color:'white'}}>Login</Text>
                        </TouchableOpacity>
                        </View>
                    ) : (
                        // sign up
                        <View>
                        <TouchableOpacity 
                        onPress={()=> this.setState({authStep:0})}
                        style={{borderBottomWidth:1, paddingVertical:5, marginBottom:10, borderBottomColor:'black'}}>
                            <Text style={{fontWeight:'bold'}}> ⬅️CANCEL</Text>
                        </TouchableOpacity>
                        <Text style={{fontWeight:'bold', marginBottom: 20}}>Sign Up</Text>
                        <Text>E-mail Address:</Text>
                        <TextInput
                        editable={true}
                        keyboardType={'email-address'}
                        placeholder={'enter your e-mail address'}
                        onChangeText={(text)=> this.setState({email: text})}
                        value={this.state.email}
                        style={{width:250, marginVertical: 10, borderWidth:1, padding:5, borderColor: 'grey', borderRadius:3}}
                        />

                        <Text>Password:</Text>
                        <TextInput
                        editable={true}
                        secureTextEntry={true}
                        placeholder={'enter your password'}
                        onChangeText={(text)=> this.setState({pass: text})}
                        value={this.state.pass}
                        style={{width:250, marginVertical: 10, borderWidth:1, padding:5, borderColor: 'grey', borderRadius:3}}
                        />
                    <TouchableOpacity 
                    style={{backgroundColor:'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                    onPress={()=> this.singup()}
                    >
                        <Text style={{color:'white'}}>Signup</Text>
                    </TouchableOpacity>
                    </View>
                    )}
                </View>
            )}
        </View>
    )
}
}

export default UserAuth;