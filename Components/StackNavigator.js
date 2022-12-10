import * as React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";

import ApartmentList from "./LejlighedList";
import ApartmentDetails from "./ApartmentDetails"
import Add_Apartment from "./Add_edit_Apartment";
import {Chat} from "./Chat";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MyStack (){
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Liste af lejlighed'} component={ApartmentList}/>
            <Stack.Screen name={'Apartment Details'} component={ApartmentDetails}/>
            <Stack.Screen name={'Edit Apartment'} component={Add_Apartment}/>
            <Stack.Screen name={'Add Apartment'} component={Add_Apartment}/>
        </Stack.Navigator>
    )
}

function BottomStack ()
{
    return(
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen name={'Home'} component={MyStack} options={{tabBarIcon : () => (<Ionicons name="home" size={28}/>), headerShown: null}}/>
            <Tab.Screen name={'Add'} component={Add_Apartment} options={{tabBarIcon : () => (<Ionicons name="add" size={28}/>), headerShown: null}}/>
            <Tab.Screen name={'Chat'} component={Chat} options={{tabBarIcon : () => (<Ionicons name="chatbox-outline" size={28} />), headerShown: null}}/>

        </Tab.Navigator>
    )
}

export default BottomStack