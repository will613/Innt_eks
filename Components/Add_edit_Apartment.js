import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    ScrollView,
    SafeAreaView, Image, ImageBackground,
} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";

// Først importerer vi de nødvendige pakker for resten af koden
// Lineargradient bruges til styling af knapper på siden



const Add_Apartment = ({navigation,route}) => {
    /* Vi starter med at sætte dens initiale state til at være tom
    Her får vi opsat vores apartment objet og hvilke "informationer" der kan gives på apartment objektet
     */
    const initialState = {
        address: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        payment: '',
        ranking: ''
    }

    const [newApartment,setNewApartment] = useState(initialState);
    /*Denne line kode tjekker om vi er inde på Edit apartment side og ikke apartemnt
    Hvis vi er på Edit aparmtent, så returnere koden med et true*/
    const isEditApartment = route.name === "Edit Apartment";

    useEffect(() => {
        if(isEditApartment){
            const apartment = route.params.apartment[1];
            setNewApartment(apartment)
        }
        /*Når vi forladeren denne screen, så tømmes der for data på siden*/
        return () => {
            setNewApartment(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewApartment({...newApartment, [name]: event});
    }

    const handleSave = () => {
        /*
        Her i denne handleSave gør vi det muligt at gemme de ændringer, som brugerne skriver i felterne, når de skal oprette en apartment
        Hvis en af felterne er tomme, får brugeren alert om dette
         */
        const { address, size, bedrooms, bathrooms, payment, ranking } = newApartment;

        if(address.length === 0 || size.length === 0 || bedrooms.length === 0 || bathrooms.length === 0 || payment.length === 0 || ranking.length === 0 ){
            return Alert.alert('Du har ikke udfyldt alle de nødvendige felter!');
        }

        if(isEditApartment){
            const id = route.params.apartment[0];
            try {
                firebase
                    //Her gør vi det muligt at gemme edits på en bolig opslag
                    .database()
                    .ref(`/Apartments/${id}`)
                    // Her referer vi til det specefikke sted i databasen, hvor den skal finde aparment record ud fra ID'et
                    .update({ address, size, bedrooms, bathrooms, payment, ranking });
                // Vi angiver at den skal bruge .update, som gør at kun redigere felters opdatering bliver gemt
                // Her skubber den så de opdateret values til databasen
                Alert.alert("Din info er nu opdateret");
                const apartment = [id,newApartment]
                // Så snart opslaget er blevet redigeret bliver før tilbage til details siden, hvor brugeren kan se sine opdateringer
                navigation.navigate("Apartment Details",{apartment});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{
            try {
                firebase
                    .database()
                    .ref('/Apartments/')
                    // Her referer vi til det sted i databasen, hvor den skal pushe de values, som brugeren har angivet
                    // Her bruger vi ikke ID, da opslaget ikke findes og der skal skabes et nyt
                    .push({ address, size, bedrooms, bathrooms, payment, ranking });
                // Her pushes de values, som brugeren har angivet til databasen
                Alert.alert(`Du har nu lavet et opslag`);
                //Her får brugeren at vide de succesfuldt har oprettet et opslag
                setNewApartment(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    return (
        // Her opstiller vi et view, hvor man kan tilføje eller redigere opslagene
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/*Her laves der et map, som er nødvendigt da vi skal vise arrays inde i et array, i vores view
                Derfor bliver vi nød til at lave denne opstilling med keys og index*/}
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
                            // Her får brugen præsenteret de felter, som de skal bruge
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newApartment[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    })
                }
                <View>
                    <Text> Ranking A: Between 0 and 2000 DKK in payment</Text>
                    <Text> Ranking B: Between 2001 and 4000 DKK in payment </Text>
                    <Text> Ranking C: Between 4001 and 6000 DKK in payment </Text>
                    <Text> Ranking D: Between 6001 and 8000+ DKK in payment </Text>
                </View>
                {/*Her opstiller vi knapper med gradient farven*/}
                <View style={styles.button}>
                    <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 0, borderRadius: 10, borderColor: 'white', width: '100%', height:'120%',
                        justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <Button color={'white'}  styles={styles.buttontext} title={ isEditApartment ? "Save changes" : 'Add Apartment'} onPress={() => handleSave()} />
                    </LinearGradient>
                </View>
                <View>
                <ImageBackground source={{uri: 'https://features.api.westelm.com/wp-content/uploads/2020/03/west-elm-oakbrook-design-crew-06.jpg'}}
                                 style={{width: '100%', height: '90%'}} />
                </View>
                </ScrollView>
        </SafeAreaView>
    );
}

export default Add_Apartment;

//Lokal styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        fontWeight: 'bold' ,
        fontSize: 18,
        margin: 3
    },
    button:{
        flex: 1,
        marginBottom: 5,
        padding: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        paddingBottom: 5,
        paddingTop: 5
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
    titleText:{
        fontSize: 10,
        fontWeight: 'bold'
    },
    buttontext:{
        alignSelf: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: "bold"
    },
    innerText1: {
        color: 'orange'
    }
});

