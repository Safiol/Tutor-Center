import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity, Image} from 'react-native';


const AboutTutors= () =>
{
    

    return (
        <View style={styles.background}>
            <Text style={styles.header}>UNO Computer Science Tutor Center</Text>
            <Text style={styles.joinQueue}> About the Tutors</Text>

            <View style={styles.semester}> 

              <Text style={styles.year}> Spring 2023 Staff</Text>
              <View style={styles.vertSpacing}></View>
              <View style={styles.row}>
                <View>
                  <Image style={styles.headshot} source={require("../../../assets/headshot.jpg")} />
                  <Text style={styles.text}>Jared Wise</Text>
                </View>

                <View style={styles.widthSpacing}> </View>

                <View style={styles.bio}>
                  <Text style={styles.text}>Jared is currently a graduate student in the CSCI Department working to achieve his Master's degree.
                    He enjoys helping undergraduate students grasp the foundations of programming. 
                    Aside from researching and studying machine learning, 
                    Jared spends his free time playing and coaching basketball.</Text>
                </View>
              </View>

              <View style={styles.vertSpacing}></View>

              <View style={styles.row}>
                <View>
                  <Text style={styles.year}> Spring 2023 Schedule</Text>
                  <Image style={styles.schedule} source={require("../../../assets/tutorhours.png")} />
                </View>
                <View style={styles.widthSpacing}> </View>
                <View>
                  <Text style={styles.year}> CSCI Discord</Text>
                  <Image style={styles.schedule} source={require("../../../assets/discord.png")} />
                </View>
              </View>
            </View>
            <Text>https://www.uno.edu/academics/cos/computer-science/undergraduate/tutoring-schedule</Text>

        </View>
    );
};

const styles = StyleSheet.create
({
    header: {
      fontSize: 52,
      fontWeight: "bold",
      //backgroundColor: "#F5FCFF",
      textAlign: "center",
      color: "#293C7D",
    },
    joinQueue: {
      fontSize: 32,
      fontWeight: "bold",
      //backgroundColor: "#F5FCFF",
      textAlign: "center",
      color: "#293C7D",
    },
    background:{
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      flexDirection: "column",
    },
    semester: {
      width: 1000,
      alignItems: "flex-start",
      marginTop: 30,
    },
    year: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#7FA9AE",
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    },
    bio: {
      width: 600,
      borderLeftWidth: 3,
      borderLeftColor: "black",
      paddingLeft: 7,
      alignContent: "center",
    },
    headshot: {
      width: 130,
      height: 130,
      borderRadius: 130 / 2,
    },
    schedule: {
      width: 450,
      height: 250,
    },
    vertSpacing: {
      height: 50,
    },
    widthSpacing: {
      width: 25,
    },
    text: {
      fontSize: 20,
      fontWeight: "light",
      fontFamily: "Verdana",
    },


});


export default AboutTutors;