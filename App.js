import React, {Components} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import  {f, auth, database, storage} from './config/config';

import feed from './app/screens/feed';
import upload from './app/screens/upload';
import profile from './app/screens/profile';
import userProfile from './app/screens/userProfile';
import comments from './app/screens/comments';
import uploadOld from './app/screens/uploadOld';

const TabStack = createBottomTabNavigator(
  {
    Feed: {screen: feed},
    Upload: {screen: upload},
    Profile: {screen: profile}
  }
)

const MainStack = createStackNavigator(
  {
    Home: { screen: TabStack },
    User: {screen: userProfile },
    Comments: { screen: comments }
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'

  }
)

export default class App extends React.Component {

constructor(props){
  super(props);
  
}
  render() {
    return (
      <MainStack/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
