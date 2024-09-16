import React from "react";
import {Text, StyleSheet, View, WebView} from "react-native";
import Iframe from 'react-iframe'

const TutorCalendar=()=>{
    return(
        <View style={styles.mainView}>
            <Iframe url="https://www.uno.edu/academics/cos/computer-science/undergraduate/tutoring-schedule"
            position="absolute"
            width="100%"
            id="myId"
            className="myClassname"
            height="100%"
            styles={{height: "600px", width: "1000px"}}/>
        </View>    
        );
};
const styles= StyleSheet.create({
    mainView: {
        //automatically set to flex=column align=stretch
        //justifyContent: "center", //space-between space-around //flex-start flex-end center stretch
        alignItems: "center",
    },

    calendarText: {
        fontSize: 25,
        color: "black",
        justifyContent: "center", //space-between space-around
        alignItems: "center", //flex-start flex-end center stretch
        flexDirection: "column",
        fontWeight: "bold",
    },
});
export default TutorCalendar;