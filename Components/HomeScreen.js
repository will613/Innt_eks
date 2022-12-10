import {Button, ImageBackground, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

const image ={uri:'https://media.istockphoto.com/id/1388026461/photo/apartment-buildings-in-a-residential-area.jpg?b=1&s=170667a&w=0&k=20&c=qXuT2g8XBsOlEcFNGltso_GApGFZEV0FjR2S44VuFK4=' }

function HomeScreen ({ navigation }){
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
            </ImageBackground>
            <View style={styles.text}>
            <View style={styles.button} >
                <Button color={'black'} title={'Go to Login'} onPress={()=> navigation.navigate('Login')}/>
            </View>
            <View style={styles.button} >
                <Button color={'black'} title={'Go to Register'} onPress={()=> navigation.navigate('Register')}/>
            </View>
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 100,
        paddingBottom: 5,
        paddingTop: 5
    },
    image: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        maxWidth: windowWidth,
    },
    text:{
        flexDirection: "row",
        paddingBottom: 90,
        backgroundColor: '#8db5c2',
        paddingTop: 30,
    },
})
/*
paddingTop:100,
    paddingBottom: 100,
    borderWidth: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: '100%'
},
text: {
    fontSize: 20,
},
roundButton: {
    width: 100,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
},
*/
