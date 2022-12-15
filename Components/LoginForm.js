import React, { useState} from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import firebase from "firebase/compat";
import {LinearGradient} from "expo-linear-gradient";
//Ovenstående kode mellem linje 1-11 er nødvendige pakker for at kunne få koden til at virke
//LinearGradient er en pakke som gør det muligt at sammensætte flere farver i fx en knap (det bruges kun til styling)

//Her startes funktionen for at kunne logge ind
function LoginForm() {
    //Her defineres tilstandsvariablerne, som anvendes senere i funktionen for at kunne logge ind
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)


    //Når "authentication" opsættes i firebase, er det valgt at anvende Mail og Password som kriterier for at kunne logge ind. Dette ses i handleSubmit.
    //Derfor har firebase en prædefineret metode som anvendes (signInWithEmailAndPassword).
    //Hvis der sker en fejl logger den en besked. Det kan fx være at man glemmer at udfylde Password, i det man prøver at logge ind


    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }

    //RenderButton, som er en knap, gør det muligt at kunne logge ind, for uden en knap vil man ikke kunne eksekvere koden.
    //På linje 50 eksekveres funktionen "handleSubmit" igennem onPress.
    //Dertil er der lavet lokal styling til knappen. LinearGradient anvendes for at kunne style knappen med 2 forskellige Hex koder

    const renderButton = () => {
        return (
        <View style={styles.button}>
        <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 1, borderRadius: 10,
            borderColor: 'white', width: 200, height:70,
            justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
            <Text>
            <Button color={'white'} onPress={() => handleSubmit()} title="Login" />;
                </Text>
        </LinearGradient>
    </View>
        )
    };

//I nedenstående kode, returner vi textfelter til at indsætte dataen i databasen.
//Der er både tekstfelt for email og password, som er påkrævet for at kunne logge ind. Styling sker længere nede i denne fil
//Hvis der sker en fejl, printes en fejlbesked  for brugeren.

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Login</Text>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={styles.inputField}
            />
            {errorMessage && (
                <Text style={styles.error}>Error: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}

//Eksport af Loginform, således denne kan importeres og benyttes i andre filer
export default LoginForm

//Lokal styling til brug i LoginFrom
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 2,
        margin: 20,
        padding: 20,
        width: 300,
        textAlign: "center",
    },
    header: {
        fontSize: 50,
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
    button: {
        height: 40,
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
});

