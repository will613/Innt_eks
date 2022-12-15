import {Button, ImageBackground, StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {LinearGradient} from "expo-linear-gradient";

// Her bliver homepage billedet importeret
const image ={uri:'https://media.istockphoto.com/id/1388026461/photo/apartment-buildings-in-a-residential-area.jpg?b=1&s=170667a&w=0&k=20&c=qXuT2g8XBsOlEcFNGltso_GApGFZEV0FjR2S44VuFK4=' }

function HomeScreen ({ navigation }){
    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}/>
            <View style={styles.text}>
            <View style={styles.button}>
                {/*Her opstiller vi knapper med gradient farven, som der navigerer til login siden
                Så brugerne bliver navigeret til login siden*/}
                <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 1, borderRadius: 10, borderColor: 'white', width: '100%', height:50,
                    justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <Button color={'white'} title={'Login'} style={styles.buttontext} onPress={()=> navigation.navigate('Login')}/>
                </LinearGradient>
            </View>
            <View style={styles.button} >
                {/*Her opstiller vi knapper med gradient farven, som der navigerer til register siden
                Så brugerne bliver navigeret til register siden*/}
                <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 1, borderRadius: 10, borderColor: 'white',width: '100%', height:50,
                    justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <Button color={'white'} title={'Register'}  onPress={()=> navigation.navigate('Register')}/>
                </LinearGradient>
            </View>
            </View>
        </View>
    )
}

export default HomeScreen

// Lokal styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    button: {
        flex: 1,
        marginBottom: 5,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        paddingBottom: 5,
        paddingTop: 5
    },
    image: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    buttontext:{
       alignSelf: "center",
       justifyContent: "center",
       fontSize: 12,
        fontWeight: "bold"
    },
    text:{
        flexDirection: "row",
        color: 'black',
        paddingBottom: 90,
        paddingTop: 30,
    },
})

