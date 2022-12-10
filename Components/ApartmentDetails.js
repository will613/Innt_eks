import * as React from 'react';
import {View, Text, Platform, StyleSheet, Button, Alert, Card, Image} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import {Chat} from "./Chat";



const ApartmentDetails = ({route,navigation}) => {
    const [apartment,setApartment] = useState({});

    const [randomImage, setRandomImage] = React.useState('');

    const renderImage = () => {
        const Images = [
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8372.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8551.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8355.jpg' },
            { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWt7crR0Yo9FwSIo-Rx9PaSy5Pzdk8FBZeuA&usqp=CAU' },
            { image: 'https://www.bolig.com/wp-content/uploads/2020/01/76-m%C2%B2-lejlighed-K%C3%B8benhavn-S-530x300.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8387.jpg' },
            { image: 'https://s3.eu-central-1.amazonaws.com/lejeboligdata/images/lease/1603700/c7e16afa-6753-4e4a-83c0-131042288035_large.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/lejlighederne2_web.jpg' },
        ];
        const randomImageIndex = Math.floor(Math.random() * Math.floor(4));
        return Images[randomImageIndex].image;
    };

    React.useEffect(() => {
        setRandomImage(renderImage);
    });

    useEffect(() => {
        /*Henter apartment values og sætter dem*/
        setApartment(route.params.apartment[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setApartment({})
        }
    });

    const handleEdit = () => {
        // Vi navigerer videre til Edit apartment skærmen og sender den specifike apartment videre med
        const apartment = route.params.apartment
        navigation.navigate("Edit Apartment", { apartment });
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
                .ref(`/Apartments/${id}`)
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
            {
                Object.entries(apartment).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores apartment keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores apartment values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>

                    )
                })
            }
            <View>
                <Image source={{uri: renderImage()}} style={styles.image}/>
                <View style={styles.container}>
                    <View style={styles.button}>
                        <Button title={'Edit'} color={'white'} onPress={() => handleEdit() }/>
                    </View>
                    <View style={styles.button}>
                        <Button title={'Delete'} color={'white'} onPress={() => confirmDelete()}/>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ApartmentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 11,
    },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    image: {
        width:'100%',
        height:'60%',
        margin: 10,
        marginHorizontal: 10,
        marginBottom:10,
        alignSelf: "center",
        justifyContent: "center"
    },
    button:{
    backgroundColor: 'black',
        borderWidth: 4,
        borderColor: 'white',
        borderRadius: 30,
        marginTop: 5,
    },
    label: {
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        fontWeight: 'bold' ,
        fontSize: 18,
        margin: 3
    },
    value: {
        flex: 1,
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        margin: 4
    },
});