import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        height: "100%",
        backgroundColor: "black",
        flexDirecton: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
    },

    text: {
        color: "#f7941d",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    modal: {
        height: "50%",
        backgroundColor: "#fff",
        margin: 6,
        marginTop: 80,
        elevation: 60,
        borderRadius: 5,
    },
});
