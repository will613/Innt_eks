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
        return <Button onPress={() => handleSubmit()} title="Login" />;
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
        borderWidth: 1,
        margin: 20,
        padding: 20,
        width: 200,
        textAlign: "center",
    },
    header: {
        fontSize: 40,
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
});

