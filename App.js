import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Add_Apartment from "./Components/Add_lejlighed";
//import ApartmentDetails from "./Components/LejlighedDetails";
import ApartmentList from "./Components/LejlighedList";
import Ionicons from "react-native-vector-icons/Ionicons";



export default function App() {

 const Stack = createStackNavigator();
 const Tab = createBottomTabNavigator();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjjBmD6q-n9nVL1D_bC5W9vnDkMZXFF4A",
  authDomain: "innt-eks.firebaseapp.com",
  databaseURL: "https://innt-eks-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "innt-eks",
  storageBucket: "innt-eks.appspot.com",
  messagingSenderId: "949004649498",
  appId: "1:949004649498:web:a2dc26943ce9816733fda3"
};

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

  const StackNavigation = () => {
    return(
        <Stack.Navigator>
          <Stack.Screen name={'Liste af lejlighed'} component={ApartmentList}/>
          <Stack.Screen name={'Tilføj lejlighed'} component={Add_Apartment}/>
        </Stack.Navigator>
    )
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
          <Tab.Screen name={'Add'} component={Add_Apartment} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
