import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import HomeScreen from "./HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import Add_Apartment from "./AddApartment";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
//Opretter den tabnavigator, der bruges til at navigere, når man er logget ind
/*
function MyTabs() {
    return(

            <Tab.Navigator>
                <Tab.Screen name="Register" component={SignUpForm} />
                <Tab.Screen name="Login" component={LoginForm}/>
            </Tab.Navigator>

    )
}*/

function MyTabs() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Register" component={SignUpForm}/>
            <Stack.Screen name="Login" component={LoginForm}/>
        </Stack.Navigator>
    )
}

export default MyTabs


