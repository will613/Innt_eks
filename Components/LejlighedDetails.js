import * as React from 'react';
import { View, Text, Platform, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ApartmentDetails = ({route,navigation}) => {
    const [apartment,setApartment] = useState({});

    useEffect(() => {
        /*Henter apartment values og sætter dem*/
        setApartment(route.params.apartment[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setApartment({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til EditCar skærmen og sender bilen videre med
        // Vi navigerer videre til Edit apartment skærmen og sender bilen videre med
        const apartment = route.params.apartment
        navigation.navigate('Edit Apartment', { apartment });
    };


    // Vi spørger brugeren om de er sikker på at det skal slettes
    const confirmDelete = () => {
        /*Er det mobile?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the apartment listing?', [

                { text: 'Cancel', style: 'cancel' },
                // Vi bruger this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Vi sletter den aktuelle bil
    const  handleDelete = () => {
        const id = route.params.apartment[0];
        try {
            firebase
                .database()
                // Vi sætter bilens ID ind i stien
                .ref(`/Cars/${id}`)
                // Og fjerner data fra den sti
                .remove();
            // Og går tilbage når det er udført
            navigation.goBack();
            // Og går tilbage når det er udført
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!apartment) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <View style={styles.container}>
            <Button title="Edit" onPress={ () => handleEdit()} />
            <Button title="Delete" onPress={() => confirmDelete()} />
            {
                Object.entries(apartment).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>

                            {/*Vores car keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores car values navne */}

                            {/*Vores apartment keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores apartment values navne */}

                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
    );
}

export default ApartmentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: {
        width: 100,
        fontWeight: 'bold' ,
    },
    value: {
        flex: 1
    },
});