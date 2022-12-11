import * as React from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ApartmentList = ({navigation}) => {

    const [randomImage, setRandomFrontImage] = React.useState('');
    const frontImage = () => {
        const Images = [
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8372.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8551.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8355.jpg' },
            { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWt7crR0Yo9FwSIo-Rx9PaSy5Pzdk8FBZeuA&usqp=CAU' },
            { image: 'https://www.bolig.com/wp-content/uploads/2020/01/76-m%C2%B2-lejlighed-K%C3%B8benhavn-S-530x300.jpg' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/DSC_8397.jpg' },
            { image: 'https://www.boligdeal.dk/LPUploadImages/Cache/7f99f120-c8b8-46f5-87e1-8ac4d0cfe2ec_550.jpg?t=637345685028042912' },
            { image: 'https://pionerhusene.dk/wp-content/uploads/2019/02/lejlighederne2_web.jpg' },
        ];
        const randomImageIndex = Math.floor(Math.random() * Math.floor(4));
        return Images[randomImageIndex].image;
    };

    React.useEffect(() => {
        setRandomFrontImage(frontImage);
    });

    const [apartments,setApartments] = useState()

    useEffect(() => {
        if(!apartments) {
            firebase
                .database()
                .ref('/Apartments')
                .on('value', snapshot => {
                    setApartments(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!apartments) {
        return <Text>Loading...</Text>;
    }

    const handleSelectApartment = id => {
        /*Her søger vi direkte i vores array af apartments og finder apartment objektet som matcher idet vi har tilsendt*/
        const apartment = Object.entries(apartments).find( apartment => apartment[0] === id /*id*/)
        navigation.navigate('Apartment Details', { apartment });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores cars objekt, og bruger som array til listen
    const apartmentArray = Object.values(apartments);
    const apartmentKeys = Object.keys(apartments);

    return (
        <FlatList
            data={apartmentArray}
            // Vi bruger carKeys til at finde ID på den aktuelle bil og returnerer dette som key, og giver det med som ID til CarListItem
            keyExtractor={(item, index) => apartmentKeys[index]}
            renderItem={({item, index }) => {
                return(
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectApartment(apartmentKeys[index])}>
                        <Text style={styles.title}>
                            {item.address} {item.size}
                        </Text>
                        <View>
                        <Image source={{uri: frontImage()}} style={styles.image}/>
                        </View>
                    </TouchableOpacity>
                )
            }}
        />
    );
}

export default ApartmentList;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 20,
        padding: 10,
        height: 200,
        width: '95%',
        justifyContent:'center',
        alignSelf:'center'
    },
    image: {
        width:'100%',
        height:'85%',
        margin: 10,
        marginHorizontal: 10,
        marginBottom:10,
        alignSelf: "center",
        justifyContent: "center"
    },
    buttonStyle:{
        backgroundColor: 'black',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 30,
    },
    title: {
        marginHorizontal: 10,
        margin: 5,
        marginTop: 15,
        fontWeight: "bold",
        fontSize: 20,
    }
});