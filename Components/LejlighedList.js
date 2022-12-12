import * as React from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet, Image, View} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";

const ApartmentList = ({navigation}) => {

    const [randomImage, setRandomFrontImage] = React.useState('');
    const frontImage = () => {
        const Images = [
            { image: 'https://migogaalborg.dk/wp-content/uploads/2021/05/pic1-9.png' },
            { image: 'https://images1.forrent.com/i2/o2qiGDuHuq7h_UEQndg_KKEN0k2d-bqdqEn-KpWXBds/117/image.jpg' },
            { image: 'https://migogaalborg.dk/wp-content/uploads/2020/12/Down-Town-Vejgaard_2_2E-GROUP-800x480.png' },
            { image: 'https://img2.thejournal.ie/article/4146251/river/?height=400&version=4147474' },
            { image: 'https://www.domea.dk/media/3421/bygninger-jl-5373-web.png' },
            { image: 'https://media.istockphoto.com/id/1322575582/photo/exterior-view-of-modern-apartment-building-offering-luxury-rental-units-in-silicon-valley.jpg?b=1&s=170667a&w=0&k=20&c=0s6qL5cIMm6LSnryH40h5GmaM6jCi11kchWzsaTJGZE=' },
            { image: 'https://media.istockphoto.com/id/1165384568/photo/europe-modern-complex-of-residential-buildings.jpg?s=612x612&w=0&k=20&c=iW4NBiMPKEuvaA7h8wIsPHikhS64eR-5EVPfjQ9GPOA=' },
            { image: 'https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg' },
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
        height: 180,
        width: '95%',
        justifyContent:'center',
        alignSelf:'center'
    },
    image: {
        width:'106%',
        height:'80%',
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