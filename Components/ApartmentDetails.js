import * as React from 'react';
import {View, Text, Platform, StyleSheet, Button, Alert, Image, ScrollView} from 'react-native';
import firebase from 'firebase/compat';
import {useEffect, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";



const ApartmentDetails = ({route,navigation}) => {
    const [apartment,setApartment] = useState({});

    //Her linkes der til billeder på nettet, som skal blive vist tilfældigt på bolig opslagene
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
        // Ovenover er der oprettet en matematisk ligning, som randomiser, hvilke billeder der skal blive vist
        return Images[randomImageIndex].image;
    };

    React.useEffect(() => {
        setRandomImage(renderImage);
    });

    useEffect(() => {
        /*Her henter den nødvendige data på apartment og viser dem*/
        setApartment(route.params.apartment[1]);

        /*Når brugeren forlader denne side, så bliver objektet tømt*/
        return () => {
            setApartment({})
        }
    });

    const handleEdit = () => {
        // Her i denne handleEdit håndterer vi at opslagene kan redigeres
        // Brugeren bliver navigeret til Edit Apartment siden, hvor dataen bliver på det valgte opslag bliver sendt med videre
        const apartment = route.params.apartment
        navigation.navigate("Edit Apartment", { apartment });
    };


    // Her dobbeltjekkes der om brugeren gerne vil slette opslaget
    const confirmDelete = () => {
        /*Tjekkes om der er mobile og i så fald, hvilket operativ system det er?*/
        if(Platform.OS ==='ios' || Platform.OS ==='android'){
            Alert.alert('Are you sure?', 'Do you want to delete the apartment listing?', [

                { text: 'Cancel', style: 'cancel' },
                // Der bruges this.handleDelete som eventHandler til onPress
                { text: 'Delete', style: 'destructive', onPress: () => handleDelete() },
            ]);
        }
    };

    // Den aktuelle aparment bliver slettet her
    const  handleDelete = () => {
        const id = route.params.apartment[0];
        try {
            firebase
                .database()
                // her passer vi apartment ID ind i stien, så den rigtige apartment kan slettes
                .ref(`/Apartments/${id}`)
                // Derefter fjeren vi data fra denne sti
                .remove();
            navigation.goBack();
            // Her bliver brugeren sendt tilbage, dette gøres ved brug af navigation .goback
        } catch (error) {
            Alert.alert(error.message);
        }
    };


    if (!apartment) {
        return <Text>Ingen data på opslaget</Text>;
    }

    //Her præsentere den alt dataen for brugerne
    return (
        <ScrollView>
        <View style={styles.container}>
            <Image source={{uri: renderImage()}} style={styles.image}/>
            {
                Object.entries(apartment).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Key navne på aparments bliver vist her*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Her vises de values med label formattet vist for brugerne */}
                            <Text style={styles.value}>{item[1]}</Text>
                            {/*Her vises de values, som der er blevet sendt til databasen på det specifikke opsla */}
                        </View>
                    )
                })
            }
                <View style={styles.container}>
                    <View style={styles.button}>
                        {/*Her opstiller vi knapper med gradient farven*/}
                        <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 1, borderRadius: 10, borderColor: 'white',
                            width: '100%', height:'120%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <Button title={'Edit'} color={'white'} onPress={() => handleEdit() }/>
                        </LinearGradient>
                    </View>
                    <View style={styles.button}>
                        {/*Her opstiller vi knapper med gradient farven*/}
                        <LinearGradient colors={['#ff00d6', '#ff4d00']} style={{borderWidth: 1, borderRadius: 10, borderColor: 'white',
                            width: '100%', height:'120%', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <Button title={'Delete'} color={'white'} onPress={() => confirmDelete()}/>
                        </LinearGradient>
                    </View>
                </View>
        </View>
        </ScrollView>
    );
}

export default ApartmentDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 0,
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
        margin: 0,
        marginHorizontal: 1,
        marginBottom: 5,
        alignSelf: "center",
        justifyContent: 'flex-start',
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