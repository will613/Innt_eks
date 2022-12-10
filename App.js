import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import MyTabs from "./Components/TabNavigator";
import BottomStack from "./Components/StackNavigator";



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
              <MyTabs/>
            </NavigationContainer>
        )
      }

    const HomePage = () => {
    return(
       <NavigationContainer>
            <BottomStack/>
       </NavigationContainer>
    )
  }

        return user.loggedIn ? <HomePage /> : <GuestPage/> ;
}


/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
