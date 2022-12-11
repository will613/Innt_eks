import * as React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";
import {StyleSheet, Text, View} from "react-native";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MyTabs (){
    return(
        <Stack.Navigator >
            <Stack.Screen name="Welcome to MinAndel" component={HomeScreen} options={{
                title: 'Welcome to MinAndel',
                headerTintColor: '#000000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 25
                },
            }}/>
            <Stack.Screen name="Register" component={SignUpForm}/>
            <Stack.Screen name="Login" component={LoginForm}/>
        </Stack.Navigator>

    )
}


export default MyTabs