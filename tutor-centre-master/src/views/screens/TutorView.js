import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, TouchableOpacity, Linking } from "react-native";
import { removeUserFromQueue, alertNextPersonInQueue, getQueue } from "../../models/tutorActions";
import { useSocket } from "../../context/socketContext";
import { MaterialIcons } from "@expo/vector-icons";

const TutorView = ({ navigation }) => {
    const [zoomLink, setZoomLink] = useState("https://uno.zoom.us/j/85759495736");
    const [calendlyLink, setCalendlyLink] = useState("https://calendly.com/login");
    const [waitTime, setWaitTime] = useState(0);
    const [queue, setQueue] = useState([]);
    const user = { studentId: "Alex T" };

    const socket = useSocket();

    const handleRemoveUser = async (index) => {
        const result = await removeUserFromQueue(user, index);
        console.log("User removed:", result);
    };

    const handleAlertNextPerson = async () => {
        const result = await alertNextPersonInQueue();
        console.log("Next person alerted:", result);
    };
    const handleQueueUpdated = (data) => {
        console.log("Queue updated:", data);
        setWaitTime(data.estimatedWaitTime);
    };
    const handleTutorGetQueueData = (data) => {
        if (data) {
            console.log("Getting current queue:", data.queue.items);
            setQueue(data.queue.items);
        }
        // console.log(`no queue data currently. ` + data);
    };

    useEffect(() => {
        if (socket) {
            socket.on("queue_updated", handleQueueUpdated);
            socket.on("queue_tutor_data", handleTutorGetQueueData);
            return () => {
                socket.off("queue_updated", handleQueueUpdated);
                socket.off("queue_tutor_data", handleTutorGetQueueData);
            };
        }
    }, [socket]);

    const handleZoomLinkClick = () => {
        Linking.openURL(zoomLink);
    };

    const handleCalendlyLinkClick = () => {
        Linking.openURL(calendlyLink);
    };
    return (
        <View style={styles.view}>
            <Text style={styles.header}>UNO CSCI JAVA HELP DESK</Text>
            <Text style={styles.queueText}>WELCOME TUTORS!</Text>

            <Text style={styles.waitTime}>Wait Time: {waitTime} mins</Text>
            <FlatList
                data={queue}
                renderItem={({ item, index }) => {
                    return (
                        <View style={styles.studentContainer}>
                            <Text style={styles.studentText}>{item.studentId}</Text>
                            <Text style={styles.studentText}>Class: {item.studentClass}</Text>
                            <Text style={styles.studentText}>Problem: {item.problemSummary}</Text>
                            <TouchableOpacity onPress={() => handleRemoveUser(index + 1)}>
                                <MaterialIcons name="delete" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                keyExtractor={(item) => item.session_ID}
                extraData={queue}
                style={styles.flatlist}
            />

            <View style={styles.row}>
                {/* <TouchableOpacity onPress={() => handleRemoveUser()} style={styles.buttonContainer}>
                    <Text style={styles.buttonJoin}>Remove User</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    onPress={() => {
                        handleCalendlyLinkClick();
                    }}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonJoin}>View Calendy Schedule</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleZoomLinkClick} style={styles.buttonContainer}>
                    <Text style={styles.buttonJoin}>Launch the Zoom</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAlertNextPerson} style={styles.buttonContainer}>
                    <Text style={styles.buttonJoin}>Alert Next Person</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}></View>
        </View>
    );
};
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 52,
        fontWeight: "bold",
        textAlign: "center",
        color: "#293C7D",
        marginBottom: 10,
    },
    queueText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#0064A8",
        marginBottom: 20,
    },
    studentContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(227, 228, 228, 1)",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "grey",
        marginBottom: 10,
        width: "100%",
    },
    studentText: {
        fontSize: 16,
        fontWeight: "500",
        color: "rgba(41, 60, 125, 1)",
    },
    flatlist: {
        width: "100%",
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 20,
    },
    buttonContainer: {
        backgroundColor: "#005CA6",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonJoin: {
        fontSize: 20,
        fontWeight: "500",
        color: "white",
    },
    waitTime: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#0064A8",
    },
});

export default TutorView;
