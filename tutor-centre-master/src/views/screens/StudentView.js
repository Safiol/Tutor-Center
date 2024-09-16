import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
//import { FaHome } from "react-icons/fa";
import serverAPI from "../../models/ServerAPI";
import { useSocket } from "../../context/socketContext";

const StudentView = ({ navigation }) => {
    const [waitTime, setWaitTime] = useState(0);
    const socket = useSocket();

    const handleQueueUpdated = (data) => {
        console.log("Queue updated:", data);
        // Update the waitTime state with the new data
        setWaitTime(data.estimatedWaitTime);
    };

    useEffect(() => {
        if (socket) {
            socket.on("queue_updated", handleQueueUpdated);

            return () => {
                socket.off("queue_updated", handleQueueUpdated);
            };
        }
    }, [socket]);

    useEffect(() => {
        const init = async () => {
            try {
                let waitTimeRes = await serverAPI.getQueueWaittime();
                console.log(waitTimeRes);
                setWaitTime(waitTimeRes);
            } catch (error) {
                console.log(error);
            }
        };
        console.log(`useEffect Init Function`);
        init();
    }, []);

    return (
        <View style={styles.background}>
            <Text style={styles.header}>UNO Computer Science Tutor Center</Text>
            <Text style={styles.toptext2}>WELCOME STUDENTS!</Text>

            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("JoinTheQueue")}>
                    <Text style={styles.buttonContainer}>Join the Queue for Help</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.text}>Estimated wait time for queue: {waitTime} minutes.</Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("ScheduleAppointment")}>
                    <Text style={styles.buttonContainer}>Schedule a Tutoring Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("AboutTutors")}>
                    <Text style={styles.buttonContainer}>About the Tutors</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 52,
        fontWeight: "bold",
        //backgroundColor: "#F5FCFF",
        textAlign: "center",
        color: "#293C7D",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#F5FCFF",
    },

    buttonContainer: {
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
    aboutImg: {
        width: 30,
        height: 30,
    },
    aboutContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 120,
    },
    aboutText: {
        fontSize: 20,
    },
    toptext2: {
        fontSize: 22,
        color: "rgba(82,94,107,255)",
        justifyContent: "center", //space-between space-around
        alignItems: "center", //flex-start flex-end center stretch
        flexDirection: "column",
        fontWeight: "bold",
        marginBottom: 20,
    },

    nextPage: {
        color: "#FFFFFF",
        ffontSize: 20,
        fontWeight: "500",
    },

    footing: {
        textAlign: "center",
        marginTop: 50,
        //position: 'absolute',
        bottom: 0,
        //backgroundColor: "#F5FCFF",
    },

    background: {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
    },
    text: {
        fontWeight: "bold",
        fontSize: 15,
    },
});

export default StudentView;
