import * as React from "react";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";

import ApartmentList from "./LejlighedList";
import ApartmentDetails from "./ApartmentDetails"
import Add_Apartment from "./Add_edit_Apartment";
import {Chat} from "./Chat";
import Ionicons from "react-native-vector-icons/Ionicons";
//Ovenstående kode er nødvendigt for at kunne logikken til at fungere i denne fil.
//Der er importeret ApartmentList, ApartmentDetails og Add_Apartment for at kunne lave en stack med disse.

//Nedenstående const er Stack og Tab.

//Stack consten bruges i funktionen "MyStack". Vi ønsker at lave en stack for at navigere mellem følgende:
//ApartmentList, ApartmentDetails, Add_Apartment (tilføj en lejlighed) samt redigering.
const Stack = createStackNavigator()
//Tab consten bruges i funktionen "ButtomStack". Vi ønsker at lave en navigator i bunden af applikationen for at kunne navigere mellem følgende:
//Home --> viser listen af lejligheder
//Add --> side til at tilføje en lejlighed
//Chat --> For at kunne chatte med ejer af andelsbolig
const Tab = createBottomTabNavigator()


//"MyStack" gør det muligt at lave en stack mellem følgende komponenter:
//ApartmentList, ApartmentDetails & Add_Apartment
//Funktionen bruges i Home tab, for at kunne navigere mellem de forskellige stacks.
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

//"ButttomStack" gør det muligt at navigere mellem følgende sider:
// Home, Add og Chat.
// Home tab tager MyStack som component, som dertil indeholde ovenstående componenter
// Add tab tager Add_apartment som component, for at kunne oprette en andelsbolig
// Chat tab tager Chat som compoenent, for at kunne chatte med ejere af andelsboliger
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