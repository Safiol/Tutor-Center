import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import HelpInProgress from "../components/HelpInProgress";
//import { FaCalendarAlt } from "react-icons/fa";
import serverAPI from "../../models/ServerAPI";
import { useSocket } from "../../context/socketContext";
import { joinQueue, leaveQueue } from "../../models/studentActions";

const JoinTheQueue = ({ navigation }) => {
    const [waitTime, setWaitTime] = useState(0);
    const [queuePosition, setQueuePosition] = useState(null);
    const [hasJoined, setHasJoined] = useState(false);
    const [isBeingHelped, setIsBeingHelped] = useState(false);
    const [studentClass, setStudentClass] = useState("");
    const [problemSummary, setProblemSummary] = useState("");
    const [queueSize, setQueueSize] = useState(0);

    let user = { studentId: "Alex T", position: queuePosition };

    const socket = useSocket();

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
        init();
    }, []);

    useEffect(() => {
        if (queuePosition > queueSize) {
            console.log(`here!!!!!`);
            setQueuePosition((queuePosition) => Math.max(queuePosition - 1, 0));
        } else if (queuePosition === 0 && hasJoined) {
            setIsBeingHelped(true);
        } else if (queuePosition === null) {
            setIsBeingHelped(false);
        }
        console.log(`useEffect Init Function`);
    }, [queueSize]);

    useEffect(() => {
        if (socket) {
            socket.on("queue_updated", handleQueueUpdated);
            socket.on("tutor_alert_next_person", handleTutorAlertNextPerson);
            socket.on("user_left", handleUserLeft);
            // socket.on("tutor_remove_user", handleTutorRemoveUser);

            return () => {
                socket.off("queue_updated", handleQueueUpdated);
                socket.off("tutor_alert_next_person", handleTutorAlertNextPerson);
                socket.off("user_left", handleUserLeft);
                // socket.off("tutor_remove_user", handleTutorRemoveUser);
            };
        }
    }, [socket, queuePosition]);

    const handleQueueUpdated = (data) => {
        console.log("Queue updated:", data);
        setWaitTime(data.estimatedWaitTime);
        setQueueSize(data.size);
    };

    const handleDoneBeingHelped = () => {
        // Reset the states
        setIsBeingHelped(false);
        setHasJoined(false);
        setQueuePosition(null);
        navigation.navigate("Student");
    };

    const handleTutorAlertNextPerson = () => {
        setQueuePosition((queuePosition) => Math.max(queuePosition - 1, 0));
    };

    // const handleTutorRemoveUser = (data) => {
    //     console.log('tutor removed another student: ', data)
    //     let otherPosLeft = data.position;

    //     // setQueuePosition((queuePosition) => Math.max(queuePosition - 1, 0));
    // };

    const handleUserLeft = (data) => {
        console.log(`Data for other user leaving: `, data.position);
        let otherPosLeft = data.position;
        console.log(`queuePos: `, queuePosition);
        if (otherPosLeft === queuePosition - 1) {
            handleDoneBeingHelped();
        } else {
            setQueuePosition((queuePosition) => Math.max(queuePosition - 1, 0));
        }
    };

    return (
        <View style={styles.background}>
            <Text style={styles.header}>UNO Computer Science Tutor Center</Text>

            <Text style={styles.joinQueue}>Join the Queue for Help</Text>
            <View style={styles.spacing2} />
            {/*<Text>Tutor: Jared Wise</Text>*/}

            {isBeingHelped ? (
                <HelpInProgress onDoneBeingHelped={handleDoneBeingHelped} />
            ) : hasJoined ? (
                <View>
                    {/*QUEUE STUFF*/}
                    <View style={styles.row}>
                        <View style={styles.queue}>
                            <Text style={styles.queueText}> You are now in line!</Text>
                            <Text style={styles.queueText}>Here is your position in the queue:</Text>
                            <View style={styles.circle}>
                                <Text style={styles.circleText}>{queuePosition === null ? "Not in line" : queuePosition}</Text>
                                <Text style={styles.circleText2}> out of {queueSize} </Text>
                            </View>
                            <Text style={styles.queueText}>Estimated Total Wait Time:</Text>
                            <Text style={styles.queueText}> {waitTime} minutes</Text>
                        </View>
                    </View>

                    {/*LEAVE BUTTON*/}
                    <TouchableOpacity style={styles.button} onPress={() => leaveQueue(user, handleDoneBeingHelped)}>
                        <Text style={styles.buttonLeave}>Leave</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    {/*QUEUE STUFF*/}
                    <View style={styles.row}>
                        <View style={styles.queue}>
                            <Text style={styles.queueText}> Hi {user.studentId}!</Text>
                            <Text style={styles.queueText}> Here is your position in the queue:</Text>
                            <View style={styles.circle}>
                                <Text style={styles.circleText2}>{queuePosition === null ? "Not in line" : queuePosition}</Text>
                            </View>
                            <Text style={styles.queueText}>Total in queue: {queueSize}</Text>
                            <View style={styles.row}>
                                <View style={styles.dots}> </View>
                                <View style={styles.dots}> </View>
                                <View style={styles.dots}> </View>
                            </View>
                            <Text style={styles.queueText}> Estimated Total Wait Time:</Text>
                            <Text style={styles.queueText}> {waitTime} minutes</Text>
                        </View>
                    </View>

                    {/*DATA COLLECTION AND JOIN THE QUEUE*/}
                    <View style={styles.inputContainer}>
                        <Text style={styles.dataCollection}>Class:</Text>
                        <TextInput style={styles.input} onChangeText={setStudentClass} value={studentClass} placeholder="Enter your class" />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.dataCollection}>In one sentence, what are you here to recieve help on?</Text>
                        <TextInput style={styles.input} onChangeText={setProblemSummary} value={problemSummary} placeholder="Enter a summary of your problem" />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => joinQueue(user, setQueuePosition, setHasJoined, studentClass, problemSummary)}>
                        <Text style={styles.buttonJoin}>Click to Join</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/*<Text style={styles.footing}>Intro to Software Engineering Spring 2023</Text>*/}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        width: "75%",
        textAlign: "center",
    },

    header: {
        fontSize: 52,
        fontWeight: "bold",
        //backgroundColor: "#F5FCFF",
        textAlign: "center",
        color: "#293C7D",
    },
    queue: {
        //backgroundColor: "green",
        padding: 5,
        //color: "white",
        width: 1000,
        height: 300,
        //justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 5,
        //borderColor: "black",
        borderTopColor: "black",
    },
    queueText: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "#0064A8",
    },
    buttonJoin: {
        backgroundColor: "#4CBB17",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginRight: 20,
        fontSize: 20,
        fontWeight: "500",
        color: "white",
        width: 200,
    },
    buttonLeave: {
        backgroundColor: "#D22B2B",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        //marginRight: 20,
        fontSize: 20,
        fontWeight: "500",
        color: "white",
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#F5FCFF",
    },

    buttonContainer: {
        backgroundColor: "#005CA6",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
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

    dataCollection: {
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Helvetica",
    },

    circle: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: "#FFBF3F",
        justifyContent: "center",
        alignItems: "center",
    },

    circleText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },

    circleText2: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        color: "black",
    },

    dots: {
        width: 7,
        height: 7,
        borderRadius: 7 / 2,
        backgroundColor: "#FFBF3F",
        marginRight: 2,
        marginTop: 7,
        marginBottom: 7,
        //justifyContent: "center",
        //alignItems: "center",
    },

    nextPage: {
        color: "#FFFFFF",
        fontSize: 16,
    },

    footing: {
        textAlign: "center",
        bottom: 0,
        alignSelf: "flex-start",

        //backgroundColor: "#F5FCFF",
    },
    joinQueue: {
        fontSize: 32,
        fontWeight: "bold",
        //backgroundColor: "#F5FCFF",
        textAlign: "center",
        color: "#293C7D",
    },

    background: {
        //backgroundColor: "#F5FCFF",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        //height: 500, //column
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
    },
    spacing: {
        height: 50,
    },
    spacing2: {
        height: 10,
    },
});

export default JoinTheQueue;
