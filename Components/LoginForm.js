import React, { useState} from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import {LinearGradient} from "expo-linear-gradient";

function LoginForm() {

    //Instantiering af statevariabler, der skal benyttes i LoginForm
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    /*
    * handlesubmit er en asyncron metode som håndtere sign in med en prædefineret metode lavet af firebase
    * man anvender hertil signInWithEmailAndPassword, da dette er et krav hos firebase, og det også sådan jeg har sat authenticatoren op.
    * er der en fejl, anvendes setErrorMessage, og printer en fejlbesked til brugeren.
    */
    const handleSubmit = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then((data)=>{
            });

        } catch (error){
            setErrorMessage(error.message)
        }
    }

    //For at overhoved kunne logge ind skal man have en knap
    // HandleSubmit, som er defineret ovenfor, er funktionaliteten til at kunne logge ind
    // Denne funktion bliver eksekveret ved onPress()
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

//I nedenstående kode, returner vi textfelterne til at indsætte dataen
//Der er både tekstfelt for email og password. Styling sker længere nede i denne fil
//Hvis der igen sker en fejl, skrives printes det for brugeren.
// på linje 67, forbindes knappen til koden mellem linje 49 og 68
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

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
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

