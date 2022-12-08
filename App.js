import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import firebase from "firebase";
import firebase from "firebase/compat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
