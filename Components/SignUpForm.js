import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


function SignUpForm() {
    //Her defineres state-variablerne som skal bruges i funktionen senere.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //denne knap gør det muligt at oprette en brugere, som aktiverer handleSubmit igennem onPress
    const renderButton = () => {
        return (
    <View style={styles.button}>
      <Text>
        <Button onPress={() => handleSubmit()} title="Create user" />
      </Text>
    </View>
    )
    };


    /*
   * Denne kode agere ligesom login formen. Vi skal have valideret email og password. Dette gøres ved en asynkron kald ved hjælp af en prædefineret metode fra firebase
   * createUserWithEmailAndPassword tager mail og password som argumenter og opretter en bruger i firebase,
   * sker der en fejl, eksekveres linje 43, som er errorMessage (fejlkode)
   */
    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }

// der oprettes inputfelter i return hvor man skriver sine oplysninger, både email og password
// Der kan ske en fejl, og her printes en fejlbesked til brugeren.
// renderButton er inde i dette return, da knappen skal eksekvere funktionaliteten.
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                color={'white'}
                placeholder="email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                color={'white'}
                placeholder="password"
                value={password}
                onChangeText={(password) => setPassword(password)}
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

//Lokal styling til brug i SignUpForm
const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        width: 350,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    header: {
        fontSize: 40,
    },
    button: {
        backgroundColor: '#42A5F5',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 25,
    },
    container:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
    },
});

//Eksport af Signuoform, således denne kan importeres og benyttes i andre komponenter
export default SignUpForm