import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import ApartmentList from "./LejlighedList";
import {ChatFunction} from "./Chat"
import ApartmentDetails from "./ApartmentDetails";
import Add_Apartment from "./AddApartment";
import Ionicons from "react-native-vector-icons/Ionicons";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function MyStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen name={'Liste af lejlighed'} component={ApartmentList}/>
            <Stack.Screen name={'Apartment Details'} component={ApartmentDetails}/>
            <Stack.Screen name={'Add Apartment'} component={Add_Apartment}/>
        </Stack.Navigator>
    )
}
    function BottomStack()
    {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false}}>
                <Tab.Screen name={'Home'} component={MyStack}
                            options={{tabBarIcon: () => (<Ionicons name="home" size={20}/>), headerShown: null}}/>
                <Tab.Screen name={'Chat'} component={ChatFunction}
                            options={{tabBarIcon: () => (<Ionicons name="add" size={20}/>)}}/>
            </Tab.Navigator>
        )
    }

export default BottomStack