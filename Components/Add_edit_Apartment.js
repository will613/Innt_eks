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


const Add_Apartment = ({navigation,route}) => {
    const initialState = {
        address: '',
        size: '',
        bedrooms: '',
        bathrooms: '',
        payment: '',
        ranking: ''
    }

    const [newApartment,setNewApartment] = useState(initialState);
    /*Returnere true, hvis vi er på edit apartment*/
    const isEditApartment = route.name === "Edit Apartment";

    useEffect(() => {
        if(isEditApartment){
            const apartment = route.params.apartment[1];
            setNewApartment(apartment)
        }
        /*Fjern data, når vi går væk fra screenen*/
        return () => {
            setNewApartment(initialState)
        };
    }, []);

    const changeTextInput = (name,event) => {
        setNewApartment({...newApartment, [name]: event});
    }

    const handleSave = () => {

        const { address, size, bedrooms, bathrooms, payment, ranking } = newApartment;

        if(address.length === 0 || size.length === 0 || bedrooms.length === 0 || bathrooms.length === 0 || payment.length === 0 || ranking.length === 0 ){
            return Alert.alert('Et af felterne er tomme!');
        }

        if(isEditApartment){
            const id = route.params.apartment[0];
            try {
                firebase
                    .database()
                    .ref(`/Apartments/${id}`)
                    // Vi bruger update, så kun de felter vi angiver, bliver ændret
                    .update({ address, size, bedrooms, bathrooms, payment, ranking });
                // Når bilen er ændret, går vi tilbage.
                Alert.alert("Din info er nu opdateret");
                const apartment = [id,newApartment]
                navigation.navigate("Apartment Details",{apartment});
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }

        }else{
            try {
                firebase
                    .database()
                    .ref('/Apartments/')
                    .push({ address, size, bedrooms, bathrooms, payment, ranking });
                Alert.alert(`Saved`);
                setNewApartment(initialState)
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key,index) =>{
                        return(
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
                {/*Hvis vi er inde på edit car, vis save changes i stedet for add car*/}
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

