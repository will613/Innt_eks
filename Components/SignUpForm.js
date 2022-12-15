import React, {useState} from 'react';
import {Button,Text,
    View,
    TextInput,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import {LinearGradient} from "expo-linear-gradient";
import firebase from "firebase/compat";
//Ovenstående kode er nødvendige r for at kunne få koden til at virke
//LinearGradient er en pakke som gør det muligt at sammensætte flere farver i fx en knap (det bruges kun til styling)


//Her startes funktionen for at kunne oprette en bruger
function SignUpForm() {
    //Her defineres tilstandsvariablerne, som anvendes senere i funktionen for at kunne logge ind
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    //RenderButton, som er en knap, gør det muligt at kunne oprette en bruger, for uden en knap vil man ikke kunne eksekvere koden.
    //På linje 36 eksekveres funktionen "handleSubmit" igennem onPress.
    //Dertil er der lavet lokal styling til knappen. LinearGradient anvendes for at kunne style knappen med 2 forskellige Hex koder
    const renderButton = () => {
        return (
            <View style={styles.button}>
                <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 1, borderRadius: 10,
                    borderColor: 'white', width: 200, height:70,
                    justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                    <Text>
                        <Button color={'white'} onPress={() => handleSubmit()} title="Create user" />;
                    </Text>
                </LinearGradient>
            </View>
        )
    };

//handleSubmit aggere tæt op ad samme logik som loginformen. I stedet for at bruge signInWithEmailAndPassword, anvendes createUserWithEmailAndPassword -->
//Som er en prædefineret metode af firebase. Mail og password bliver derfor indsat som argumenter og opretter en bruger i firebase
//Hvis der sker en fejl logger den en besked. Det kan fx være at man glemmer at udfylde Password, i det man prøver at registrere en bruger.

    const handleSubmit = async() => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then((data)=>{
            });
        } catch (error){
            setErrorMessage(error.message)
        }

    }

//I nedenstående kode, returner vi textfelter til at indsætte dataen i databasen.
//Der er både tekstfelt for email og password, som er påkrævet for at kunne oprette en bruger. Styling sker længere nede i denne fil
//Hvis der sker en fejl, printes en fejlbesked  for brugeren.
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Sign up</Text>
            <TextInput
                color={'white'}
                placeholder="Email address"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={styles.inputField}
            />
            <TextInput
                color={'white'}
                placeholder="Create password"
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

//Eksport af Signuoform, således denne kan importeres og benyttes i andre filer
export default SignUpForm

//Lokal styling til brug i SignUpForm
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

