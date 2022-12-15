import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import MyTabs from "./Components/TabNavigator";
import BottomStack from "./Components/StackNavigator";
//Importere MyTabs og ButtomStack som indeholder applikationen funktionalitet.


// Configurationen til firebase databasen & Authentication
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

//Oprettelse af tilstandvariablerne til brugere
      const [user, setUser] = useState({ loggedIn: false });


// InitializeApp anvendes for at sikre at man kun initiere en bruger når man anvender firebase
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig_database);
      }

    //onAuthstatechanged er metode af firebase, som har til formål at overvåge brugerens tilstand (logget ind vs logget ud)
    //Pba. brugerens status foretages et callback i if/else statement. Enten er brugeren logget ind = rigtigt, ellers (else) logget ind = falsk.
      function onAuthStateChange(callback) {
        return firebase.auth().onAuthStateChanged(user => {
          if (user) {
            callback({loggedIn: true, user: user});
          } else {
            callback({loggedIn: false});
          }
        });
      }

//onAuthStateChanged aktiveres som kommer fra ovenstående kode.
// den undersøger derfor om brugeren er logget ind og aktiv eller ikke aktiv
      useEffect(() => {
        const unsubscribe = onAuthStateChange(setUser);
        return () => {
          unsubscribe();
        };
      }, []);


//Nedenstående er GuestPage og HomePage.
//GuestPage vises hvis man ikke er logget ind og viser derfor funktionen "MyStack
//"MyTabs" er en stack af Login, SignUp og HomeScreen
    const GuestPage = () => {
        return(
            <NavigationContainer>
              <MyTabs/>
            </NavigationContainer>
        )
      }

//Når man logger ind vises HomePage, som viser BottomStack
//BottomStack er en Stack af vores funktionalitet (CRUD-endpoints) samt en tab som gør det muligt at navigere mellem liste af lejligheder
// tilføje en lejlighed samt chatte.

    const HomePage = () => {
    return(
       <NavigationContainer>
            <BottomStack/>
       </NavigationContainer>
    )
  }
//Her returnere vi enten HomePage (når man er logget ind) Eller GuestPage (hvor man enten logger ind eller opretter en bruger)
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
