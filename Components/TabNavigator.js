import * as React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";
import {StyleSheet, Text, View} from "react-native";
//Ovenstående nødvendigt for at kunne lave funktionaliteten

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import HomeScreen from "./HomeScreen";
//Importere 3 funktioner for at kunne lave en hjemmeskærm for derefter at vælge mellem at logge ind eller registrere en bruger



const Tab = createBottomTabNavigator()
//Stack consten bruges for at kunne lave en stack mellem HomeScreen, LogIn og SignUp
const Stack = createStackNavigator()

//"MyTabs" er en funktion som laver en stack mellem HomeScreen, LogIn og SignUp.
//I HomeScreen er der lokal styling
//Kort fortalt gør funktionen det muligt at navigere mellem LogIn og SignUp via HomeScreen

function MyTabs (){
    return(
        <Stack.Navigator >
            <Stack.Screen name="Welcome to MinAndel" component={HomeScreen} options={{
                title: 'MinAndel',
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25,
                },
            }}/>
            <Stack.Screen name="Register" component={SignUpForm}/>
            <Stack.Screen name="Login" component={LoginForm}/>
        </Stack.Navigator>

    )
}


export default MyTabs