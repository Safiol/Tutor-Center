import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";

const HelpInProgress = ({ onDoneBeingHelped }) => {
    const handleZoomLinkClick = () => {
        Linking.openURL("https://uno.zoom.us/j/85759495736");
    };
    return (
        <View style={styles.row}>
            <View style={styles.spacing}></View>
            <View style={styles.zoom}>
                <TouchableOpacity onPress={handleZoomLinkClick}>
                    <Text style={styles.zoomButtonContainer}>Launch the Zoom</Text>
                </TouchableOpacity>
                {/*<Text>Your Zoom link: https://uno.zoom.us/j/85759495736</Text>*/}
                <Text style={styles.text}>Or head to the Math Building: Room 319</Text>
            </View>

            <View style={styles.exit}>
                <Text style={styles.text}>Done Being Helped?</Text>
                <TouchableOpacity style={styles.exitButtonContainer} onPress={onDoneBeingHelped}>
                    <Text style={styles.exitText}>Click to Exit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    zoomButtonContainer: {
        marginHorizontal: 5,
        backgroundColor: "rgba(0,82,145,255)",
        color: "rgba(227, 228, 228, 1)",
        fontSize: 20,
        fontWeight: "500",
        //for buttons
        paddingVertical: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        //marginRight: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    exitButtonContainer: {
        marginHorizontal: 5,
        backgroundColor: "#C4D600",
        color: "rgba(227, 228, 228, 1)",
        fontSize: 20,
        fontWeight: "500",
        //for buttons
        paddingVertical: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        //marginRight: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    exitText: {
        color: "white",
        fontSize: 20,
        fontWeight: "500",

    },
    exit: {
        alignItems: "center",
        borderLeftWidth: 5,
        borderLeftColor: "black",
        marginTop: 45,
        
    },
    zoom: {
        marginTop: 45,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    text: {
        fontWeight: "bold",
        fontSize: 15,
        
    },
    spacing: {
        height: 50,
    },
});

export default HelpInProgress;
