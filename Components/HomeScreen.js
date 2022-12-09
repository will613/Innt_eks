import { Button, StyleSheet, Text, View } from "react-native";
import * as React from "react";


//Oprette HomeScreen komponent, som er den første side, der vises, når appen kører.
function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to MinAndel</Text>
            <Button title="Go To Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Go To Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}

export default HomeScreen

//Lokal styling
const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        paddingBottom: 100,
        borderColor: 'lightgreen',
        borderWidth: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgreen',
        height: '100%'
    },
    text: {
        fontSize: 20,
    },
    roundButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
    },
});