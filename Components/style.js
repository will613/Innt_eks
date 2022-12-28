import {StyleSheet} from "react-native";

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