import {Button, Image, StyleSheet, Text, View} from "react-native";
import * as React from "react";

function HomeScreen ({ navigation }){
    return (
        <View style={styles.container}>
            <Text style ={styles.text}>Welcome to Minandel </Text>
            <Image style={styles.image} source={{uri: 'https://images1.apartments.com/i2/MtF6IDNpNGZ8GmP7SETNKuvnS1dqB2tmZBh7QFoStRk/117/shamco-apartments-535-w-162nd-st-new-york-ny-building-photo.jpg'}}/>
            <Button title={'Go to Login'} onPress={()=> navigation.navigate('Login')}/>
            <Button title={'Go to Register'} onPress={()=> navigation.navigate('Register')}/>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
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
    image: {
        width:'100%',
        height: '100%',
    }
})