import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Add_Apartment from "./Components/AddApartment";
import ApartmentDetails from "./Components/ApartmentDetails";
import ApartmentList from "./Components/LejlighedList";
import Ionicons from "react-native-vector-icons/Ionicons";
import StackNavigator from "@react-navigation/stack/src/navigators/createStackNavigator";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import MyStack from "./Components/StackNavigator";
import MyTabs from "./Components/TabNavigator";



// Your web app's Firebase configuration
const firebaseConfig_database = {
    apiKey: "AIzaSyCjjBmD6q-n9nVL1D_bC5W9vnDkMZXFF4A",
    authDomain: "innt-eks.firebaseapp.com",
    databaseURL: "https://innt-eks-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "innt-eks",
    storageBucket: "innt-eks.appspot.com",
    messagingSenderId: "949004649498",
    appId: "1:949004649498:web:a2dc26943ce9816733fda3"
};

//const Stack = createStackNavigator();
//const Tab = createBottomTabNavigator();

export default function App() {

    //Oprettelse af statevariablen til brugere
      const [user, setUser] = useState({ loggedIn: false });

      //Her anvendes initaliseApp for at sikre at kun en initieres når man bruger firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig_database);
      }

    //onAuthstatechanged er metode af firebase, som har til formål at overvåge brugerens tilstand (logget ind vs logget ud)
    //Pba. brugerens status foretages et callback i form af setUSer metoden, som håndterer user-state variablens status.
      function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
          if (user) {
            callback({loggedIn: true, user: user});
          } else {
            callback({loggedIn: false});
          }
        });
      }

      //onAuthStateChanged aktiveres, så vi nu kan dynamisk observerer om brugeren er aktiv eller ej.
      useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
          unsubscribe();
        };
      }, []);


    const GuestPage = () => {
        return(
         <NavigationContainer>
           <MyTabs />
         </NavigationContainer>
        );
      }

    const HomePage = () => {
        return (
            <NavigationContainer>
               <MyStack />
            </NavigationContainer>
        )
    }
      return user.loggedIn ?  <HomePage/> : <GuestPage/>   ;
}




























/*
return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name={'Home'} component={HomePage} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
        <Tab.Screen name={'Add'} component={Add_Apartment} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
  */