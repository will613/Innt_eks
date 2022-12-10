import * as React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import HomeScreen from "./HomeScreen";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function MyTabs (){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Register" component={SignUpForm}/>
            <Stack.Screen name="Login" component={LoginForm}/>
        </Stack.Navigator>
    )
}

export default MyTabs